# TransitPulse - Backend API Specification
## RESTful API for PMPML Transport Optimization System

---

## 📋 API Overview

**Base URL:** `http://localhost:8000/api`  
**Framework:** FastAPI (Python)  
**Database:** PostgreSQL  
**Authentication:** Session-based (simple)  
**Response Format:** JSON  

---

## 🔐 Authentication

### Login

**POST** `/auth/login`

```json
Request:
{
  "username": "admin_officer",
  "password": "pmpml2026"
}

Response (200 OK):
{
  "success": true,
  "user": {
    "id": "U001",
    "username": "admin_officer",
    "role": "admin",
    "name": "Admin Officer"
  },
  "session_token": "abc123xyz"
}

Error (401 Unauthorized):
{
  "success": false,
  "error": "Invalid username or password"
}
```

### Logout

**POST** `/auth/logout`

```json
Response (200 OK):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📁 Data Management APIs

### 1. Upload Routes

**POST** `/data/upload/routes`

**Content-Type:** `multipart/form-data`

```
Request:
file: routes.csv (binary)

Response (200 OK):
{
  "success": true,
  "file_type": "routes",
  "records_count": 125,
  "uploaded_at": "2026-01-30T22:45:00Z",
  "message": "125 routes loaded successfully"
}

Error (400 Bad Request):
{
  "success": false,
  "error": "Missing required column: route_id",
  "line_number": 15
}
```

**CSV Format Expected:**
```csv
route_id,name,start_stop,end_stop,distance_km,base_travel_time_min
R-401,Swargate-Hadapsar,Swargate,Hadapsar,18.4,45
```

### 2. Upload Vehicles

**POST** `/data/upload/vehicles`

```
Request:
file: vehicles.csv

Response (200 OK):
{
  "success": true,
  "file_type": "vehicles",
  "records_count": 127,
  "uploaded_at": "2026-01-30T22:45:00Z"
}
```

**CSV Format:**
```csv
vehicle_id,type,capacity,fuel_type,emission_factor,depot_id
B-001,Standard,52,Diesel,820,DEP01
```

### 3. Upload Drivers

**POST** `/data/upload/drivers`

```
Request:
file: drivers.csv

Response (200 OK):
{
  "success": true,
  "file_type": "drivers",
  "records_count": 145,
  "uploaded_at": "2026-01-30T22:45:00Z"
}
```

**CSV Format:**
```csv
driver_id,name,license,depot_id,max_duty_hours
D-001,Rajesh Patil,MH12-20150,DEP01,8
```

### 4. Upload Depots

**POST** `/data/upload/depots`

```
Request:
file: depots.csv

Response (200 OK):
{
  "success": true,
  "file_type": "depots",
  "records_count": 4,
  "uploaded_at": "2026-01-30T22:45:00Z"
}
```

**CSV Format:**
```csv
depot_id,name,latitude,longitude,capacity
DEP01,Swargate,18.5034,73.8610,50
```

### 5. Upload Timetable

**POST** `/data/upload/timetable`

```
Request:
file: timetable.csv

Response (200 OK):
{
  "success": true,
  "file_type": "timetable",
  "records_count": 450,
  "uploaded_at": "2026-01-30T22:45:00Z"
}
```

**CSV Format:**
```csv
service_id,route_id,departure_time,arrival_time
SER1001,R-401,06:00,06:45
```

### 6. Get Data Status

**GET** `/data/status`

```json
Response (200 OK):
{
  "success": true,
  "data_status": {
    "routes": {
      "count": 125,
      "last_updated": "2026-01-30T22:45:00Z",
      "status": "valid"
    },
    "vehicles": {
      "count": 127,
      "last_updated": "2026-01-30T22:45:00Z",
      "status": "valid"
    },
    "drivers": {
      "count": 145,
      "last_updated": "2026-01-30T22:45:00Z",
      "status": "valid"
    },
    "depots": {
      "count": 4,
      "last_updated": "2026-01-30T22:45:00Z",
      "status": "valid"
    },
    "timetable": {
      "count": 450,
      "last_updated": "2026-01-30T22:45:00Z",
      "status": "valid"
    }
  },
  "validation": {
    "all_valid": true,
    "errors": []
  },
  "ready_for_optimization": true
}
```

### 7. Download Sample Templates

**GET** `/data/templates/:type`

**Parameters:**
- `type`: routes | vehicles | drivers | depots | timetable

```
Response (200 OK):
Content-Type: text/csv
Content-Disposition: attachment; filename="routes_template.csv"

route_id,name,start_stop,end_stop,distance_km,base_travel_time_min
EXAMPLE-001,Example Route,Stop A,Stop B,10.5,25
```

---

## ⚙️ Optimization APIs

### 1. Run Optimization

**POST** `/optimization/run`

```json
Request:
{
  "priority": "balanced",  // "balanced" | "cost" | "hours"
  "constraints": {
    "max_driver_hours": 8,
    "mandatory_breaks": true
  }
}

Response (202 Accepted):
{
  "success": true,
  "job_id": "opt_20260131_021400",
  "message": "Optimization started",
  "estimated_time_seconds": 120
}
```

### 2. Check Optimization Status

**GET** `/optimization/status/:job_id`

```json
Response (200 OK) - In Progress:
{
  "success": true,
  "job_id": "opt_20260131_021400",
  "status": "running",
  "progress": 60,
  "current_step": "Calculating assignments",
  "elapsed_seconds": 72,
  "estimated_remaining_seconds": 48
}

Response (200 OK) - Completed:
{
  "success": true,
  "job_id": "opt_20260131_021400",
  "status": "completed",
  "plan_id": 5,
  "runtime_seconds": 84
}

Response (200 OK) - Failed:
{
  "success": false,
  "job_id": "opt_20260131_021400",
  "status": "failed",
  "error": "No feasible solution found. Insufficient vehicles."
}
```

### 3. Get Optimization Result

**GET** `/optimization/result/:plan_id`

```json
Response (200 OK):
{
  "success": true,
  "plan": {
    "plan_id": 5,
    "version": "v5",
    "status": "pending",
    "created_at": "2026-01-31T02:14:00Z",
    "priority_mode": "balanced",
    "runtime_seconds": 84
  },
  "summary": {
    "vehicles_needed": 115,
    "current_vehicles": 118,
    "vehicles_saved": 3,
    
    "drivers_needed": 106,
    "current_drivers": 108,
    "drivers_freed": 2,
    
    "fuel_cost_daily": 42800,
    "current_cost": 45200,
    "cost_saved": 2400,
    
    "co2_emission_kg": 1580,
    "current_emission": 1650,
    "emission_saved": 70,
    
    "avg_driver_hours": 7.1,
    "current_avg_hours": 7.4,
    "hours_reduced": 0.3
  },
  "metrics": {
    "total_trips_covered": 450,
    "deadhead_km": 145.2,
    "on_time_score": 95.8
  }
}
```

### 4. Get Plan Details (Assignments)

**GET** `/optimization/plans/:plan_id/details`

```json
Response (200 OK):
{
  "success": true,
  "plan_id": 5,
  "vehicle_assignments": [
    {
      "vehicle_id": "B-001",
      "total_trips": 6,
      "services": ["SER1001", "SER1045", "SER1089", ...],
      "start_time": "05:30",
      "end_time": "13:45",
      "total_km": 112.4,
      "deadhead_km": 8.2,
      "depot": "DEP01"
    },
    ...
  ],
  "driver_assignments": [
    {
      "driver_id": "D-001",
      "driver_name": "Rajesh Patil",
      "vehicle_id": "B-001",
      "total_trips": 6,
      "duty_hours": 7.2,
      "break_minutes": 30,
      "start_time": "05:30",
      "end_time": "13:45",
      "depot": "DEP01"
    },
    ...
  ]
}
```

---

## 📊 Plan Management APIs

### 1. Get All Plans

**GET** `/plans`

```json
Response (200 OK):
{
  "success": true,
  "plans": [
    {
      "plan_id": 5,
      "version": "v5",
      "status": "pending",
      "created_at": "2026-01-31T02:14:00Z",
      "metrics": {
        "vehicles_used": 115,
        "drivers_used": 106,
        "cost_saved": 2400
      }
    },
    {
      "plan_id": 4,
      "version": "v4",
      "status": "active",
      "created_at": "2026-01-30T02:30:00Z",
      "activated_at": "2026-01-30T02:35:00Z",
      "metrics": {
        "vehicles_used": 118,
        "drivers_used": 108
      }
    },
    {
      "plan_id": 3,
      "version": "v3",
      "status": "archived",
      "created_at": "2026-01-29T02:15:00Z"
    }
  ],
  "total": 3
}
```

### 2. Get Active Plan

**GET** `/plans/active`

```json
Response (200 OK):
{
  "success": true,
  "plan": {
    "plan_id": 4,
    "version": "v4",
    "status": "active",
    "activated_at": "2026-01-30T02:35:00Z",
    "metrics": {
      "vehicles_used": 118,
      "drivers_used": 108,
      "vehicles_saved": 9,
      "cost_saved": 7800,
      "emission_saved": 340
    }
  }
}

Response (404 Not Found):
{
  "success": false,
  "error": "No active plan found"
}
```

### 3. Activate Plan

**POST** `/plans/:plan_id/activate`

```json
Request:
{
  "confirmation": true,
  "notes": "Activating optimized plan v5"
}

Response (200 OK):
{
  "success": true,
  "message": "Plan v5 activated successfully",
  "plan_id": 5,
  "previous_plan_id": 4,
  "activated_at": "2026-01-31T11:20:00Z",
  "activated_by": "admin_officer"
}

Error (400 Bad Request):
{
  "success": false,
  "error": "Cannot activate plan in 'archived' status"
}
```

### 4. Archive Plan

**POST** `/plans/:plan_id/archive`

```json
Response (200 OK):
{
  "success": true,
  "message": "Plan v3 archived successfully"
}
```

### 5. Discard Plan

**DELETE** `/plans/:plan_id`

```json
Request:
{
  "reason": "Plan no longer needed"
}

Response (200 OK):
{
  "success": true,
  "message": "Plan v5 discarded successfully"
}

Error (400 Bad Request):
{
  "success": false,
  "error": "Cannot delete active plan"
}
```

---

## 📈 Dashboard & Monitoring APIs

### 1. Get Dashboard Summary

**GET** `/dashboard/summary`

```json
Response (200 OK):
{
  "success": true,
  "current_operations": {
    "active_plan": {
      "version": "v4",
      "activated_at": "2026-01-30T02:35:00Z",
      "status": "running_normally"
    },
    "vehicles": {
      "in_service": 118,
      "total_available": 127
    },
    "drivers": {
      "on_duty": 108,
      "total_available": 145
    }
  },
  "today_summary": {
    "date": "2026-01-31",
    "trips": {
      "scheduled": 450,
      "completed": 387,
      "in_progress": 42,
      "cancelled": 2
    },
    "on_time_performance": 94.2
  },
  "recent_activities": [
    {
      "action": "Plan v4 deployed",
      "timestamp": "2026-01-30T02:35:00Z"
    },
    {
      "action": "Optimization completed",
      "timestamp": "2026-01-30T02:14:00Z"
    }
  ]
}
```

### 2. Get Live Metrics (Future)

**GET** `/dashboard/live`

```json
Response (200 OK):
{
  "success": true,
  "timestamp": "2026-01-31T15:30:00Z",
  "metrics": {
    "vehicles_active": 98,
    "drivers_on_duty": 87,
    "trips_completed_today": 387,
    "on_time_percentage": 94.2,
    "alerts": {
      "total": 2,
      "critical": 0
    }
  }
}
```

---

## 📊 Reports APIs

### 1. Generate Report

**POST** `/reports/generate`

```json
Request:
{
  "report_type": "daily_operations",
  "date_from": "2026-01-24",
  "date_to": "2026-01-31",
  "format": "pdf"  // "pdf" | "excel"
}

Response (200 OK):
{
  "success": true,
  "report_id": "RPT_20260131_152000",
  "download_url": "/api/reports/download/RPT_20260131_152000",
  "expires_at": "2026-02-01T15:20:00Z"
}
```

### 2. Download Report

**GET** `/reports/download/:report_id`

```
Response (200 OK):
Content-Type: application/pdf
Content-Disposition: attachment; filename="daily_operations_24-31_Jan_2026.pdf"

[PDF Binary Data]
```

### 3. Get Available Report Types

**GET** `/reports/types`

```json
Response (200 OK):
{
  "success": true,
  "report_types": [
    {
      "type": "daily_operations",
      "name": "Daily Operations Summary",
      "description": "Trips, buses used, on-time performance",
      "formats": ["pdf", "excel"]
    },
    {
      "type": "monthly_fleet",
      "name": "Monthly Fleet Report",
      "description": "Total buses used, kilometers, fuel",
      "formats": ["pdf", "excel"]
    },
    {
      "type": "driver_duty",
      "name": "Driver Duty Report",
      "description": "Hours worked, overtime, attendance",
      "formats": ["pdf", "excel"]
    },
    {
      "type": "route_performance",
      "name": "Route Performance",
      "description": "By route: trips, delays, cancellations",
      "formats": ["pdf", "excel"]
    },
    {
      "type": "fuel_consumption",
      "name": "Fuel Consumption Report",
      "description": "Daily/monthly fuel usage and cost",
      "formats": ["pdf", "excel"]
    },
    {
      "type": "plan_history",
      "name": "Plan History Report",
      "description": "All optimization plans created",
      "formats": ["pdf", "excel"]
    }
  ]
}
```

### 4. Get Recent Reports

**GET** `/reports/recent`

```json
Response (200 OK):
{
  "success": true,
  "reports": [
    {
      "report_id": "RPT_20260130_100000",
      "type": "daily_operations",
      "date_generated": "2026-01-30T10:00:00Z",
      "format": "pdf",
      "download_url": "/api/reports/download/RPT_20260130_100000"
    },
    {
      "report_id": "RPT_20260129_100000",
      "type": "daily_operations",
      "date_generated": "2026-01-29T10:00:00Z",
      "format": "pdf",
      "download_url": "/api/reports/download/RPT_20260129_100000"
    }
  ]
}
```

---

## ❌ Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": "Error message here",
  "error_code": "ERROR_CODE",
  "details": {}  // Optional additional context
}
```

### Common HTTP Status Codes

```
200 OK - Success
201 Created - Resource created
202 Accepted - Request accepted (async processing)
400 Bad Request - Invalid input
401 Unauthorized - Authentication required
403 Forbidden - Insufficient permissions
404 Not Found - Resource not found
409 Conflict - Resource conflict
500 Internal Server Error - Server error
```

### Error Codes

```
AUTH_REQUIRED - Authentication required
INVALID_CREDENTIALS - Wrong username/password
INVALID_INPUT - Invalid request data
FILE_UPLOAD_FAILED - CSV upload failed
VALIDATION_ERROR - Data validation failed
OPTIMIZATION_FAILED - Optimization solver failed
NO_FEASIBLE_SOLUTION - Cannot find valid plan
PLAN_NOT_FOUND - Plan ID doesn't exist
ALREADY_ACTIVE - Plan is already active
CANNOT_MODIFY_ACTIVE - Cannot modify active plan
DATABASE_ERROR - Database operation failed
```

---

## 🔧 Implementation Notes

### Technology Stack

```python
# FastAPI Application
from fastapi import FastAPI, UploadFile, File
from sqlalchemy import create_engine
from ortools.linear_solver import pywraplp
import pandas as pd

app = FastAPI()

# Database Connection
DATABASE_URL = "postgresql://user:password@localhost/transitpulse"
engine = create_engine(DATABASE_URL)
```

### File Upload Handling

```python
@app.post("/api/data/upload/routes")
async def upload_routes(file: UploadFile = File(...)):
    # Read CSV
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    
    # Validate
    required_columns = ['route_id', 'name', 'start_stop', 'end_stop', 'distance_km']
    if not all(col in df.columns for col in required_columns):
        raise HTTPException(400, "Missing required columns")
    
    # Insert to database
    df.to_sql('routes', engine, if_exists='replace', index=False)
    
    return {
        "success": True,
        "records_count": len(df),
        "uploaded_at": datetime.now().isoformat()
    }
```

### Optimization Endpoint

```python
@app.post("/api/optimization/run")
async def run_optimization(request: OptimizationRequest):
    # Create background task for async processing
    job_id = f"opt_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Start optimization in background
    background_tasks.add_task(
        optimize_transit,
        job_id=job_id,
        priority=request.priority
    )
    
    return {
        "success": True,
        "job_id": job_id,
        "estimated_time_seconds": 120
    }

def optimize_transit(job_id, priority):
    # Fetch data
    routes = fetch_routes()
    vehicles = fetch_vehicles()
    drivers = fetch_drivers()
    timetable = fetch_timetable()
    
    # Build TSN
    tsn = build_time_space_network(routes, vehicles, drivers, timetable)
    
    # Solve
    solution = solve_ilp(tsn, priority)
    
    # Save plan
    plan_id = save_optimization_plan(solution)
    
    # Update job status
    update_job_status(job_id, "completed", plan_id)
```

### CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 API Usage Examples

### Example 1: Complete Workflow (JavaScript/React)

```javascript
// 1. Upload data
const uploadRoutes = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:8000/api/data/upload/routes', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log(`Loaded ${result.records_count} routes`);
}

// 2. Run optimization
const runOptimization = async () => {
  const response = await fetch('http://localhost:8000/api/optimization/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priority: 'balanced' })
  });
  
  const { job_id } = await response.json();
  
  // Poll for status
  const checkStatus = setInterval(async () => {
    const statusResponse = await fetch(`http://localhost:8000/api/optimization/status/${job_id}`);
    const status = await statusResponse.json();
    
    if (status.status === 'completed') {
      clearInterval(checkStatus);
      showResults(status.plan_id);
    }
  }, 2000);
}

// 3. Get results
const showResults = async (plan_id) => {
  const response = await fetch(`http://localhost:8000/api/optimization/result/${plan_id}`);
  const result = await response.json();
  
  console.log(`Vehicles saved: ${result.summary.vehicles_saved}`);
  console.log(`Cost saved: ₹${result.summary.cost_saved}`);
}

// 4. Activate plan
const activatePlan = async (plan_id) => {
  const response = await fetch(`http://localhost:8000/api/plans/${plan_id}/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirmation: true })
  });
  
  const result = await response.json();
  console.log(result.message);
}
```

---

## 🚀 Deployment

### Production Configuration

```python
# config.py
import os

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALLOWED_ORIGINS = ["http://pmpml-local"]
    MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10MB
    OPTIMIZATION_TIMEOUT = 300  # 5 minutes
    
settings = Settings()
```

### Docker Setup (Optional)

```dockerfile
FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

**TransitPulse API Specification v1.0**  
*Complete RESTful API for Backend Implementation*
