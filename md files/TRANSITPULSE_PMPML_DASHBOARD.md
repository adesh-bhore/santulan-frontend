# TransitPulse — PMPML Command Center Dashboard
## Realistic Operational Dashboard Design Specification
### Heritage Vintage Interface for Modern Fleet Management

---

## 🎯 Real-World PMPML Operations Context

### What PMPML Operations Officers Actually Need Daily:

**Morning Shift (6:00 AM - 2:00 PM):**
- Fleet readiness status at dawn
- Driver attendance tracking
- Bus departure confirmations from all depots
- Route coverage verification
- Emergency vehicle allocation
- Breakdown/maintenance alerts

**Afternoon Shift (2:00 PM - 10:00 PM):**
- Peak hour performance monitoring
- Route overcrowding alerts
- Driver shift changeovers
- Fuel consumption tracking
- Real-time schedule adherence

**Night Shift (10:00 PM - 6:00 AM):**
- Last service completion tracking
- Depot return confirmations
- Night maintenance scheduling
- Tomorrow's plan preparation
- Automated optimization runs

**Weekly Operations:**
- Fleet utilization analysis
- Driver performance review
- Route efficiency evaluation
- Cost vs budget tracking
- Maintenance scheduling

**Monthly Operations:**
- Financial reporting
- Fleet expansion planning
- Route optimization review
- Driver training schedules
- Stakeholder presentations

---

## 📊 DASHBOARD LAYOUT: "The Control Station Command View"

### Visual Philosophy

The dashboard is designed as a **Railway Control Station Telegraph Board** — where information flows like train schedules on vintage departure boards, with real-time updates displayed in mechanical counters and signal lamps.

### Master Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║                    STATUS TELEGRAPH BAR                       ║
║  ⦿ SYSTEM OPERATIONAL │ 14:32:45 │ PLAN v4 ACTIVE │ R.SHARMA ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  CRITICAL ALERTS & NOTIFICATIONS                        │ ║
║  │  🔴 3 buses delayed >15min │ ⚠️ Depot 2 fuel low      │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌──────────────┬──────────────┬──────────────┬────────────┐ ║
║  │ FLEET STATUS │ DRIVER MGMT  │ ROUTE MONITOR│ OPERATIONS │ ║
║  ├──────────────┴──────────────┴──────────────┴────────────┤ ║
║  │                                                          │ ║
║  │  ╔════════════════════════════════════════════════════╗ │ ║
║  │  ║      REAL-TIME FLEET OPERATIONAL OVERVIEW         ║ │ ║
║  │  ╠════════════════════════════════════════════════════╣ │ ║
║  │  ║                                                    ║ │ ║
║  │  ║  [Live Gauges]  [Status Board]  [Quick Actions]  ║ │ ║
║  │  ║                                                    ║ │ ║
║  │  ╚════════════════════════════════════════════════════╝ │ ║
║  │                                                          │ ║
║  │  ╔════════════════════════════════════════════════════╗ │ ║
║  │  ║        DEPOT-WISE OPERATIONAL STATUS              ║ │ ║
║  │  ╚════════════════════════════════════════════════════╝ │ ║
║  │                                                          │ ║
║  │  ╔════════════════════════════════════════════════════╗ │ ║
║  │  ║      LIVE ROUTE PERFORMANCE MONITORING            ║ │ ║
║  │  ╚════════════════════════════════════════════════════╝ │ ║
║  │                                                          │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  ACTIVITY TIMELINE │ TODAY'S SUMMARY │ QUICK REPORTS    │ ║
║  └─────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🚨 SECTION 1: Critical Alerts Banner

### Purpose
Immediate attention to operational issues requiring officer intervention

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  🚨 CRITICAL ALERTS & PRIORITY NOTIFICATIONS                  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  🔴 Bus MH-12-5847 delayed 18 min on Route 401               │
│     Location: Swargate → Action: [ASSIGN BACKUP] [DISMISS]   │
│                                                               │
│  ⚠️ Depot 2 (Nigdi) fuel level 15% — Refill required         │
│     Status: Tanker scheduled 15:00 → [VIEW DETAILS]          │
│                                                               │
│  🟡 Driver D-0234 approaching 7.5 hrs duty time               │
│     Action: Relief driver dispatching → [TRACK]              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*        CRITICAL ALERTS BANNER           */
/* ═══════════════════════════════════════ */

.alerts-banner {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  border: 4px solid #B8860B;
  border-radius: 8px;
  padding: 16px 24px;
  margin-bottom: 24px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 8px 20px rgba(0,0,0,0.5),
    inset 0 -2px 10px rgba(0,0,0,0.3);
}

.alerts-header {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(184, 134, 11, 0.4);
  
  display: flex;
  align-items: center;
  gap: 10px;
}

.alerts-header::before {
  content: '🚨';
  font-size: 20px;
  animation: pulse-alert 2s ease-in-out infinite;
}

@keyframes pulse-alert {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.alert-item {
  background: rgba(155, 34, 38, 0.15);
  border-left: 5px solid var(--alert-color, #9B2226);
  border-radius: 6px;
  padding: 14px 18px;
  margin: 10px 0;
  
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  
  transition: all 0.3s ease;
}

.alert-item:hover {
  background: rgba(155, 34, 38, 0.25);
  border-left-width: 7px;
  padding-left: 16px;
}

.alert-item[data-severity="critical"] {
  --alert-color: #9B2226;
  background: rgba(155, 34, 38, 0.2);
}

.alert-item[data-severity="warning"] {
  --alert-color: #CA6702;
  background: rgba(202, 103, 2, 0.15);
}

.alert-item[data-severity="info"] {
  --alert-color: #B8860B;
  background: rgba(184, 134, 11, 0.1);
}

.alert-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.alert-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.alert-message {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--parchment-white);
  line-height: 1.4;
}

.alert-details {
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(244, 241, 222, 0.8);
  line-height: 1.5;
}

.alert-actions {
  display: flex;
  gap: 8px;
}

.alert-action-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 2px solid #704214;
  border-radius: 4px;
  padding: 6px 14px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  
  cursor: pointer;
  white-space: nowrap;
  
  transition: all 0.2s ease;
  
  box-shadow: 
    0 2px 6px rgba(0,0,0,0.4),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.alert-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.5),
    0 0 12px rgba(212, 175, 55, 0.4);
}

.alert-action-btn.dismiss {
  background: rgba(255,255,255,0.1);
  color: rgba(244, 241, 222, 0.9);
  border-color: rgba(112, 66, 20, 0.5);
}

.alert-action-btn.dismiss:hover {
  background: rgba(255,255,255,0.2);
}

/* Empty State */
.alerts-empty {
  padding: 24px;
  text-align: center;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(244, 241, 222, 0.6);
  font-style: italic;
}

.alerts-empty::before {
  content: '✓';
  display: block;
  font-size: 32px;
  color: var(--signal-green);
  margin-bottom: 8px;
}
```

---

## 📊 SECTION 2: Real-Time Fleet Operational Overview

### Purpose
At-a-glance status of entire PMPML fleet operations

### Visual Layout

```
┌───────────────────────────────────────────────────────────────┐
│  REAL-TIME FLEET OPERATIONAL OVERVIEW                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   ╱─────╲   │  │   ╱─────╲   │  │   ╱─────╲   │          │
│  │  │  118  │  │  │  │  106  │  │  │  │  450  │  │          │
│  │   ╲─────╱   │  │   ╲─────╱   │  │   ╲─────╱   │          │
│  │ BUSES ACTIVE │  │DRIVERS DUTY │  │TRIPS COVERED│          │
│  │  of 127 total│  │ of 145 total│  │ of 450 total│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   ╱─────╲   │  │   ╱─────╲   │  │   ╱─────╲   │          │
│  │  │  93%  │  │  │  │  87%  │  │  │  │  15.2 │  │          │
│  │   ╲─────╱   │  │   ╲─────╱   │  │   ╲─────╱   │          │
│  │  FLEET UTIL  │  │ FUEL EFFIC  │  │  AVG KMPL   │          │
│  │   Target 90% │  │  Target 85% │  │ vs 14.8 plan│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  STATUS BREAKDOWN                                        ││
│  ├──────────────────────────────────────────────────────────┤│
│  │  ⦿ On Route: 105 buses │ ⏸ At Depot: 13 │ ⚙ Workshop: 9││
│  │  ⏰ On Schedule: 98 │ ⚠️ Delayed: 7 │ 🔴 Breakdown: 0  ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  QUICK ACTIONS                                           ││
│  │  [View Live Fleet Map] [Driver Roster] [Fuel Dashboard] ││
│  └──────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     FLEET OPERATIONAL OVERVIEW          */
/* ═══════════════════════════════════════ */

.fleet-overview {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 10px 30px rgba(0,0,0,0.4),
    inset 0 0 0 1px rgba(184, 134, 11, 0.2);
}

.section-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 3px double #8B6914;
  
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #B8860B, transparent);
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 1400px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.metric-gauge {
  background: rgba(27, 73, 101, 0.05);
  border: 4px solid rgba(27, 73, 101, 0.3);
  border-radius: 8px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  transition: all 0.3s ease;
  
  position: relative;
  overflow: hidden;
}

.metric-gauge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--signal-green) 0%, 
    var(--signal-green) var(--gauge-percent, 0%), 
    transparent var(--gauge-percent, 0%));
}

.metric-gauge:hover {
  background: rgba(27, 73, 101, 0.1);
  border-color: rgba(27, 73, 101, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.metric-dial {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: 
    radial-gradient(
      circle at 35% 35%,
      #1B4965 0%,
      #0F2A3D 100%
    );
  border: 4px solid #704214;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: relative;
  
  box-shadow: 
    0 0 0 2px #B8860B,
    0 6px 16px rgba(0,0,0,0.4),
    inset 0 0 20px rgba(0,0,0,0.4);
}

.metric-value {
  font-family: var(--font-numbers);
  font-size: 32px;
  font-weight: 700;
  color: #D4AF37;
  line-height: 1;
  
  text-shadow: 
    0 0 10px rgba(212, 175, 55, 0.6),
    2px 2px 4px rgba(0,0,0,0.6);
}

.metric-unit {
  font-family: var(--font-body);
  font-size: 10px;
  color: #8B6914;
  margin-left: 2px;
}

.metric-label {
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
  text-align: center;
}

.metric-sublabel {
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--steel-brushed);
  text-align: center;
}

/* Status Trend Indicator */
.metric-trend {
  position: absolute;
  top: 8px;
  right: 8px;
  
  display: flex;
  align-items: center;
  gap: 4px;
  
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  
  padding: 4px 8px;
  border-radius: 12px;
  
  background: rgba(0,0,0,0.2);
}

.metric-trend.up {
  color: var(--signal-green);
}

.metric-trend.down {
  color: var(--signal-red);
}

.metric-trend.stable {
  color: var(--brass-accent);
}

/* Status Breakdown Bar */
.status-breakdown {
  background: rgba(62, 39, 35, 0.1);
  border: 3px solid #704214;
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0;
}

.status-breakdown-title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 12px;
}

.status-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  
  padding: 8px 12px;
  background: rgba(255,255,255,0.5);
  border-left: 3px solid var(--status-color, #B8860B);
  border-radius: 4px;
  
  transition: all 0.2s ease;
}

.status-item:hover {
  background: rgba(255,255,255,0.8);
  border-left-width: 5px;
  padding-left: 10px;
}

.status-item[data-status="active"] { --status-color: #2D6A4F; }
.status-item[data-status="idle"] { --status-color: #8B6914; }
.status-item[data-status="maintenance"] { --status-color: #CA6702; }
.status-item[data-status="delayed"] { --status-color: #9B2226; }

.status-icon {
  font-size: 16px;
}

.status-count {
  font-weight: 700;
  color: var(--railway-blue);
  margin-left: auto;
}

/* Quick Actions */
.quick-actions-panel {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(139, 105, 20, 0.3);
}

.quick-action-button {
  flex: 1;
  min-width: 180px;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 12px 20px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.quick-action-button:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.quick-action-button:active {
  transform: translateY(0);
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
}
```

---

## 🏢 SECTION 3: Depot-Wise Operational Status

### Purpose
Monitor fleet distribution and operations across all PMPML depots

### Visual Layout

```
┌───────────────────────────────────────────────────────────────┐
│  DEPOT-WISE OPERATIONAL STATUS                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏢 SWARGATE DEPOT                          STATUS: ⦿  │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Buses: 42/45 active │ Drivers: 38/42 │ Fuel: 78%    │  │
│  │  ▓▓▓▓▓▓▓▓░░░░ Routes: 32 covered │ Next: 15:30     │  │
│  │  Last Departure: MH-12-5847 on 401 at 14:28          │  │
│  │  [VIEW DETAILS] [DISPATCH] [FUEL LOG]                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏢 NIGDI DEPOT                             STATUS: ⚠️  │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Buses: 38/40 active │ Drivers: 34/38 │ Fuel: 15% ⚠️│  │
│  │  ▓▓▓▓▓▓▓▓▓░░░ Routes: 28 covered │ Next: 15:45     │  │
│  │  Alert: Low fuel - Refill scheduled 15:00            │  │
│  │  [VIEW DETAILS] [DISPATCH] [FUEL LOG]                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏢 BHOSARI DEPOT                           STATUS: ⦿  │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Buses: 25/28 active │ Drivers: 22/26 │ Fuel: 65%    │  │
│  │  ▓▓▓▓▓▓▓░░░░░ Routes: 18 covered │ Next: 16:00     │  │
│  │  Maintenance: 3 buses in workshop (Est. 2 days)      │  │
│  │  [VIEW DETAILS] [DISPATCH] [FUEL LOG]                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏢 KATRAJ DEPOT                            STATUS: ⦿  │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Buses: 13/14 active │ Drivers: 12/14 │ Fuel: 82%    │  │
│  │  ▓▓▓▓▓▓▓▓▓▓░░ Routes: 12 covered │ Next: 16:15     │  │
│  │  All systems nominal - No issues reported             │  │
│  │  [VIEW DETAILS] [DISPATCH] [FUEL LOG]                │  │
│  └────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     DEPOT-WISE STATUS SECTION           */
/* ═══════════════════════════════════════ */

.depots-status-section {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 10px 30px rgba(0,0,0,0.4);
}

.depot-card {
  background: 
    linear-gradient(135deg, 
      rgba(62, 39, 35, 0.03) 0%, 
      rgba(62, 39, 35, 0.08) 100%);
  border: 4px solid #704214;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  
  overflow: hidden;
  
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.2),
    inset 0 0 0 1px rgba(184, 134, 11, 0.2);
}

.depot-card:hover {
  border-color: #B8860B;
  transform: translateY(-2px);
  box-shadow: 
    0 6px 16px rgba(0,0,0,0.3),
    0 0 16px rgba(184, 134, 11, 0.2);
}

.depot-card[data-status="warning"] {
  border-color: #CA6702;
}

.depot-card[data-status="critical"] {
  border-color: #9B2226;
}

/* Depot Header */
.depot-header {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  padding: 14px 20px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border-bottom: 2px solid #8B6914;
}

.depot-name {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #D4AF37;
  
  display: flex;
  align-items: center;
  gap: 10px;
}

.depot-icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.depot-status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment-white);
}

.status-lamp-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #704214;
  
  box-shadow: 
    inset 0 1px 2px rgba(255,255,255,0.3),
    0 0 8px var(--lamp-color, #2D6A4F);
  
  background: var(--lamp-color, #2D6A4F);
  
  animation: status-pulse 2s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% { 
    box-shadow: 
      inset 0 1px 2px rgba(255,255,255,0.3),
      0 0 8px var(--lamp-color); 
  }
  50% { 
    box-shadow: 
      inset 0 1px 2px rgba(255,255,255,0.3),
      0 0 16px var(--lamp-color); 
  }
}

.depot-card[data-status="operational"] .status-lamp-indicator {
  --lamp-color: #2D6A4F;
}

.depot-card[data-status="warning"] .status-lamp-indicator {
  --lamp-color: #CA6702;
}

.depot-card[data-status="critical"] .status-lamp-indicator {
  --lamp-color: #9B2226;
}

/* Depot Content */
.depot-content {
  padding: 18px 20px;
}

.depot-metrics-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 14px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
}

.depot-metric {
  display: flex;
  align-items: center;
  gap: 6px;
}

.depot-metric-label {
  color: var(--sepia-tone);
}

.depot-metric-value {
  font-weight: 700;
  color: var(--railway-blue);
}

.depot-metric-warning {
  color: var(--signal-red);
  font-weight: 700;
  
  display: flex;
  align-items: center;
  gap: 4px;
}

.depot-metric-warning::after {
  content: '⚠️';
  font-size: 14px;
}

/* Progress Bars */
.depot-progress-row {
  margin: 12px 0;
  
  display: flex;
  align-items: center;
  gap: 12px;
}

.depot-progress-bar {
  flex: 1;
  height: 20px;
  background: rgba(139, 105, 20, 0.2);
  border: 2px solid #704214;
  border-radius: 4px;
  overflow: hidden;
  
  position: relative;
  
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.depot-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #B8860B 0%, #D4AF37 100%);
  width: var(--progress-percent, 0%);
  
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.3);
}

.depot-progress-label {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  white-space: nowrap;
}

/* Alert Message */
.depot-alert-message {
  background: rgba(202, 103, 2, 0.1);
  border-left: 4px solid var(--signal-amber);
  border-radius: 4px;
  padding: 10px 14px;
  margin: 12px 0;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.depot-alert-message.success {
  background: rgba(45, 106, 79, 0.1);
  border-left-color: var(--signal-green);
}

.depot-alert-icon {
  font-size: 14px;
  flex-shrink: 0;
}

/* Depot Actions */
.depot-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 2px solid rgba(139, 105, 20, 0.2);
}

.depot-action-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 2px solid #704214;
  border-radius: 4px;
  padding: 8px 16px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  
  cursor: pointer;
  transition: all 0.2s ease;
  
  box-shadow: 
    0 2px 6px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.depot-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.4),
    0 0 12px rgba(212, 175, 55, 0.3);
}

/* Last Activity */
.depot-last-activity {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--steel-brushed);
  font-style: italic;
  margin-top: 10px;
}
```

---

## 🗺️ SECTION 4: Live Route Performance Monitoring

### Purpose
Real-time monitoring of high-priority routes with delay tracking

### Visual Layout

```
┌───────────────────────────────────────────────────────────────┐
│  LIVE ROUTE PERFORMANCE MONITORING                            │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────┬──────────────────────────┬──────────┬─────┬────────┐│
│  │ RTE │ ROUTE NAME               │ STATUS   │DELAY│ ACTION ││
│  ├─────┼──────────────────────────┼──────────┼─────┼────────┤│
│  │ 401 │ Swargate → Katraj        │ ⦿ ACTIVE │ +3m │ [VIEW] ││
│  │     │ Next: MH-12-5847 @ 14:32 │ 3/5 trips│     │        ││
│  ├─────┼──────────────────────────┼──────────┼─────┼────────┤│
│  │ 205 │ Nigdi → Pimpri           │ ⚠️ DELAY │+18m │ [ALERT]││
│  │     │ Next: MH-12-6012 @ 14:40 │ 2/4 trips│     │        ││
│  ├─────┼──────────────────────────┼──────────┼─────┼────────┤│
│  │ 156 │ Shivajinagar → Hadapsar  │ ⦿ ACTIVE │ +1m │ [VIEW] ││
│  │     │ Next: MH-12-7234 @ 14:35 │ 4/6 trips│     │        ││
│  ├─────┼──────────────────────────┼──────────┼─────┼────────┤│
│  │ 302 │ Bhosari → PCMC           │ ⦿ ACTIVE │  0m │ [VIEW] ││
│  │     │ Next: MH-12-8901 @ 14:38 │ 3/4 trips│     │        ││
│  └─────┴──────────────────────────┴──────────┴─────┴────────┘│
│                                                               │
│  [VIEW ALL 125 ROUTES] [PRIORITY ROUTES] [DELAYED ONLY]      │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     ROUTE PERFORMANCE MONITORING        */
/* ═══════════════════════════════════════ */

.route-monitoring-section {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 10px 30px rgba(0,0,0,0.4);
}

.route-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px 0;
  
  background: rgba(255,255,255,0.3);
  border: 3px solid #704214;
  border-radius: 8px;
  overflow: hidden;
}

.route-table thead {
  background: linear-gradient(135deg, #704214 0%, #5A3410 100%);
}

.route-table th {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-white);
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid #8B6914;
  
  white-space: nowrap;
}

.route-table tbody tr {
  background: rgba(255,255,255,0.5);
  border-bottom: 2px solid rgba(139, 105, 20, 0.2);
  
  transition: all 0.2s ease;
}

.route-table tbody tr:hover {
  background: rgba(184, 134, 11, 0.15);
  box-shadow: inset 0 0 0 2px rgba(184, 134, 11, 0.3);
}

.route-table tbody tr[data-status="delayed"] {
  background: rgba(202, 103, 2, 0.1);
}

.route-table tbody tr[data-status="delayed"]:hover {
  background: rgba(202, 103, 2, 0.2);
}

.route-table td {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  padding: 14px 16px;
  vertical-align: top;
}

/* Route ID Column */
.route-id {
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: var(--railway-blue);
  
  background: rgba(27, 73, 101, 0.1);
  text-align: center;
  
  min-width: 60px;
}

/* Route Info Column */
.route-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-name {
  font-weight: 700;
  color: var(--government-seal);
}

.route-next-bus {
  font-size: 11px;
  color: var(--sepia-tone);
}

/* Status Column */
.route-status {
  text-align: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  padding: 6px 12px;
  border-radius: 20px;
  
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  
  background: var(--badge-bg, rgba(45, 106, 79, 0.2));
  color: var(--badge-color, #1B4332);
  border: 2px solid var(--badge-border, #2D6A4F);
}

.status-badge[data-status="active"] {
  --badge-bg: rgba(45, 106, 79, 0.2);
  --badge-color: #1B4332;
  --badge-border: #2D6A4F;
}

.status-badge[data-status="delayed"] {
  --badge-bg: rgba(202, 103, 2, 0.2);
  --badge-color: #7A2E00;
  --badge-border: #CA6702;
}

.status-badge[data-status="inactive"] {
  --badge-bg: rgba(113, 121, 126, 0.2);
  --badge-color: #363636;
  --badge-border: #71797E;
}

.trip-progress {
  font-size: 10px;
  color: var(--steel-brushed);
  margin-top: 4px;
}

/* Delay Column */
.route-delay {
  text-align: center;
  font-family: var(--font-numbers);
  font-size: 18px;
  font-weight: 700;
}

.route-delay[data-delay="0"] {
  color: var(--signal-green);
}

.route-delay[data-delay="minor"] {
  color: var(--brass-accent);
}

.route-delay[data-delay="major"] {
  color: var(--signal-red);
  animation: blink-delay 2s ease-in-out infinite;
}

@keyframes blink-delay {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Action Column */
.route-action {
  text-align: center;
}

.route-action-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 2px solid #704214;
  border-radius: 4px;
  padding: 6px 12px;
  
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  
  cursor: pointer;
  white-space: nowrap;
  
  transition: all 0.2s ease;
  
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.route-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.4),
    0 0 10px rgba(212, 175, 55, 0.3);
}

.route-action-btn.alert {
  background: linear-gradient(135deg, #CA6702 0%, #9B5002 100%);
  color: white;
  border-color: #7A2E00;
}

.route-action-btn.alert:hover {
  background: linear-gradient(135deg, #E07702 0%, #CA6702 100%);
}

/* Table Filter Buttons */
.route-filter-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(139, 105, 20, 0.3);
}

.route-filter-btn {
  flex: 1;
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 10px 18px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.route-filter-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.route-filter-btn.active {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
}
```

---

## 📊 SECTION 5: Bottom Panel - Activity Timeline & Summary

### Purpose
Quick access to recent activity, daily summary stats, and instant reports

### Visual Layout

```
┌───────────────────────────────────────────────────────────────┐
│  ┌──────────────────┬──────────────────┬─────────────────┐   │
│  │ ACTIVITY LOG     │ TODAY'S SUMMARY  │ INSTANT REPORTS │   │
│  ├──────────────────┼──────────────────┼─────────────────┤   │
│  │                  │                  │                 │   │
│  │ 14:32 Bus 5847   │ Trips: 287/450   │ [Daily Ops]     │   │
│  │ completed 401    │ On-time: 94%     │ [Fleet Status]  │   │
│  │                  │ Fuel: 1,847L     │ [Driver Hrs]    │   │
│  │ 14:25 Driver D234│ Revenue: ₹42.3k  │ [Cost Report]   │   │
│  │ shift start      │ Breakdowns: 0    │                 │   │
│  │                  │ Delays: 7 buses  │                 │   │
│  │ [View All]       │ [Full Stats]     │ [Custom]        │   │
│  └──────────────────┴──────────────────┴─────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     BOTTOM PANEL - ACTIVITY & SUMMARY   */
/* ═══════════════════════════════════════ */

.bottom-panel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}

@media (max-width: 1200px) {
  .bottom-panel {
    grid-template-columns: 1fr;
  }
}

.panel-card {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 20px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 6px 16px rgba(0,0,0,0.3);
}

.panel-card-header {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #8B6914;
}

/* Activity Log */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 8px;
}

.activity-timeline::-webkit-scrollbar {
  width: 6px;
}

.activity-timeline::-webkit-scrollbar-track {
  background: rgba(139, 105, 20, 0.1);
  border-radius: 3px;
}

.activity-timeline::-webkit-scrollbar-thumb {
  background: #B8860B;
  border-radius: 3px;
}

.activity-item-log {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
  padding: 8px 12px;
  background: rgba(255,255,255,0.5);
  border-left: 3px solid var(--brass-accent);
  border-radius: 4px;
  
  transition: all 0.2s ease;
}

.activity-item-log:hover {
  background: rgba(184, 134, 11, 0.1);
  border-left-width: 5px;
  padding-left: 10px;
}

.activity-time {
  font-family: var(--font-numbers);
  font-weight: 700;
  color: var(--railway-blue);
  margin-right: 6px;
}

/* Summary Stats */
.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px 14px;
  background: rgba(27, 73, 101, 0.05);
  border: 2px solid rgba(27, 73, 101, 0.2);
  border-radius: 6px;
  
  transition: all 0.2s ease;
}

.summary-stat-item:hover {
  background: rgba(27, 73, 101, 0.1);
  border-color: rgba(27, 73, 101, 0.4);
}

.summary-stat-label {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--sepia-tone);
  font-weight: 600;
}

.summary-stat-value {
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: var(--railway-blue);
}

/* Instant Reports */
.instant-reports {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.instant-report-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 12px 16px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
  
  position: relative;
}

.instant-report-btn::before {
  content: '📊';
  margin-right: 8px;
}

.instant-report-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.panel-view-all-btn {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 2px solid rgba(139, 105, 20, 0.2);
  
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--brass-accent);
  text-align: center;
  cursor: pointer;
  
  transition: all 0.2s ease;
}

.panel-view-all-btn:hover {
  color: #D4AF37;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
}
```

---

## 🎨 Additional Dashboard Features

### Real-Time Clock Display

```css
/* ═══════════════════════════════════════ */
/*        DASHBOARD LIVE CLOCK             */
/* ═══════════════════════════════════════ */

.dashboard-live-clock {
  position: fixed;
  top: 70px;
  right: 220px;
  
  background: rgba(62, 39, 35, 0.95);
  border: 4px solid #B8860B;
  border-radius: 8px;
  padding: 12px 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  
  box-shadow: 
    0 6px 20px rgba(0,0,0,0.5),
    inset 0 0 20px rgba(0,0,0,0.3);
  
  z-index: 998;
}

.live-time {
  font-family: var(--font-numbers);
  font-size: 28px;
  font-weight: 700;
  color: #D4AF37;
  line-height: 1;
  
  text-shadow: 
    0 0 12px rgba(212, 175, 55, 0.8),
    2px 2px 4px rgba(0,0,0,0.6);
}

.live-date {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment-white);
}

.live-day {
  font-family: var(--font-body);
  font-size: 9px;
  color: rgba(244, 241, 222, 0.7);
}
```

---

## 📱 Dashboard Interactions & Behaviors

### Auto-Refresh Mechanism

```javascript
/* ═══════════════════════════════════════ */
/*        DASHBOARD AUTO-REFRESH           */
/* ═══════════════════════════════════════ */

class DashboardAutoRefresh {
  constructor() {
    this.refreshIntervals = {
      criticalAlerts: 10000,    // 10 seconds
      fleetStatus: 30000,       // 30 seconds
      depotStatus: 60000,       // 1 minute
      routeMonitoring: 30000,   // 30 seconds
      activityLog: 15000        // 15 seconds
    };
    
    this.init();
  }
  
  init() {
    // Start all refresh timers
    this.startRefreshTimer('criticalAlerts', this.refreshAlerts.bind(this));
    this.startRefreshTimer('fleetStatus', this.refreshFleetStatus.bind(this));
    this.startRefreshTimer('depotStatus', this.refreshDepotStatus.bind(this));
    this.startRefreshTimer('routeMonitoring', this.refreshRouteMonitoring.bind(this));
    this.startRefreshTimer('activityLog', this.refreshActivityLog.bind(this));
    
    // Live clock
    this.startLiveClock();
  }
  
  startRefreshTimer(name, callback) {
    const interval = this.refreshIntervals[name];
    
    // Initial call
    callback();
    
    // Recurring calls
    setInterval(callback, interval);
  }
  
  async refreshAlerts() {
    const response = await fetch('/api/dashboard/alerts');
    const alerts = await response.json();
    this.updateAlertsUI(alerts);
  }
  
  async refreshFleetStatus() {
    const response = await fetch('/api/dashboard/fleet-status');
    const status = await response.json();
    this.updateFleetStatusUI(status);
  }
  
  async refreshDepotStatus() {
    const response = await fetch('/api/dashboard/depot-status');
    const depots = await response.json();
    this.updateDepotStatusUI(depots);
  }
  
  async refreshRouteMonitoring() {
    const response = await fetch('/api/dashboard/route-monitoring');
    const routes = await response.json();
    this.updateRouteMonitoringUI(routes);
  }
  
  async refreshActivityLog() {
    const response = await fetch('/api/dashboard/activity-log');
    const activities = await response.json();
    this.updateActivityLogUI(activities);
  }
  
  startLiveClock() {
    const updateClock = () => {
      const now = new Date();
      
      const timeStr = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const dateStr = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
      
      const dayStr = now.toLocaleDateString('en-IN', {
        weekday: 'long'
      }).toUpperCase();
      
      document.querySelector('.live-time').textContent = timeStr;
      document.querySelector('.live-date').textContent = dateStr;
      document.querySelector('.live-day').textContent = dayStr;
    };
    
    updateClock();
    setInterval(updateClock, 1000);
  }
  
  updateAlertsUI(alerts) {
    // Update alerts banner
  }
  
  updateFleetStatusUI(status) {
    // Update fleet overview metrics
  }
  
  updateDepotStatusUI(depots) {
    // Update depot cards
  }
  
  updateRouteMonitoringUI(routes) {
    // Update route table
  }
  
  updateActivityLogUI(activities) {
    // Update activity timeline
  }
}
```

---

## 🎯 Dashboard Success Criteria

**The dashboard succeeds when:**

✅ Officer can see entire fleet status in <3 seconds  
✅ Critical issues are immediately visible (red alerts at top)  
✅ No need to navigate away to check basic operations  
✅ Real-time updates happen automatically  
✅ Depot managers can see their depot's specific status  
✅ Route delays are tracked and highlighted  
✅ Daily summary provides quick overview for reporting  
✅ Interface feels authoritative and professional  
✅ Officer can take actions directly from dashboard  

**The dashboard fails if:**

❌ Information is stale or requires manual refresh  
❌ Critical alerts are buried or hard to notice  
❌ Too much scrolling required to see key metrics  
❌ Actions require too many clicks to execute  
❌ Data is confusing or contradictory  
❌ Performance is slow or laggy  

---

## 📋 Complete HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PMPML Command Center Dashboard</title>
  <link rel="stylesheet" href="styles/dashboard.css">
</head>
<body>

  <!-- Status Telegraph Bar -->
  <div class="status-telegraph">
    <div class="telegraph-section">
      <span class="telegraph-lamp"></span>
      <span>SYSTEM OPERATIONAL</span>
    </div>
    <div class="telegraph-divider"></div>
    <div class="telegraph-section">
      <span class="telegraph-badge">PLAN v4 ACTIVE</span>
    </div>
    <div class="telegraph-divider"></div>
    <div class="telegraph-section">
      <span>👤 R. SHARMA</span>
    </div>
  </div>
  
  <!-- Live Clock -->
  <div class="dashboard-live-clock">
    <div class="live-time">14:32:45</div>
    <div class="live-date">12-FEB-2026</div>
    <div class="live-day">THURSDAY</div>
  </div>
  
  <!-- Return to Hub Button -->
  <button class="return-hub-btn">
    RETURN TO HUB
  </button>
  
  <!-- Main Dashboard Container -->
  <div class="page-container dashboard-container">
    
    <!-- Page Header -->
    <div class="page-header">
      <div class="breadcrumb">
        <span class="breadcrumb-item">Hub</span>
        <span class="breadcrumb-separator">→</span>
        <span class="breadcrumb-item active">Command Center Dashboard</span>
      </div>
      
      <h1 class="page-title">
        <span class="page-icon">🏠</span>
        COMMAND CENTER DASHBOARD
      </h1>
      
      <div class="page-subtitle">
        Real-time PMPML fleet operations overview and control center
      </div>
    </div>
    
    <!-- Critical Alerts Banner -->
    <div class="alerts-banner">
      <div class="alerts-header">
        CRITICAL ALERTS & PRIORITY NOTIFICATIONS
      </div>
      
      <div class="alert-item" data-severity="critical">
        <div class="alert-icon">🔴</div>
        <div class="alert-content">
          <div class="alert-message">
            Bus MH-12-5847 delayed 18 minutes on Route 401
          </div>
          <div class="alert-details">
            Location: Swargate Junction → Next stop: Katraj (Est. 15:10)
          </div>
        </div>
        <div class="alert-actions">
          <button class="alert-action-btn">ASSIGN BACKUP</button>
          <button class="alert-action-btn dismiss">DISMISS</button>
        </div>
      </div>
      
      <!-- More alerts... -->
    </div>
    
    <!-- Fleet Overview Section -->
    <div class="fleet-overview">
      <h2 class="section-title">
        REAL-TIME FLEET OPERATIONAL OVERVIEW
      </h2>
      
      <div class="metrics-grid">
        <div class="metric-gauge" style="--gauge-percent: 93%;">
          <div class="metric-dial">
            <div class="metric-value">118</div>
          </div>
          <div class="metric-label">BUSES ACTIVE</div>
          <div class="metric-sublabel">of 127 total</div>
          <div class="metric-trend up">↑ +5</div>
        </div>
        
        <!-- More gauges... -->
      </div>
      
      <div class="status-breakdown">
        <div class="status-breakdown-title">STATUS BREAKDOWN</div>
        <div class="status-items">
          <div class="status-item" data-status="active">
            <span class="status-icon">⦿</span>
            <span>On Route</span>
            <span class="status-count">105</span>
          </div>
          <!-- More status items... -->
        </div>
      </div>
      
      <div class="quick-actions-panel">
        <button class="quick-action-button">VIEW LIVE FLEET MAP</button>
        <button class="quick-action-button">DRIVER ROSTER</button>
        <button class="quick-action-button">FUEL DASHBOARD</button>
      </div>
    </div>
    
    <!-- Depot Status Section -->
    <div class="depots-status-section">
      <h2 class="section-title">
        DEPOT-WISE OPERATIONAL STATUS
      </h2>
      
      <div class="depot-card" data-status="operational">
        <!-- Depot content... -->
      </div>
      
      <!-- More depot cards... -->
    </div>
    
    <!-- Route Monitoring Section -->
    <div class="route-monitoring-section">
      <h2 class="section-title">
        LIVE ROUTE PERFORMANCE MONITORING
      </h2>
      
      <table class="route-table">
        <!-- Route table content... -->
      </table>
      
      <div class="route-filter-buttons">
        <button class="route-filter-btn active">VIEW ALL 125 ROUTES</button>
        <button class="route-filter-btn">PRIORITY ROUTES</button>
        <button class="route-filter-btn">DELAYED ONLY</button>
      </div>
    </div>
    
    <!-- Bottom Panel -->
    <div class="bottom-panel">
      <div class="panel-card">
        <div class="panel-card-header">ACTIVITY LOG</div>
        <div class="activity-timeline">
          <!-- Activity items... -->
        </div>
        <div class="panel-view-all-btn">View Complete Log →</div>
      </div>
      
      <div class="panel-card">
        <div class="panel-card-header">TODAY'S SUMMARY</div>
        <div class="summary-stats">
          <!-- Summary stats... -->
        </div>
        <div class="panel-view-all-btn">Full Statistics →</div>
      </div>
      
      <div class="panel-card">
        <div class="panel-card-header">INSTANT REPORTS</div>
        <div class="instant-reports">
          <button class="instant-report-btn">Daily Operations</button>
          <button class="instant-report-btn">Fleet Status</button>
          <button class="instant-report-btn">Driver Hours</button>
          <button class="instant-report-btn">Cost Report</button>
        </div>
        <div class="panel-view-all-btn">Custom Report →</div>
      </div>
    </div>
    
  </div>
  
  <script src="scripts/dashboard.js"></script>
</body>
</html>
```

---

**TransitPulse PMPML Dashboard v1.0**  
*Real-World Operational Command Center*  
*Designed for actual bus corporation operations officers*  
*Heritage Interface. Modern Functionality. Professional Authority.*
