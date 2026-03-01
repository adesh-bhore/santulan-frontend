# PMPML Bus Optimization — Backend Design

> **Agent Reference Document** — Complete specification for building and understanding the backend lifecycle. Every section is self-contained and directly actionable.

---

## 1. Purpose & Lifecycle

The backend owns one lifecycle:

```
Upload CSV Data → Build TSN (in-memory) → Run Optimizer → Create Plan → Deploy Plan → Serve Driver App
```

Every route, service, and table exists to serve this pipeline. Nothing else.

---

## 2. Stack

| Layer | Technology |
|---|---|
| API Framework | FastAPI (Python) |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| Optimization | Google OR-Tools |
| Task Queue (optional) | Celery + Redis (for long solves) |
| Runtime | Python 3.11+ |

---

## 3. Folder Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI app init, router registration
│   ├── config.py                  # Env vars, DB URL, settings
│   │
│   ├── api/
│   │   ├── data_routes.py         # POST /api/data/upload/{type}
│   │   ├── optimization_routes.py # POST /api/optimization/run
│   │   ├── plan_routes.py         # GET/POST /api/plans, POST /api/plans/{id}/deploy
│   │   └── driver_routes.py       # GET /api/driver/{driver_id}/schedule
│   │
│   ├── models/
│   │   ├── base_models.py         # SQLAlchemy ORM: routes, stops, vehicles, drivers, timetable
│   │   └── plan_models.py         # SQLAlchemy ORM: plans, plan_vehicle_assignments, plan_driver_assignments
│   │
│   ├── services/
│   │   ├── tsn_builder.py         # Build Time-Space Network graph (in-memory only)
│   │   ├── optimizer.py           # OR-Tools solver logic
│   │   ├── plan_service.py        # Create/version/retrieve plans
│   │   └── deployment_service.py  # Atomic plan deployment
│   │
│   ├── database/
│   │   ├── db.py                  # SessionLocal, engine, get_db dependency
│   │   └── init_db.py             # Create tables on startup
│   │
│   └── schemas/
│       ├── request_schemas.py     # Pydantic request models
│       └── response_schemas.py    # Pydantic response models
│
├── requirements.txt
└── README.md
```

---

## 4. Database Design

Three strict layers. **Never mix data between layers.**

### Layer A — Base Data (Immutable Until Next Upload)

Uploaded CSV data. Never modified during optimization.

**`routes`**
```sql
id          SERIAL PRIMARY KEY
route_code  VARCHAR UNIQUE NOT NULL
start_stop  VARCHAR
end_stop    VARCHAR
distance_km FLOAT
travel_min  INTEGER
depot_id    INTEGER REFERENCES depots(id)
```

**`stops`**
```sql
id        SERIAL PRIMARY KEY
stop_code VARCHAR UNIQUE NOT NULL
name      VARCHAR
latitude  FLOAT
longitude FLOAT
```

**`vehicles`**
```sql
id           SERIAL PRIMARY KEY
vehicle_code VARCHAR UNIQUE NOT NULL
depot_id     INTEGER REFERENCES depots(id)
fuel_type    VARCHAR   -- Diesel / CNG / Electric
emission_g_km FLOAT
capacity     INTEGER
```

**`drivers`**
```sql
id           SERIAL PRIMARY KEY
driver_code  VARCHAR UNIQUE NOT NULL
depot_id     INTEGER REFERENCES depots(id)
max_duty_min INTEGER DEFAULT 480
```

**`depots`**
```sql
id         SERIAL PRIMARY KEY
depot_code VARCHAR UNIQUE NOT NULL
name       VARCHAR
latitude   FLOAT
longitude  FLOAT
```

**`timetable`**
```sql
id             SERIAL PRIMARY KEY
trip_id        VARCHAR UNIQUE NOT NULL
route_id       INTEGER REFERENCES routes(id)
departure_time TIME NOT NULL
arrival_time   TIME NOT NULL
day_type       VARCHAR  -- Weekday / Saturday / Sunday
```

---

### Layer B — Plan Tables (Optimization Output, Never Auto-Modified)

Every optimization run creates a new immutable plan version.

**`plans`**
```sql
id         SERIAL PRIMARY KEY
version    INTEGER NOT NULL        -- scoped per depot, not global (Swargate v1, Katraj v1 coexist)
status     VARCHAR NOT NULL        -- PENDING | ACTIVE | ARCHIVED
created_at TIMESTAMP DEFAULT NOW()
depot_id   INTEGER REFERENCES depots(id) NOT NULL
metrics    JSONB                   -- { vehicles_used, drivers_used, deadhead_km, emission_kg, ... }

-- Enforces only one ACTIVE plan per depot at any time
CONSTRAINT one_active_per_depot UNIQUE (depot_id, status) DEFERRABLE INITIALLY DEFERRED
```

> **Key rule:** `status = ACTIVE` is unique per `depot_id`, not globally. Three depots = three simultaneously active plans. This is correct and expected.

**`plan_vehicle_assignments`**
```sql
id             SERIAL PRIMARY KEY
plan_id        INTEGER REFERENCES plans(id)
vehicle_id     INTEGER REFERENCES vehicles(id)
trip_id        VARCHAR REFERENCES timetable(trip_id)
sequence_order INTEGER
```

**`plan_driver_assignments`**
```sql
id         SERIAL PRIMARY KEY
plan_id    INTEGER REFERENCES plans(id)
driver_id  INTEGER REFERENCES drivers(id)
trip_id    VARCHAR REFERENCES timetable(trip_id)
start_time TIME
end_time   TIME
duty_min   INTEGER  -- computed: end_time - start_time across all trips
```

---

### Layer C — Active Operational Tables (Driver App Source of Truth)

Updated **only** during plan deployment. Driver app reads exclusively from these.

**`current_vehicle_assignments`**
```sql
id             SERIAL PRIMARY KEY
plan_id        INTEGER REFERENCES plans(id)
plan_version   INTEGER
depot_id       INTEGER REFERENCES depots(id)   -- scopes rows by depot for safe partial updates
vehicle_id     INTEGER REFERENCES vehicles(id)
trip_id        VARCHAR
sequence_order INTEGER
updated_at     TIMESTAMP DEFAULT NOW()
```

**`current_driver_assignments`**
```sql
id           SERIAL PRIMARY KEY
plan_id      INTEGER REFERENCES plans(id)
plan_version INTEGER
depot_id     INTEGER REFERENCES depots(id)     -- scopes rows by depot for safe partial updates
driver_id    INTEGER REFERENCES drivers(id)
trip_id      VARCHAR
start_time   TIME
end_time     TIME
updated_at   TIMESTAMP DEFAULT NOW()
```

> `depot_id` on current tables is critical. Deployment only deletes and rewrites rows where `depot_id` matches the deployed plan. Other depots' rows are never touched.

---

## 5. API Routes

### Data Upload

```
POST /api/data/upload/{type}
```

`{type}` = `routes` | `stops` | `vehicles` | `drivers` | `depots` | `timetable`

- Accepts: `multipart/form-data` with CSV file
- Validates CSV headers and row types
- Truncates and re-inserts into base table (full replace per upload)
- Returns: `{ type, records_inserted, errors[] }`

**Rules:**
- Never trigger TSN or optimization here
- Validate CSV schema strictly; reject on error
- Log all upload events with timestamp

---

### Run Optimization

```
POST /api/optimization/run
```

Request body:
```json
{
  "depot_id": 1,
  "day_type": "Weekday",
  "objective_weights": {
    "fleet": 1.0,
    "deadhead": 0.8,
    "emission": 0.6,
    "fairness": 0.4
  }
}
```

Response:
```json
{
  "plan_id": 12,
  "version": 3,
  "status": "PENDING",
  "metrics": {
    "vehicles_used": 2,
    "drivers_used": 2,
    "deadhead_km": 0,
    "emission_kg_saved": 18.4,
    "avg_driver_duty_min": 85
  }
}
```

**Rules:**
- Fetch only base data for the given depot
- Build TSN in-memory; never persist graph
- Store only the assignment result (plan tables)
- Plan status must be `PENDING`; never auto-deploy

---

### Plan Management

```
GET  /api/plans                   → list all plans (filter by ?depot_id=1 optional)
GET  /api/plans/active            → all currently active plans across all depots (city view)
GET  /api/plans/{id}              → get full plan with assignments
POST /api/plans/{id}/deploy       → deploy a PENDING plan (depot-scoped)
GET  /api/plans/{id}/compare      → compare metrics vs current ACTIVE plan for same depot
```

**`GET /api/plans/active` response — city-wide view:**
```json
{
  "active_plans": [
    { "depot": "Swargate", "plan_id": 2, "version": 2, "vehicles_used": 12, "trips_covered": 8 },
    { "depot": "Katraj",   "plan_id": 3, "version": 1, "vehicles_used": 9,  "trips_covered": 7 },
    { "depot": "Hadapsar", "plan_id": 4, "version": 1, "vehicles_used": 7,  "trips_covered": 5 }
  ],
  "total_trips_covered": 20,
  "total_vehicles_active": 28,
  "total_drivers_active": 24
}
```

**`POST /api/plans/{id}/deploy` response:**
```json
{
  "deployed_plan_id": 12,
  "depot": "Swargate",
  "archived_plan_id": 9,
  "status": "ACTIVE"
}
```

---

### Driver App

```
GET /api/driver/{driver_id}/schedule
```

Response:
```json
{
  "driver_id": "D01",
  "plan_version": 3,
  "vehicle": "B101",
  "trips": [
    { "trip_id": "T1", "route": "R401", "departure": "06:00", "arrival": "06:45" },
    { "trip_id": "T3", "route": "R401", "departure": "08:00", "arrival": "08:45" }
  ],
  "total_duty_min": 90,
  "breaks": [
    { "from": "06:45", "to": "08:00", "duration_min": 75 }
  ]
}
```

**Rules:**
- Read only from `current_driver_assignments`
- Never read from plan tables
- Include plan version in every response

---

## 6. TSN Builder — `services/tsn_builder.py`

The Time-Space Network is a directed graph where:
- **Nodes** = `(location, time)` pairs
- **Edges** = feasible vehicle or driver movements

### Graph Object Structure

```python
@dataclass
class TSNNode:
    location: str   # stop_id or depot_id
    time: time      # HH:MM

@dataclass
class TSNEdge:
    type: str       # "trip" | "wait" | "depot_start" | "depot_end" | "deadhead"
    from_node: TSNNode
    to_node: TSNNode
    trip_id: str | None
    cost: float     # weighted: emission + deadhead + time

@dataclass
class TSNGraph:
    nodes: list[TSNNode]
    edges: list[TSNEdge]
    trip_edges: dict[str, TSNEdge]      # trip_id → edge
    depot_start_edges: list[TSNEdge]
```

### Build Function

```python
def build_tsn(
    routes: list[Route],
    timetable: list[Trip],
    depots: list[Depot],
    drivers: list[Driver],
    vehicles: list[Vehicle]
) -> TSNGraph:
```

**Step-by-step logic:**

1. **Create trip nodes** — for each trip, create `(start_stop, departure)` and `(end_stop, arrival)`
2. **Create trip edges** — connect departure node → arrival node per trip
3. **Create waiting edges** — if a vehicle can stay at a stop and reach next trip: `(stop, T_arrive) → (stop, T_depart_next)`. Only add if `T_depart_next >= T_arrive + buffer`
4. **Create depot-start edges** — from `(depot, 05:45)` → first feasible trip departure nodes. One per vehicle/driver
5. **Create deadhead edges** — if vehicle must reposition between stops (cost = deadhead distance × emission factor)
6. **Create depot-end edges** — from last trip arrival → depot return node

**Return** `TSNGraph`. Never store in database.

---

## 7. Optimizer — `services/optimizer.py`

Uses `ortools.sat.python.cp_model` (CP-SAT solver).

### Decision Variables

```python
# 1 if vehicle v is assigned to trip t, else 0
vehicle_trip[v][t] = model.NewBoolVar(f"v{v}_t{t}")

# 1 if driver d is assigned to trip t, else 0
driver_trip[d][t] = model.NewBoolVar(f"d{d}_t{t}")
```

### Constraints

| Constraint | Rule |
|---|---|
| Trip coverage | Every trip must have exactly 1 vehicle and 1 driver |
| Vehicle continuity | Vehicle assigned to trip T2 must have been at T2's start location after T2's preceding trip |
| Driver duty | Sum of all trip durations + breaks for a driver ≤ `max_duty_min` |
| Depot consistency | Vehicle must start and end at its home depot |
| One trip at a time | A vehicle/driver cannot serve overlapping trips |

### Objective

```python
model.Minimize(
    w_fleet    * total_vehicles_used +
    w_deadhead * total_deadhead_km   +
    w_emission * total_emission_kg   +
    w_fairness * duty_variance_penalty
)
```

Weights come from the API request body.

### Output Structure

```python
@dataclass
class OptimizationResult:
    vehicle_assignments: list[dict]  # [{vehicle_id, trip_id, sequence_order}]
    driver_assignments:  list[dict]  # [{driver_id, trip_id, start_time, end_time}]
    metrics: dict                    # {vehicles_used, drivers_used, deadhead_km, ...}
    solve_time_sec: float
    status: str                      # OPTIMAL | FEASIBLE | INFEASIBLE
```

### Scale Strategy

> For PMPML scale (800+ trips, 120+ vehicles, 150+ drivers):
> - **Always optimize per depot**, never city-wide in one solve
> - Optionally split by time window (AM peak / off-peak / PM peak)
> - Use OR-Tools time limit: `solver.parameters.max_time_in_seconds = 120`

---

# Solver & Depot Isolation — Clarity Notes  
---

## How Multi-Depot Solving Works

Run the optimizer **once per depot**. Each run is fully independent.

```
POST /api/optimization/run { depot_id: 1 }  →  Plan A  (Swargate trips)
POST /api/optimization/run { depot_id: 2 }  →  Plan B  (Katraj trips)
POST /api/optimization/run { depot_id: 3 }  →  Plan C  (Hadapsar trips)
```

All 3 plans are `PENDING`. Review and deploy each independently.

---

## Why Conflicts Are Impossible

Vehicles and drivers belong to exactly one depot in the base data:

```
vehicles:  B101 → depot_id = 1
drivers:   D01  → depot_id = 1
timetable: T1   → route → depot_id = 1
```

When optimizer runs for `depot_id = 1`, it queries:
- Only vehicles where `depot_id = 1`
- Only drivers where `depot_id = 1`
- Only trips where `route.depot_id = 1`

Depot 2's solver never sees Depot 1's assets. No shared pool = no possible conflict.

---

## What the Solver Actually Does (Vehicle → Trip Mapping)

Given a pool of vehicles and trips, the solver builds a binary assignment matrix:

```
         T1   T2   T3  ...  T20
B101   [  1    0    1  ...    0 ]   ← B101 does T1 then T3 (chained)
B102   [  0    1    0  ...    1 ]   ← B102 does T2 then T20
B103   [  0    0    0  ...    0 ]   ← not needed today
```

The TSN graph constrains which chains are legal. B101 can do T1 then T3 only if:
- T1 ends at the same stop T3 departs from, **and**
- T3 departure ≥ T1 arrival + minimum buffer

The solver picks the assignment that covers all trips with minimum vehicles, deadhead, and emission.

---

## Trips That Cross Depot Boundaries

Some routes end far from their home depot. This is handled by the TSN — not by changing depot ownership.

```
B101 (Swargate) does:  Swargate → Hadapsar (T1)
                       then waits at Hadapsar         ← waiting edge in TSN
                       then Hadapsar → Swargate (T3)  ← trip edge back
```

B101 remains a Swargate asset throughout. The deadhead/waiting cost is included in the objective so the solver naturally minimizes unnecessary repositioning.

---

## Why Not One Big Solve Across All Depots?

| | Per-Depot Runs | Single City-Wide Run |
|---|---|---|
| Speed | Fast (small problem) | Slow (exponential growth) |
| Result | Identical | Identical |
| Error isolation | One bad depot = one failed run | One bad depot = whole run fails |
| Re-running | Re-run one depot without touching others | Must re-run everything |

**Always solve per depot.**

## 8. Plan Service — `services/plan_service.py`

```python
def create_plan(
    depot_id: int,
    result: OptimizationResult,
    db: Session
) -> Plan:
```

Logic:
1. Query latest plan version for this depot → `new_version = latest + 1`
2. Insert `Plan` record with `status = PENDING`
3. Bulk insert `plan_vehicle_assignments`
4. Bulk insert `plan_driver_assignments`
5. Store metrics as JSONB
6. Return created `Plan` object

```python
def get_plan(plan_id: int, db: Session) -> Plan
def list_plans(depot_id: int, db: Session) -> list[Plan]
def compare_plans(plan_id_a: int, plan_id_b: int, db: Session) -> dict
```

---

## 9. Deployment Service — `services/deployment_service.py`

**Must be a single atomic transaction. Scoped strictly to the deploying depot.**

```python
def deploy_plan(plan_id: int, db: Session) -> dict:
    with db.begin():
        target = db.query(Plan).filter_by(id=plan_id).one()

        if target.status != "PENDING":
            raise ValueError("Only PENDING plans can be deployed")

        depot_id = target.depot_id  # everything below is scoped to this depot

        # 1. Archive THIS depot's current ACTIVE plan only
        db.query(Plan)\
          .filter_by(depot_id=depot_id, status="ACTIVE")\
          .update({"status": "ARCHIVED"})

        # 2. Activate target plan
        target.status = "ACTIVE"

        # 3. Clear ONLY this depot's rows from current tables
        db.query(CurrentVehicleAssignment)\
          .filter_by(depot_id=depot_id)\
          .delete()
        db.query(CurrentDriverAssignment)\
          .filter_by(depot_id=depot_id)\
          .delete()

        # 4. Copy this plan's assignments → current tables (with depot_id stamped)
        for va in target.vehicle_assignments:
            db.add(CurrentVehicleAssignment(
                plan_id=target.id,
                plan_version=target.version,
                depot_id=depot_id,
                vehicle_id=va.vehicle_id,
                trip_id=va.trip_id,
                sequence_order=va.sequence_order
            ))
        for da in target.driver_assignments:
            db.add(CurrentDriverAssignment(
                plan_id=target.id,
                plan_version=target.version,
                depot_id=depot_id,
                driver_id=da.driver_id,
                trip_id=da.trip_id,
                start_time=da.start_time,
                end_time=da.end_time
            ))

        # Transaction commits here; full rollback on any error
```

**Rules:**
- Every delete and insert is filtered by `depot_id` — other depots' rows are never touched
- Exactly one plan can have `status = ACTIVE` per depot at any time
- All plan history is preserved permanently — never delete from plan tables
- If any step fails, the entire transaction rolls back — no partial state possible

---

## 10. Execution Flow (End-to-End)

### Single Depot Flow
```
① Frontend uploads CSVs
        ↓
② Base tables populated (routes, stops, vehicles, drivers, timetable)
        ↓
③ POST /api/optimization/run { depot_id: 1, day_type, weights }
        ↓
④ tsn_builder.build_tsn() → TSNGraph (memory only, depot-scoped data)
        ↓
⑤ optimizer.solve(tsn_graph) → OptimizationResult
        ↓
⑥ plan_service.create_plan() → Plan { depot_id:1, status: PENDING, version: N }
        ↓
⑦ Frontend reviews plan metrics and assignments
        ↓
⑧ POST /api/plans/{id}/deploy
        ↓
⑨ deployment_service.deploy_plan() [atomic, depot-scoped transaction]
   - Archive old ACTIVE plan for depot_id=1 only
   - Activate new plan
   - Delete current_* rows where depot_id=1
   - Copy new assignments to current_* with depot_id=1 stamped
        ↓
⑩ Driver app: GET /api/driver/{id}/schedule
   - Reads from current_driver_assignments (filtered by driver → depot automatically)
```

### Multi-Depot Flow (3 Depots, Independent Runs)
```
Run optimization Depot 1 (Swargate)  →  Plan id=2, PENDING
Run optimization Depot 2 (Katraj)    →  Plan id=3, PENDING
Run optimization Depot 3 (Hadapsar)  →  Plan id=4, PENDING

Deploy Depot 1  →  Plan id=2 ACTIVE | current_* has Swargate rows
Deploy Depot 2  →  Plan id=3 ACTIVE | current_* adds Katraj rows   (Swargate untouched)
Deploy Depot 3  →  Plan id=4 ACTIVE | current_* adds Hadapsar rows (Swargate+Katraj untouched)

GET /api/plans/active  →  returns all 3 active plans as city-wide view
All 20 trips covered, zero conflicts, zero row overlap in current_* tables
```

---

## 11. Critical Rules

| Rule | Reason |
|---|---|
| Never modify base data during optimization | Maintains data integrity for re-runs |
| TSN is never stored in the database | It's a transient computation artifact |
| Never auto-deploy a plan | Human review is required before activation |
| Deployment must be a single DB transaction | Prevents partial state corruption |
| Deployment deletes/writes only by `depot_id` | Other depots' current assignments are never touched |
| One ACTIVE plan per depot, not globally | 3 depots = 3 simultaneous active plans — this is correct |
| `current_*` rows are stamped with `depot_id` | Enables safe per-depot overwrite without affecting others |
| Driver app reads only `current_*` tables | Decouples app from plan versioning complexity |
| Plan history is never deleted | Required for audit, rollback, and analysis |
| Optimize per depot, not city-wide | Keeps solver tractable at PMPML scale |
| Version numbering is per-depot | Swargate v3 and Katraj v1 coexist — no global version counter |

---

## 12. Example — Realistic Mock Data & Output

### Input: Swargate Depot

| trip_id | route | departure | arrival | distance_km |
|---|---|---|---|---|
| T1 | R401 Swargate→Hadapsar | 06:00 | 06:45 | 18 |
| T2 | R205 Swargate→Katraj | 07:00 | 07:40 | 15 |
| T3 | R401 Swargate→Hadapsar | 08:00 | 08:45 | 18 |
| T4 | R205 Swargate→Katraj | 09:00 | 09:40 | 15 |

Available: 3 vehicles (B101, B102, B103), 3 drivers (D01, D02, D03)

### TSN Built (in-memory)

```
Depot(05:45) → T1(Swargate 06:00→Hadapsar 06:45) → wait → T3(Swargate 08:00→Hadapsar 08:45)
Depot(05:45) → T2(Swargate 07:00→Katraj 07:40)   → wait → T4(Swargate 09:00→Katraj 09:40)
```

### Optimization Output (Plan v1)

**Vehicle Assignments**

| vehicle | trip | sequence |
|---|---|---|
| B101 | T1 | 1 |
| B101 | T3 | 2 |
| B102 | T2 | 1 |
| B102 | T4 | 2 |

B103 not used. Fleet reduced 3 → 2.

**Driver Assignments**

| driver | trip | start | end | duty_min |
|---|---|---|---|---|
| D01 | T1 | 06:00 | 06:45 | 45 |
| D01 | T3 | 08:00 | 08:45 | 45 |
| D02 | T2 | 07:00 | 07:40 | 40 |
| D02 | T4 | 09:00 | 09:40 | 40 |

D03 standby. All duties within 480 min limit.

**Plan Metrics**
```json
{
  "vehicles_used": 2,
  "drivers_used": 2,
  "deadhead_km": 0,
  "emission_kg_saved": 18.4,
  "avg_driver_duty_min": 85,
  "fleet_reduction_pct": 33
}
```

### Driver App Output (D01)

```json
{
  "driver_id": "D01",
  "plan_version": 1,
  "vehicle": "B101",
  "trips": [
    { "trip_id": "T1", "route": "R401", "departure": "06:00", "arrival": "06:45" },
    { "trip_id": "T3", "route": "R401", "departure": "08:00", "arrival": "08:45" }
  ],
  "total_duty_min": 90,
  "breaks": [
    { "from": "06:45", "to": "08:00", "duration_min": 75 }
  ]
}
```

---

## 13. `requirements.txt`

```
fastapi==0.111.0
uvicorn[standard]==0.29.0
sqlalchemy==2.0.30
psycopg2-binary==2.9.9
alembic==1.13.1
pydantic==2.7.1
pydantic-settings==2.2.1
ortools==9.10.4067
pandas==2.2.2
python-multipart==0.0.9
```

---

## 14. Environment Config — `app/config.py`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql://user:pass@localhost/pmpml"
    debug: bool = False
    solver_time_limit_sec: int = 120
    default_max_duty_min: int = 480

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 15. Scaling Notes for Full PMPML

| Dimension | Demo | PMPML Full Scale |
|---|---|---|
| Trips | 4 | 800+ |
| Vehicles | 3 | 120+ |
| Drivers | 3 | 150+ |
| Depots | 1 | 15+ |
| Strategy | Single solve | Per-depot solves |

For production: wrap the optimization endpoint in a Celery task. Return a `task_id` immediately. Poll `GET /api/optimization/status/{task_id}` for completion.
