# TransitPulse - Data Flow Architecture
## Visual Guide to Data Integration

---

## 🎯 Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                              │
│                     (Browser - Port 5174)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Dashboard  │  │    Routes    │  │    Depots    │            │
│  │  Components  │  │  Monitoring  │  │    Status    │            │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│         │                  │                  │                     │
│         └──────────────────┼──────────────────┘                     │
│                            │                                        │
│                            ▼                                        │
│                   ┌────────────────┐                               │
│                   │  useApiData    │                               │
│                   │     Hook       │                               │
│                   └────────┬───────┘                               │
│                            │                                        │
│                            ▼                                        │
│                   ┌────────────────┐                               │
│                   │  API Service   │                               │
│                   │   (api.js)     │                               │
│                   └────────┬───────┘                               │
│                            │                                        │
│              ┌─────────────┴─────────────┐                         │
│              │                           │                         │
│              ▼                           ▼                         │
│     ┌────────────────┐         ┌────────────────┐                 │
│     │   Mock Mode    │         │   Real Mode    │                 │
│     │ VITE_USE_MOCK  │         │ VITE_USE_MOCK  │                 │
│     │    = true      │         │    = false     │                 │
│     └────────┬───────┘         └────────┬───────┘                 │
│              │                           │                         │
│              ▼                           ▼                         │
│     ┌────────────────┐         ┌────────────────┐                 │
│     │   mockApi.js   │         │  HTTP Request  │                 │
│     └────────┬───────┘         └────────┬───────┘                 │
│              │                           │                         │
│              ▼                           │                         │
│     ┌────────────────┐                  │                         │
│     │  Mock Data     │                  │                         │
│     │    Files       │                  │                         │
│     └────────────────┘                  │                         │
│                                         │                         │
└─────────────────────────────────────────┼─────────────────────────┘
                                          │
                                          │ HTTP/JSON
                                          │
┌─────────────────────────────────────────┼─────────────────────────┐
│                    BACKEND LAYER        │                         │
│                  (Port 8000)            │                         │
├─────────────────────────────────────────┼─────────────────────────┤
│                                         ▼                         │
│                              ┌────────────────┐                   │
│                              │   FastAPI      │                   │
│                              │   Server       │                   │
│                              └────────┬───────┘                   │
│                                       │                           │
│                    ┌──────────────────┼──────────────────┐        │
│                    │                  │                  │        │
│                    ▼                  ▼                  ▼        │
│           ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│           │   Dashboard    │ │     Routes     │ │    Depots    │ │
│           │   Endpoints    │ │   Endpoints    │ │  Endpoints   │ │
│           └────────┬───────┘ └────────┬───────┘ └──────┬───────┘ │
│                    │                  │                  │        │
│                    └──────────────────┼──────────────────┘        │
│                                       │                           │
│                                       ▼                           │
│                            ┌────────────────┐                     │
│                            │  PostgreSQL    │                     │
│                            │   Database     │                     │
│                            └────────────────┘                     │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Example: Loading Dashboard

### Step-by-Step Flow

```
1. User opens dashboard
   ↓
2. Component mounts
   ↓
3. useApiData hook triggers
   ↓
4. api.getDashboardSummary() called
   ↓
5. Check VITE_USE_MOCK environment variable
   ↓
   ├─→ If TRUE (Development)
   │   ↓
   │   mockApi.getDashboardSummary()
   │   ↓
   │   Return mock data from dashboard.js
   │   ↓
   │   Component receives data
   │   ↓
   │   UI renders with mock data
   │
   └─→ If FALSE (Production)
       ↓
       HTTP GET /api/dashboard/summary
       ↓
       FastAPI receives request
       ↓
       Query PostgreSQL database
       ↓
       Format response as JSON
       ↓
       Return to frontend
       ↓
       Component receives data
       ↓
       UI renders with real data
```

---

## 📊 Data Structure Flow

### Dashboard Summary Data

```javascript
// Frontend Request
api.getDashboardSummary()

// Backend Response
{
  "success": true,
  "current_operations": {
    "active_plan": {
      "version": "v4",
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
    "trips": {
      "completed": 287,
      "scheduled": 450
    },
    "on_time_performance": 94.2
  }
}

// Component Receives
const { data, loading, error } = useApiData(api.getDashboardSummary);

// UI Renders
<FleetOverview data={data.current_operations} />
<TodaysSummary data={data.today_summary} />
```

---

## 🔁 Auto-Refresh Cycle

```
Component Mounts
      ↓
Initial Data Fetch
      ↓
Data Displayed
      ↓
Wait 30 seconds (configurable)
      ↓
Background Refresh Starts
      ↓
Show Refresh Indicator (⟳)
      ↓
Fetch New Data
      ↓
Update UI (if data changed)
      ↓
Hide Refresh Indicator
      ↓
Wait 30 seconds
      ↓
(Repeat cycle)
```

### Auto-Refresh Configuration

```javascript
// Component Level
const { data, isRefreshing } = useApiData(
  api.getRoutes,
  { refreshInterval: 30000 }  // 30 seconds
);

// Environment Level (.env)
VITE_REFRESH_DASHBOARD=30000   // Dashboard: 30s
VITE_REFRESH_ROUTES=30000      // Routes: 30s
VITE_REFRESH_ALERTS=10000      // Alerts: 10s (more urgent)
```

---

## 🎨 UI State Machine

```
┌─────────────┐
│   INITIAL   │
│   (Mount)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   LOADING   │ ← Shows spinner
│             │   "Loading data..."
└──────┬──────┘
       │
       ├─→ Success
       │   ↓
       │   ┌─────────────┐
       │   │   LOADED    │ ← Shows data
       │   │             │   Tables, charts, etc.
       │   └──────┬──────┘
       │          │
       │          ├─→ Auto-refresh
       │          │   ↓
       │          │   ┌─────────────┐
       │          │   │ REFRESHING  │ ← Shows ⟳ icon
       │          │   │             │   Data still visible
       │          │   └──────┬──────┘
       │          │          │
       │          │          ├─→ Success → Back to LOADED
       │          │          └─→ Error → ERROR state
       │          │
       │          └─→ User action → LOADING
       │
       └─→ Error
           ↓
           ┌─────────────┐
           │    ERROR    │ ← Shows error message
           │             │   "Failed to load"
           └──────┬──────┘   [Retry Button]
                  │
                  └─→ Retry → LOADING
```

---

## 📦 Component Data Dependencies

```
HomePage
├── CriticalAlerts
│   └── api.getAlerts() → Auto-refresh: 10s
│
├── FleetOverview
│   └── api.getDashboardSummary() → Auto-refresh: 30s
│
├── DepotStatusCards
│   └── api.getDepots() → Auto-refresh: 60s
│
├── RouteMonitoring
│   └── api.getRoutes() → Auto-refresh: 30s
│
└── Bottom Panel
    ├── ActivityLog
    │   └── api.getActivities() → Auto-refresh: 30s
    │
    ├── TodaysSummary
    │   └── api.getDashboardSummary() → Auto-refresh: 60s
    │
    └── InstantReports
        └── (No API call - static buttons)
```

---

## 🔧 Error Handling Flow

```
API Request
    ↓
Try Attempt 1
    ↓
    ├─→ Success → Return data
    │
    └─→ Failure
        ↓
        Wait 1 second
        ↓
        Try Attempt 2
        ↓
        ├─→ Success → Return data
        │
        └─→ Failure
            ↓
            Wait 2 seconds
            ↓
            Try Attempt 3
            ↓
            ├─→ Success → Return data
            │
            └─→ Failure
                ↓
                Show Error State
                ↓
                User can:
                ├─→ Click Retry → Back to Attempt 1
                └─→ Wait for auto-refresh → Try again in 30s
```

---

## 🚀 Deployment Architecture

### Development Environment

```
Developer Machine
├── Frontend (Vite Dev Server)
│   ├── Port: 5174
│   ├── Hot Reload: Enabled
│   └── Mock Data: Enabled
│
└── Backend (Optional)
    ├── Port: 8000
    ├── FastAPI Dev Server
    └── SQLite Database
```

### Production Environment

```
Production Server
├── Web Server (Nginx/Apache)
│   ├── Port: 80/443 (HTTPS)
│   ├── Serves: dist/ folder
│   └── Proxy: /api → Backend
│
├── Backend Server
│   ├── Port: 8000 (internal)
│   ├── FastAPI (Gunicorn)
│   └── PostgreSQL Database
│
└── Database Server
    ├── PostgreSQL
    ├── Backup: Daily
    └── Replication: Enabled
```

---

## 📈 Performance Optimization Flow

```
User Request
    ↓
Check Cache
    ↓
    ├─→ Cache Hit (< 30s old)
    │   └─→ Return cached data (instant)
    │
    └─→ Cache Miss
        ↓
        Make API Request
        ↓
        ├─→ Success
        │   ├─→ Store in cache
        │   └─→ Return data
        │
        └─→ Error
            ├─→ Return cached data (if available)
            └─→ Show error (if no cache)
```

---

## 🎯 Summary

### Key Points

1. **Flexible Architecture**
   - Works with mock or real data
   - No code changes needed to switch

2. **Robust Error Handling**
   - 3 retry attempts
   - Graceful degradation
   - User-friendly error messages

3. **Real-Time Updates**
   - Auto-refresh every 10-60s
   - Background updates
   - Visual indicators

4. **Production Ready**
   - Caching for performance
   - Error recovery
   - Scalable architecture

### Data Flow Summary

```
Component → Hook → API Service → Mock/Real → Data → UI
```

Simple, clean, maintainable! 🚀

---

**Diagram Version:** 1.0  
**Last Updated:** 2026-02-12
