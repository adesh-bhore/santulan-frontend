# TransitPulse - Data Integration Strategy
## From Mock Data to Real Backend Integration

---

## 🎯 Overview

This document explains how the current mock data will be replaced with real backend data, how the UI handles dynamic data, and what improvements are needed for production.

---

## 📊 Current Architecture (Mock Data)

### Mock Data Files
```
src/mock-data/
├── dashboard.js      # Fleet metrics, summary stats
├── depots.js         # Depot information
├── routes.js         # Route monitoring data
├── alerts.js         # Critical alerts
├── activities.js     # Activity log entries
└── plans.js          # Optimization plans
```

### Mock API Service
```javascript
// src/services/mockApi.js
export const mockApi = {
  getDashboardSummary: async () => {
    await delay(300); // Simulate network latency
    return { success: true, data: dashboardData };
  },
  // ... other methods
};
```

---

## 🔄 Real Backend Integration Strategy

### 1. API Service Layer (Replace Mock)

Create `src/services/api.js`:

```javascript
// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// HTTP Client with error handling
const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
};

// Real API Service
export const api = {
  // Dashboard Data
  getDashboardSummary: () => apiClient.get('/dashboard/summary'),
  
  // Depot Data
  getDepots: () => apiClient.get('/depots'),
  
  // Route Monitoring
  getRoutes: () => apiClient.get('/routes/live'),
  
  // Alerts
  getAlerts: () => apiClient.get('/alerts/active'),
  
  // Activities
  getActivities: (limit = 10) => apiClient.get(`/activities?limit=${limit}`),
  
  // Plans
  getActivePlan: () => apiClient.get('/plans/active'),
  getAllPlans: () => apiClient.get('/plans')
};
```


### 2. Environment Configuration

Create `.env` file:
```bash
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=true  # Toggle between mock and real API

# Auto-refresh intervals (milliseconds)
VITE_REFRESH_DASHBOARD=30000
VITE_REFRESH_ROUTES=30000
VITE_REFRESH_ALERTS=10000
```

### 3. Component Integration Pattern

```javascript
// Example: RouteMonitoring.jsx
import { useApiData } from '@hooks/useApiData';
import api from '@services/api';

export const RouteMonitoring = () => {
  // Fetch with auto-refresh
  const { data, loading, error, isRefreshing } = useApiData(
    api.getRoutes,
    { refreshInterval: 30000 }
  );

  const routes = data?.routes || [];

  // Handle loading state
  if (loading && !data) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Handle empty state
  if (routes.length === 0) {
    return <EmptyState message="No routes available" />;
  }

  // Render data
  return <RouteTable routes={routes} />;
};
```

---

## 🎨 UI Dynamic Behavior

### 1. Table Responsiveness

**Problem**: Tables with varying row counts need to handle:
- Empty states (0 rows)
- Small datasets (1-5 rows)
- Medium datasets (6-20 rows)
- Large datasets (20+ rows)

**Solution**: Implemented in CSS

```css
/* Route Table - Dynamic Height */
.tableContainer {
  overflow-x: auto;
  max-height: 600px;  /* Limit height for large datasets */
  overflow-y: auto;
}

/* Scrollbar styling */
.tableContainer::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.tableContainer::-webkit-scrollbar-thumb {
  background: #B8860B;
  border-radius: 4px;
}
```

### 2. Empty States

Each component has dedicated empty states:

```jsx
// Empty State Component
{filteredRoutes.length === 0 && (
  <div className={styles.emptyState}>
    <p>📋 No routes found</p>
    <p className={styles.emptyMessage}>
      {filter === 'delayed' && 'No delayed routes at this time'}
      {filter === 'all' && 'No route data available'}
    </p>
  </div>
)}
```

### 3. Loading States

```jsx
// Loading State with Spinner
{loading && !data && (
  <div className={styles.loadingState}>
    <div className={styles.spinner}></div>
    <p>Loading route data...</p>
  </div>
)}
```

### 4. Error States

```jsx
// Error State with Retry
{error && (
  <div className={styles.errorState}>
    <p>⚠️ Failed to load data</p>
    <p className={styles.errorMessage}>{error}</p>
    <button onClick={refetch}>Retry</button>
  </div>
)}
```

### 5. Refresh Indicators

```jsx
// Show refresh indicator during background updates
<h2 className={styles.sectionTitle}>
  LIVE ROUTE PERFORMANCE MONITORING
  {isRefreshing && <span className={styles.refreshIndicator}>⟳</span>}
</h2>
```

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │  Component   │──────│  useApiData  │                   │
│  │              │      │     Hook     │                   │
│  └──────────────┘      └──────┬───────┘                   │
│                               │                            │
│                               ▼                            │
│                        ┌──────────────┐                    │
│                        │  API Service │                    │
│                        │   (api.js)   │                    │
│                        └──────┬───────┘                    │
│                               │                            │
│                    ┌──────────┴──────────┐                 │
│                    │                     │                 │
│                    ▼                     ▼                 │
│            ┌──────────────┐      ┌──────────────┐         │
│            │  Mock API    │      │   Real API   │         │
│            │ (Development)│      │ (Production) │         │
│            └──────────────┘      └──────┬───────┘         │
│                                          │                 │
└──────────────────────────────────────────┼─────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   FastAPI    │──────│  PostgreSQL  │                   │
│  │   Server     │      │   Database   │                   │
│  └──────────────┘      └──────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Auto-Refresh Strategy

### Refresh Intervals by Component

| Component | Interval | Reason |
|-----------|----------|--------|
| Critical Alerts | 10s | Immediate attention needed |
| Route Monitoring | 30s | Real-time status updates |
| Fleet Overview | 30s | Live metrics |
| Depot Status | 60s | Less frequent changes |
| Activity Log | 30s | Recent activities |
| Today's Summary | 60s | Aggregated stats |

### Implementation

```javascript
// Component with auto-refresh
const { data, isRefreshing } = useApiData(
  api.getRoutes,
  { 
    refreshInterval: 30000,  // 30 seconds
    fetchOnMount: true
  }
);
```

---

## 🚀 Migration Path: Mock → Real API

### Phase 1: Development (Current)
```javascript
// .env
VITE_USE_MOCK=true
```
- All components use mock data
- No backend required
- Fast development iteration

### Phase 2: Backend Integration
```javascript
// .env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8000/api
```
- Switch to real API
- Backend must be running
- Test with real data

### Phase 3: Production
```javascript
// .env.production
VITE_USE_MOCK=false
VITE_API_URL=https://api.pmpml.local/api
```
- Production backend URL
- SSL/TLS enabled
- Authentication required

---

## 📱 Responsive Data Handling

### 1. Pagination for Large Datasets

```javascript
// For routes with 100+ entries
const { data, loadMore, hasMore } = usePaginatedData(
  api.getRoutes,
  20  // Page size
);

// Infinite scroll or "Load More" button
{hasMore && (
  <button onClick={loadMore}>Load More Routes</button>
)}
```

### 2. Virtual Scrolling (Future Enhancement)

For 1000+ rows, implement virtual scrolling:
```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={routes.length}
  itemSize={60}
>
  {({ index, style }) => (
    <RouteRow route={routes[index]} style={style} />
  )}
</FixedSizeList>
```

### 3. Search and Filtering

```javascript
const [searchTerm, setSearchTerm] = useState('');

const filteredRoutes = routes.filter(route =>
  route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  route.id.toString().includes(searchTerm)
);
```

---

## 🎯 UI Improvements for Production

### 1. Loading Skeletons

Replace spinners with content skeletons:

```jsx
// Skeleton for route table
<div className={styles.skeletonRow}>
  <div className={styles.skeletonCell} />
  <div className={styles.skeletonCell} />
  <div className={styles.skeletonCell} />
</div>
```

```css
.skeletonCell {
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(184, 134, 11, 0.1) 25%,
    rgba(184, 134, 11, 0.2) 50%,
    rgba(184, 134, 11, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 2. Optimistic Updates

Update UI immediately, sync with backend:

```javascript
const handleDismissAlert = async (alertId) => {
  // Update UI immediately
  setAlerts(prev => prev.filter(a => a.id !== alertId));
  
  try {
    // Sync with backend
    await api.dismissAlert(alertId);
  } catch (error) {
    // Rollback on error
    setAlerts(originalAlerts);
    showError('Failed to dismiss alert');
  }
};
```

### 3. Error Recovery

```javascript
const { data, error, refetch } = useApiData(api.getRoutes);

{error && (
  <div className={styles.errorBanner}>
    <p>⚠️ Connection lost. Retrying...</p>
    <button onClick={refetch}>Retry Now</button>
  </div>
)}
```

### 4. Offline Support (Future)

```javascript
// Service Worker for offline caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Cache API responses
const cachedData = localStorage.getItem('dashboard_cache');
if (cachedData && !navigator.onLine) {
  setData(JSON.parse(cachedData));
}
```

---

## 🔧 Testing Strategy

### 1. Mock API Testing

```javascript
// tests/api.test.js
import { api } from '@services/api';

describe('API Service', () => {
  it('fetches dashboard data', async () => {
    const data = await api.getDashboardSummary();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
  });
});
```

### 2. Component Testing with Mock Data

```javascript
// tests/RouteMonitoring.test.jsx
import { render, screen } from '@testing-library/react';
import { RouteMonitoring } from '@components/home/RouteMonitoring';

jest.mock('@services/api', () => ({
  getRoutes: jest.fn(() => Promise.resolve({
    success: true,
    routes: [/* mock data */]
  }))
}));

test('renders route table', async () => {
  render(<RouteMonitoring />);
  expect(await screen.findByText('LIVE ROUTE PERFORMANCE')).toBeInTheDocument();
});
```

### 3. Integration Testing

```javascript
// tests/integration/dashboard.test.js
describe('Dashboard Integration', () => {
  it('loads all components with real API', async () => {
    // Start mock server
    const server = setupMockServer();
    
    render(<HomePage />);
    
    // Wait for all data to load
    await waitFor(() => {
      expect(screen.getByText('FLEET OVERVIEW')).toBeInTheDocument();
      expect(screen.getByText('ROUTE MONITORING')).toBeInTheDocument();
    });
    
    server.close();
  });
});
```

---

## 📈 Performance Optimization

### 1. Data Caching

```javascript
// Cache API responses
const cache = new Map();

const getCachedData = async (key, fetcher, ttl = 60000) => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

// Usage
const data = await getCachedData('routes', api.getRoutes, 30000);
```

### 2. Request Debouncing

```javascript
import { debounce } from 'lodash';

const debouncedSearch = debounce((term) => {
  api.searchRoutes(term);
}, 500);
```

### 3. Lazy Loading

```javascript
// Lazy load heavy components
const ReportGenerator = lazy(() => import('./ReportGenerator'));

<Suspense fallback={<LoadingSpinner />}>
  <ReportGenerator />
</Suspense>
```

---

## 🎯 Summary

### Current State
✅ Mock data working perfectly
✅ All UI components responsive
✅ Vintage aesthetic maintained
✅ Auto-refresh implemented

### Ready for Backend Integration
✅ API service layer created
✅ Environment configuration
✅ Loading/error/empty states
✅ Auto-refresh with intervals
✅ Dynamic data handling

### Next Steps
1. Backend team implements FastAPI endpoints
2. Frontend switches `VITE_USE_MOCK=false`
3. Test with real data
4. Deploy to production

### Key Benefits
- **Zero code changes** needed in components
- **Seamless transition** from mock to real API
- **Production-ready** error handling
- **Scalable** for large datasets
- **Maintainable** separation of concerns

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-12  
**Status:** Ready for Backend Integration
