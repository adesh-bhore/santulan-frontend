# Dashboard Redesign Implementation Plan

## Overview
Redesigning the Home Dashboard based on TRANSITPULSE_PMPML_DASHBOARD.md specifications to create a real-world operational command center for PMPML officers.

## Current Status
✅ Phase 3 Complete - Basic dashboard with:
- ActivePlanSummary
- DepotDistribution (basic table)
- QuickActions (2x2 grid)
- ActivityLog

## New Requirements

### 1. Critical Alerts Banner (NEW) ✅ CREATED
**Component**: `CriticalAlerts`
**Features**:
- Dark mahogany background with brass borders
- Alert severity levels (critical/warning/info)
- Action buttons (Assign Backup, Dismiss, etc.)
- Empty state with checkmark
- Auto-dismissal functionality

### 2. Enhanced Fleet Overview (ENHANCE EXISTING)
**Component**: `ActivePlanSummary` → Rename to `FleetOverview`
**Changes Needed**:
- Add 6 metric gauges (currently has 3 cards)
- Circular dial design with brass rim
- Status breakdown bar with icons
- Quick action buttons at bottom
- Trend indicators (↑/↓)
- Progress bars for each metric

### 3. Depot Status Cards (REDESIGN EXISTING)
**Component**: `DepotDistribution` → Redesign completely
**Changes Needed**:
- Card-based layout (not table)
- Depot header with status lamp indicator
- Fuel level warnings
- Progress bars for routes covered
- Alert messages per depot
- Action buttons per depot
- Last activity timestamp

### 4. Route Performance Monitoring (NEW)
**Component**: `RouteMonitoring` (NEW)
**Features**:
- Table with route details
- Status badges (Active/Delayed/Inactive)
- Delay tracking with color coding
- Trip progress indicators
- Action buttons per route
- Filter buttons (All/Priority/Delayed)

### 5. Bottom Panel Redesign (RESTRUCTURE)
**Components**: Restructure existing into 3-column layout
- **Activity Log** (keep existing, enhance styling)
- **Today's Summary** (NEW - replace current summary)
- **Instant Reports** (NEW - quick report buttons)

### 6. Live Clock Widget (NEW)
**Component**: `LiveClock` (NEW)
**Features**:
- Fixed position (top-right)
- Live time display (HH:MM:SS)
- Date and day display
- Brass styling with glow effect

### 7. Status Telegraph Bar (ENHANCE)
**Component**: Enhance existing breadcrumb area
**Features**:
- System status indicator
- Current plan badge
- User name display
- Brass dividers

## Implementation Order

### Phase 1: Core Components (Priority)
1. ✅ CriticalAlerts component
2. LiveClock component
3. Enhance FleetOverview with gauges
4. Redesign DepotDistribution as cards

### Phase 2: New Features
5. RouteMonitoring table component
6. TodaysSummary component
7. InstantReports component

### Phase 3: Integration & Polish
8. Restructure HomePage layout
9. Add auto-refresh mechanism
10. Add mock data for new components
11. Test and refine styling

## Mock Data Updates Needed

### alerts.js (NEW)
```javascript
export const mockAlerts = [
  {
    id: 1,
    severity: 'critical',
    icon: '🔴',
    message: 'Bus MH-12-5847 delayed 18 minutes on Route 401',
    details: 'Location: Swargate Junction → Next stop: Katraj (Est. 15:10)',
    actions: [
      { label: 'ASSIGN BACKUP', type: 'action' },
      { label: 'DISMISS', type: 'dismiss' }
    ]
  },
  // ...more alerts
];
```

### Enhance depots.js
Add: fuel levels, progress bars, alerts, last activity

### routes.js (NEW)
Route monitoring data with delays, status, trips

## File Structure

```
src/
├── components/
│   └── home/
│       ├── CriticalAlerts/          ✅ CREATED
│       ├── FleetOverview/           📝 TO ENHANCE
│       ├── DepotStatusCards/        📝 TO REDESIGN
│       ├── RouteMonitoring/         🆕 TO CREATE
│       ├── LiveClock/               🆕 TO CREATE
│       ├── TodaysSummary/           🆕 TO CREATE
│       ├── InstantReports/          🆕 TO CREATE
│       └── ActivityLog/             ✅ EXISTS (enhance styling)
├── mock-data/
│   ├── alerts.js                    🆕 TO CREATE
│   ├── routes.js                    🆕 TO CREATE
│   ├── dashboard.js                 📝 TO ENHANCE
│   └── depots.js                    📝 TO ENHANCE
└── pages/
    └── HomePage.jsx                 📝 TO RESTRUCTURE
```

## Next Steps

1. Create LiveClock component
2. Create mock data files (alerts.js, routes.js)
3. Enhance existing components one by one
4. Create new components (RouteMonitoring, TodaysSummary, InstantReports)
5. Restructure HomePage with new layout
6. Add auto-refresh logic
7. Test and polish

## Design Tokens to Add

```css
/* Additional colors for new design */
--mahogany-darker: #5A3410;
--parchment-white: #F4F1DE;
--signal-green: #2D6A4F;
--signal-amber: #CA6702;
--signal-red: #9B2226;
```

## Notes
- Keep vintage aesthetic consistent
- Maintain accessibility standards
- Ensure responsive design
- Add smooth transitions
- Implement auto-refresh for real-time feel
