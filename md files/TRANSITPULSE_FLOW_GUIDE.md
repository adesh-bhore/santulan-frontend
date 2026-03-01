# TransitPulse - Complete Project Flow Guide
## From Data Upload to Optimized Operations

---

## 🎯 System Overview

**TransitPulse** is a desktop application that helps PMPML optimize bus and driver assignments.

**Simple Flow:**
```
Officer uploads data → System optimizes → Officer reviews → Officer activates → Buses run
```

**Technical Flow:**
```
CSV files → Database → TSN Builder → Solver → Plan → Deployment → Operations
```

---

## 📊 Complete System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRANSITPULSE SYSTEM FLOW                      │
└─────────────────────────────────────────────────────────────────┘

PHASE 1: DATA PREPARATION (Monthly/As Needed)
─────────────────────────────────────────────────────────────────

┌──────────────────┐
│ PMPML Officer    │
│ (User)           │
└────────┬─────────┘
         │ Uploads 5 CSV files
         ▼
┌──────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                             │
│ • Data Upload Screen                                         │
│ • File validation (client-side)                              │
│ • Progress indicator                                         │
└────────┬─────────────────────────────────────────────────────┘
         │ POST /api/data/upload
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Receive CSV files                                          │
│ • Validate format & data                                     │
│ • Parse CSV content                                          │
└────────┬─────────────────────────────────────────────────────┘
         │ INSERT data
         ▼
┌──────────────────────────────────────────────────────────────┐
│ DATABASE (PostgreSQL)                                        │
│ Tables:                                                      │
│ • routes (125 routes)                                        │
│ • vehicles (127 vehicles)                                    │
│ • drivers (145 drivers)                                      │
│ • depots (4 depots)                                          │
│ • timetable (450 trips)                                      │
└──────────────────────────────────────────────────────────────┘


PHASE 2: OPTIMIZATION (Daily at 2 AM or On-Demand)
─────────────────────────────────────────────────────────────────

┌──────────────────┐
│ PMPML Officer    │
│ Clicks "Run      │
│ Optimization"    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                             │
│ • Optimization Screen                                        │
│ • Priority selection (Balanced/Cost/Hours)                   │
│ • Progress tracking                                          │
└────────┬─────────────────────────────────────────────────────┘
         │ POST /api/optimization/run
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Receive optimization request                               │
│ • Fetch base data from database                              │
│ • Call TSN Builder                                           │
└────────┬─────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ TSN BUILDER (Python Module)                                 │
│ • Read routes, vehicles, drivers, timetable                  │
│ • Generate nodes: (location, time)                           │
│ • Generate edges:                                            │
│   - Trip edges (scheduled services)                          │
│   - Wait edges (vehicle/driver waiting)                      │
│   - Deadhead edges (empty movement)                          │
│   - Rest edges (driver breaks)                               │
│ • Output: Time-Space Network graph                           │
└────────┬─────────────────────────────────────────────────────┘
         │ Pass TSN graph
         ▼
┌──────────────────────────────────────────────────────────────┐
│ OPTIMIZATION ENGINE (OR-Tools)                               │
│ • Receive TSN graph + constraints                            │
│ • Define decision variables:                                 │
│   - Which vehicle serves which trip                          │
│   - Which driver operates which vehicle                      │
│ • Apply constraints:                                         │
│   - All trips must be covered                                │
│   - Driver duty hours ≤ 8 hours                              │
│   - Vehicle continuity (depot-trip-depot)                    │
│   - Driver breaks (mandatory rest)                           │
│ • Set objective function:                                    │
│   - Minimize vehicles + minimize fuel + balance hours        │
│ • Solve ILP (Integer Linear Programming)                     │
│ • Output: Optimized assignments                              │
└────────┬─────────────────────────────────────────────────────┘
         │ Return solution
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Receive optimization result                                │
│ • Calculate metrics:                                         │
│   - Total vehicles needed                                    │
│   - Total drivers needed                                     │
│   - Fuel cost savings                                        │
│   - CO₂ emission reduction                                   │
│ • Create new plan record                                     │
│ • Save to database                                           │
└────────┬─────────────────────────────────────────────────────┘
         │ INSERT plan
         ▼
┌──────────────────────────────────────────────────────────────┐
│ DATABASE (PostgreSQL)                                        │
│ New Records:                                                 │
│ • optimization_plans (plan v5, status: pending)              │
│ • plan_vehicle_assignments (115 assignments)                 │
│ • plan_driver_assignments (106 assignments)                  │
│ • plan_metrics (savings, reductions)                         │
└────────┬─────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Return optimization result                                 │
└────────┬─────────────────────────────────────────────────────┘
         │ Response
         ▼
┌──────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                             │
│ • Display Review Screen                                      │
│ • Show comparison:                                           │
│   Current: 118 buses → New: 115 buses                        │
│   Savings: ₹2,400/day                                        │
│ • Wait for officer decision                                  │
└──────────────────────────────────────────────────────────────┘


PHASE 3: DEPLOYMENT (Officer Approval)
─────────────────────────────────────────────────────────────────

┌──────────────────┐
│ PMPML Officer    │
│ Reviews plan     │
│ Clicks "ACTIVATE"│
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                             │
│ • Confirmation dialog                                        │
│ • Send activation request                                    │
└────────┬─────────────────────────────────────────────────────┘
         │ POST /api/plans/:id/activate
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Mark old plan as "archived"                                │
│ • Mark new plan as "active"                                  │
│ • Copy assignments to current_operations tables              │
│ • Log deployment action                                      │
│ • Trigger notifications (if driver app exists)               │
└────────┬─────────────────────────────────────────────────────┘
         │ UPDATE database
         ▼
┌──────────────────────────────────────────────────────────────┐
│ DATABASE (PostgreSQL)                                        │
│ Updates:                                                     │
│ • plan v4: status = 'archived'                               │
│ • plan v5: status = 'active'                                 │
│ • current_vehicle_assignments (replaced)                     │
│ • current_driver_assignments (replaced)                      │
│ • deployment_log (new entry)                                 │
└──────────────────────────────────────────────────────────────┘


PHASE 4: OPERATIONS (Real World)
─────────────────────────────────────────────────────────────────

┌──────────────────────────────────────────────────────────────┐
│ REAL WORLD                                                   │
│ • 115 buses deployed as per plan                             │
│ • 106 drivers assigned as per schedule                       │
│ • Operations running based on active plan v5                 │
└──────────────────────────────────────────────────────────────┘


PHASE 5: MONITORING & REPORTS (Optional/Future)
─────────────────────────────────────────────────────────────────

┌──────────────────┐
│ PMPML Officer    │
│ Needs report     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                             │
│ • Reports Screen                                             │
│ • Select type, date range, format                            │
└────────┬─────────────────────────────────────────────────────┘
         │ POST /api/reports/generate
         ▼
┌──────────────────────────────────────────────────────────────┐
│ BACKEND API (FastAPI)                                        │
│ • Query database for report data                             │
│ • Generate PDF/Excel                                         │
│ • Return file                                                │
└────────┬─────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────┐
│ Downloaded File  │
│ (PDF/Excel)      │
└──────────────────┘
```

---

## 📁 Data Model (Database Tables)

### Base Data Tables (From CSV Uploads)

```sql
-- Routes and Stops
routes (
    route_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100),
    start_stop VARCHAR(50),
    end_stop VARCHAR(50),
    distance_km DECIMAL(5,2),
    base_travel_time_min INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- Vehicles Fleet
vehicles (
    vehicle_id VARCHAR(10) PRIMARY KEY,
    type VARCHAR(20),
    capacity INT,
    fuel_type VARCHAR(20),
    emission_factor DECIMAL(6,2),
    depot_id VARCHAR(10),
    status VARCHAR(20) DEFAULT 'available',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- Drivers
drivers (
    driver_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100),
    license VARCHAR(50),
    depot_id VARCHAR(10),
    max_duty_hours INT DEFAULT 8,
    status VARCHAR(20) DEFAULT 'available',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- Depots
depots (
    depot_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    capacity INT,
    created_at TIMESTAMP
)

-- Timetable (Scheduled Services)
timetable (
    service_id VARCHAR(10) PRIMARY KEY,
    route_id VARCHAR(10),
    departure_time TIME,
    arrival_time TIME,
    created_at TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
)
```

### Optimization Output Tables

```sql
-- Master Plans Table
optimization_plans (
    plan_id SERIAL PRIMARY KEY,
    version VARCHAR(10) UNIQUE,
    status VARCHAR(20),  -- 'pending', 'active', 'archived'
    created_at TIMESTAMP,
    created_by VARCHAR(50),
    activated_at TIMESTAMP,
    priority_mode VARCHAR(20),  -- 'balanced', 'cost', 'hours'
    runtime_seconds INT
)

-- Vehicle Assignments (Per Plan)
plan_vehicle_assignments (
    id SERIAL PRIMARY KEY,
    plan_id INT,
    vehicle_id VARCHAR(10),
    service_id VARCHAR(10),
    sequence_order INT,
    start_time TIME,
    end_time TIME,
    deadhead_km DECIMAL(6,2),
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (service_id) REFERENCES timetable(service_id)
)

-- Driver Assignments (Per Plan)
plan_driver_assignments (
    id SERIAL PRIMARY KEY,
    plan_id INT,
    driver_id VARCHAR(10),
    vehicle_id VARCHAR(10),
    service_id VARCHAR(10),
    start_time TIME,
    end_time TIME,
    duty_hours DECIMAL(4,2),
    rest_minutes INT,
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id),
    FOREIGN KEY (driver_id) REFERENCES drivers(driver_id)
)

-- Plan Metrics
plan_metrics (
    id SERIAL PRIMARY KEY,
    plan_id INT,
    vehicles_used INT,
    drivers_used INT,
    total_deadhead_km DECIMAL(8,2),
    fuel_cost_estimate DECIMAL(10,2),
    co2_emission_kg DECIMAL(8,2),
    avg_driver_hours DECIMAL(4,2),
    vehicles_saved INT,
    cost_saved DECIMAL(10,2),
    emission_saved DECIMAL(8,2),
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id)
)
```

### Current Operations Tables (Active Plan)

```sql
-- Currently Active Vehicle Assignments
current_vehicle_assignments (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(10),
    service_id VARCHAR(10),
    sequence_order INT,
    start_time TIME,
    end_time TIME,
    plan_id INT,  -- Reference to active plan
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id)
)

-- Currently Active Driver Assignments
current_driver_assignments (
    id SERIAL PRIMARY KEY,
    driver_id VARCHAR(10),
    vehicle_id VARCHAR(10),
    service_id VARCHAR(10),
    start_time TIME,
    end_time TIME,
    duty_hours DECIMAL(4,2),
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id)
)
```

### Audit & History Tables

```sql
-- Deployment Log
deployment_log (
    id SERIAL PRIMARY KEY,
    plan_id INT,
    action VARCHAR(20),  -- 'activated', 'archived', 'discarded'
    performed_by VARCHAR(50),
    performed_at TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (plan_id) REFERENCES optimization_plans(plan_id)
)

-- Data Upload Log
upload_log (
    id SERIAL PRIMARY KEY,
    file_type VARCHAR(50),  -- 'routes', 'vehicles', etc.
    filename VARCHAR(255),
    records_count INT,
    uploaded_by VARCHAR(50),
    uploaded_at TIMESTAMP,
    status VARCHAR(20),  -- 'success', 'failed'
    error_message TEXT
)
```

---

## 🔄 Key Workflows

### Workflow 1: Upload Data (Monthly)

```
1. Officer: Opens "Data Management" screen
2. Frontend: Displays upload form with 5 file inputs
3. Officer: Selects routes.csv file
4. Officer: Clicks "Upload"
5. Frontend: POST /api/data/upload/routes with file
6. Backend: Validates CSV format
7. Backend: Parses CSV rows
8. Backend: Validates data (required fields, references)
9. Backend: Inserts into routes table
10. Backend: Returns { success: true, count: 125 }
11. Frontend: Shows "✓ Loaded - 125 routes"
12. Officer: Repeats for other 4 files
13. Done
```

### Workflow 2: Run Optimization (Daily)

```
1. Officer: Opens "Optimization" screen
2. Frontend: Displays system status (✓ Data ready)
3. Officer: Selects priority "Balanced" (default)
4. Officer: Clicks "START OPTIMIZATION"
5. Frontend: POST /api/optimization/run { priority: "balanced" }
6. Backend: Fetches all base data from DB
7. Backend: Calls tsn_builder.build_network()
8. TSN Builder: Generates nodes and edges
9. Backend: Calls optimizer.solve(tsn, constraints)
10. Optimizer: Runs OR-Tools solver (~2 minutes)
11. Backend: Receives solution (assignments)
12. Backend: Calculates metrics (savings, etc.)
13. Backend: Creates new plan record (v5, status: pending)
14. Backend: Saves assignments to plan_vehicle/driver_assignments
15. Backend: Returns plan summary
16. Frontend: Shows "Review Plan" screen with comparison
17. Officer: Reviews numbers
18. Officer: Clicks "YES - ACTIVATE NOW"
19. Frontend: POST /api/plans/5/activate
20. Backend: Updates plan status to 'active'
21. Backend: Copies to current_operations tables
22. Backend: Archives old plan
23. Backend: Logs deployment
24. Frontend: Shows success message
25. Done
```

### Workflow 3: Generate Report (Weekly)

```
1. Officer: Opens "Reports" screen
2. Frontend: Displays report type dropdown
3. Officer: Selects "Daily Operations Summary"
4. Officer: Selects date range (last 7 days)
5. Officer: Selects format "PDF"
6. Officer: Clicks "GENERATE REPORT"
7. Frontend: POST /api/reports/generate
   {
     type: "daily_operations",
     from: "24-Jan-2026",
     to: "31-Jan-2026",
     format: "pdf"
   }
8. Backend: Queries database for date range
9. Backend: Aggregates data (trips, buses, drivers)
10. Backend: Generates PDF using ReportLab
11. Backend: Returns PDF file
12. Frontend: Triggers download
13. Officer: Saves PDF
14. Officer: Prints for superintendent
15. Done
```

---

## ⚙️ TSN Construction Logic (Simplified)

### What is TSN?

**Time-Space Network** = Graph where:
- **Nodes** = (Location, Time) pairs
- **Edges** = Possible movements

### How It's Built

```python
def build_tsn(routes, vehicles, drivers, timetable, depots):
    """
    Build Time-Space Network from base data
    """
    nodes = []
    edges = []
    
    # STEP 1: Create nodes for all locations at all times
    for trip in timetable:
        # Start node
        start_node = (trip.start_stop, trip.departure_time)
        nodes.append(start_node)
        
        # End node
        end_node = (trip.end_stop, trip.arrival_time)
        nodes.append(end_node)
    
    # Add depot nodes (every 5 minutes, 00:00 to 23:55)
    for depot in depots:
        for hour in range(24):
            for minute in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]:
                time = f"{hour:02d}:{minute:02d}"
                node = (depot.name, time)
                nodes.append(node)
    
    # STEP 2: Create trip edges (scheduled services)
    for trip in timetable:
        edge = {
            'type': 'trip',
            'from': (trip.start_stop, trip.departure_time),
            'to': (trip.end_stop, trip.arrival_time),
            'service_id': trip.service_id,
            'route_id': trip.route_id,
            'distance': get_route_distance(trip.route_id)
        }
        edges.append(edge)
    
    # STEP 3: Create wait edges (waiting at location)
    for node in nodes:
        location, time = node
        next_time = add_minutes(time, 5)
        edge = {
            'type': 'wait',
            'from': (location, time),
            'to': (location, next_time),
            'cost': 0
        }
        edges.append(edge)
    
    # STEP 4: Create deadhead edges (empty movement)
    # From trip end to depot
    for trip in timetable:
        nearest_depot = find_nearest_depot(trip.end_stop)
        travel_time = calculate_travel_time(trip.end_stop, nearest_depot)
        arrival_time = add_minutes(trip.arrival_time, travel_time)
        
        edge = {
            'type': 'deadhead',
            'from': (trip.end_stop, trip.arrival_time),
            'to': (nearest_depot, arrival_time),
            'distance': calculate_distance(trip.end_stop, nearest_depot),
            'cost': fuel_cost(distance)
        }
        edges.append(edge)
    
    # STEP 5: Create rest edges (driver breaks at depot)
    for depot in depots:
        for time in depot_times:
            rest_duration = 30  # 30 minutes break
            edge = {
                'type': 'rest',
                'from': (depot.name, time),
                'to': (depot.name, add_minutes(time, rest_duration)),
                'is_mandatory': True
            }
            edges.append(edge)
    
    return {
        'nodes': nodes,
        'edges': edges
    }
```

### How Solver Uses TSN

```python
def solve_optimization(tsn, vehicles, drivers, constraints):
    """
    Solve vehicle and driver assignment using TSN
    """
    # Create ILP model
    model = create_model()
    
    # Decision variables
    # x[vehicle, edge] = 1 if vehicle uses this edge
    # y[driver, edge] = 1 if driver uses this edge
    
    # Constraints:
    # 1. Every trip edge must be covered by exactly one vehicle
    # 2. Vehicle flow continuity (what comes in must go out)
    # 3. Every trip must have a driver
    # 4. Driver duty time <= 8 hours
    # 5. Driver must have mandatory breaks
    # 6. Vehicle must start/end at depot
    
    # Objective: Minimize vehicles + minimize deadhead + balance hours
    
    # Solve
    solution = solver.solve(model)
    
    return {
        'vehicle_assignments': extract_vehicle_paths(solution),
        'driver_assignments': extract_driver_shifts(solution),
        'metrics': calculate_metrics(solution)
    }
```

---

## 📊 Metrics Calculation

### How Savings are Calculated

```python
def calculate_plan_metrics(plan_assignments, baseline):
    """
    Calculate improvement metrics
    """
    # Current/Baseline (before optimization)
    baseline_vehicles = 127  # All vehicles
    baseline_cost = calculate_fuel_cost(baseline)
    baseline_emission = calculate_emissions(baseline)
    
    # New Plan (after optimization)
    new_vehicles = len(unique_vehicles_in_plan(plan_assignments))
    new_cost = calculate_fuel_cost(plan_assignments)
    new_emission = calculate_emissions(plan_assignments)
    
    # Calculate differences
    vehicles_saved = baseline_vehicles - new_vehicles
    cost_saved = baseline_cost - new_cost
    emission_saved = baseline_emission - new_emission
    
    return {
        'vehicles_used': new_vehicles,
        'vehicles_saved': vehicles_saved,
        'cost_estimate': new_cost,
        'cost_saved': cost_saved,
        'emission_kg': new_emission,
        'emission_saved': emission_saved,
        'avg_driver_hours': calculate_avg_hours(plan_assignments)
    }
```

---

## 🔐 Security & Access Control

### User Roles (Future Enhancement)

```
1. Admin Officer (Full Access)
   - Upload data
   - Run optimization
   - Activate plans
   - Generate reports

2. Operations Manager (View + Reports)
   - View current status
   - Generate reports
   - Cannot activate plans

3. Data Entry Clerk (Upload Only)
   - Upload data files
   - Cannot run optimization
```

### Authentication (Simple)

```
- Username/Password login
- Session-based authentication
- No complex OAuth needed
- Local network only (no internet exposure)
```

---

## 📝 Error Handling

### Common Scenarios

**1. CSV Upload Errors**
```
Error: Missing column 'route_id'
Solution: Download sample template and follow format
```

**2. Optimization Failures**
```
Error: No feasible solution found
Cause: Too many trips, not enough vehicles
Solution: Check data, increase vehicle count
```

**3. Data Validation Errors**
```
Error: Route R-401 referenced in timetable but not found in routes
Solution: Upload routes.csv first
```

---

## 🎯 Success Criteria

**System works correctly when:**

✅ Officer uploads 5 CSV files without errors  
✅ Optimization completes in under 3 minutes  
✅ Generated plan uses fewer vehicles than baseline  
✅ All mandatory trips are covered  
✅ No driver works more than 8 hours  
✅ Officer can activate plan with one click  
✅ Reports generate as PDF successfully  
✅ System shows clear error messages when something fails  

---

**TransitPulse Flow Guide v2.0**  
*Complete System Flow - From Upload to Operations*
