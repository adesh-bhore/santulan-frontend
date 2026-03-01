# TransitPulse — PMPML Optimization Engine Control
## Realistic Fleet Optimization System Design Specification
### Heritage Vintage Interface for Route & Resource Optimization

---

## 🎯 Real-World PMPML Optimization Context

### What PMPML Officers Actually Need from Optimization:

**Daily Optimization Scenarios:**
- **Early morning** (2:00 AM): Automated daily optimization run
- **Mid-day adjustments**: Re-optimize when buses break down
- **Peak hour planning**: Optimize for festival/event days
- **Weekly review**: Compare optimization results over time
- **Monthly planning**: Optimize for new routes or seasonal changes

**Common Optimization Challenges:**
- **Driver shortage days**: Minimize drivers needed while covering all routes
- **Fuel budget constraints**: Optimize for minimum fuel consumption
- **Peak hour congestion**: Balance load across routes
- **Maintenance schedules**: Work around buses in workshop
- **Emergency situations**: Quick re-optimization when plans break

**Critical Decision Points:**
- Should I run optimization now or wait?
- What priority should I choose? (Cost vs Coverage vs Driver Hours)
- How much better is the new plan vs current?
- What are the trade-offs?
- Can I preview before activating?
- What if I need to rollback?

---

## 📊 OPTIMIZATION PAGE LAYOUT: "The Calculation Engine Chamber"

### Visual Philosophy

The page is designed as a **Vintage Engineering Calculation Chamber** — where optimization is presented like a steam-era precision engineering process with pressure gauges, calculation dials, and mechanical progress indicators showing the algorithmic engine at work.

### Master Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║                    STATUS TELEGRAPH BAR                       ║
║  ⦿ SYSTEM OPERATIONAL │ 14:32:45 │ PLAN v4 ACTIVE │ R.SHARMA ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  ⚙ OPTIMIZATION ENGINE CONTROL CENTER                   │ ║
║  │  Fleet Resource Allocation & Route Assignment Calculator│ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌──────────────────────────────────────────────────────────┐║
║  │  📊 CURRENT PLAN STATUS & OPTIMIZATION READINESS        ││
║  │  Plan v4 Active │ Last Optimized: 30-Jan 02:00 │ 118 🚌││
║  └──────────────────────────────────────────────────────────┘║
║                                                               ║
║  ┌─────────────────┬─────────────────┬─────────────────────┐ ║
║  │ CONFIGURE ENGINE│ RUN OPTIMIZATION│ REVIEW RESULTS     │ ║
║  └─────────────────┴─────────────────┴─────────────────────┘ ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  🎛️ OPTIMIZATION ENGINE CONFIGURATION                ║  ║
║  ╠════════════════════════════════════════════════════════╣  ║
║  ║  [Objective Selection]                                ║  ║
║  ║  [Constraints & Parameters]                           ║  ║
║  ║  [Advanced Options]                                   ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  ⚙ CALCULATION ENGINE RUNNING                         ║  ║
║  ║  [Real-time Progress Gauges]                          ║  ║
║  ║  [Algorithm Status Display]                           ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  📊 OPTIMIZATION RESULTS & COMPARISON                 ║  ║
║  ║  [Current vs Optimized Side-by-Side]                  ║  ║
║  ║  [Savings Calculator]                                 ║  ║
║  ║  [Deployment Options]                                 ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📊 SECTION 1: Current Plan Status & Readiness Check

### Purpose
Show current operational status and whether system is ready for optimization

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  📊 CURRENT PLAN STATUS & OPTIMIZATION READINESS              │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┬──────────────┬──────────────┬────────────┐ │
│  │ ACTIVE PLAN  │ FLEET STATUS │ DATA QUALITY │ ENGINE     │ │
│  ├──────────────┼──────────────┼──────────────┼────────────┤ │
│  │   PLAN v4    │  118 Buses   │  ✓ VALID     │ ⦿ READY   │ │
│  │   ACTIVE     │  106 Drivers │  ✓ COMPLETE  │            │ │
│  │  Since:      │  450 Trips   │  Updated:    │ Last Run:  │ │
│  │  30-Jan-2026 │  93% Util    │  28-Jan-2026 │ 30-Jan 02:00│
│  │              │              │              │ Duration:  │ │
│  │  [VIEW]      │  [DETAILS]   │  [VALIDATE]  │  2m 47s    │ │
│  └──────────────┴──────────────┴──────────────┴────────────┘ │
│                                                               │
│  ✓ OPTIMIZATION READINESS CHECK:                              │
│  ✓ All required data files present and validated             │
│  ✓ No active trips in progress (safe to optimize)            │
│  ✓ Database connection stable                                │
│  ✓ Calculation engine ready                                  │
│  ⚠️ Note: Optimization will take 2-4 minutes                 │
│                                                               │
│  QUICK INSIGHTS:                                              │
│  • Current plan uses 118 vehicles (9 idle)                   │
│  • Average driver duty time: 7.2 hours (target: 7.5h)        │
│  • Fuel consumption: 15.2 kmpl (industry avg: 14.8 kmpl)     │
│  • Potential for improvement: MODERATE                        │
│                                                               │
│  [RUN NEW OPTIMIZATION] [VIEW PAST RESULTS] [SCHEDULE AUTO]  │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     OPTIMIZATION READINESS DASHBOARD    */
/* ═══════════════════════════════════════ */

.optimization-readiness-dashboard {
  background: linear-gradient(135deg, #1B4965 0%, #0F2A3D 100%);
  border: 6px solid #B8860B;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 12px 36px rgba(0,0,0,0.6),
    inset 0 -4px 20px rgba(0,0,0,0.4);
}

.readiness-header {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 3px double rgba(212, 175, 55, 0.5);
  
  display: flex;
  align-items: center;
  gap: 12px;
  
  text-shadow: 
    0 0 16px rgba(212, 175, 55, 0.8),
    2px 2px 4px rgba(0,0,0,0.8);
}

/* Status Cards Grid */
.readiness-status-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

@media (max-width: 1400px) {
  .readiness-status-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.readiness-card {
  background: rgba(244, 241, 222, 0.08);
  border: 3px solid rgba(184, 134, 11, 0.4);
  border-radius: 8px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  transition: all 0.3s ease;
  
  position: relative;
  overflow: hidden;
}

.readiness-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-status, #2D6A4F);
}

.readiness-card:hover {
  background: rgba(244, 241, 222, 0.15);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
}

.readiness-card[data-status="ready"] { --card-status: #2D6A4F; }
.readiness-card[data-status="warning"] { --card-status: #CA6702; }
.readiness-card[data-status="error"] { --card-status: #9B2226; }

.readiness-card-title {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(244, 241, 222, 0.7);
}

.readiness-card-value {
  font-family: var(--font-numbers);
  font-size: 28px;
  font-weight: 700;
  color: #D4AF37;
  line-height: 1;
  
  text-shadow: 
    0 0 12px rgba(212, 175, 55, 0.6),
    2px 2px 4px rgba(0,0,0,0.6);
}

.readiness-card-status {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--status-color, #52B788);
  
  display: flex;
  align-items: center;
  gap: 6px;
}

.readiness-card[data-status="ready"] .readiness-card-status {
  --status-color: #52B788;
}

.readiness-card[data-status="warning"] .readiness-card-status {
  --status-color: #F2CC8F;
}

.readiness-card-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(244, 241, 222, 0.6);
  
  padding-top: 8px;
  border-top: 1px solid rgba(184, 134, 11, 0.2);
}

.readiness-card-action {
  margin-top: auto;
  
  background: rgba(184, 134, 11, 0.2);
  border: 2px solid rgba(184, 134, 11, 0.4);
  border-radius: 4px;
  padding: 6px 12px;
  
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #D4AF37;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.readiness-card-action:hover {
  background: rgba(212, 175, 55, 0.3);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-1px);
}

/* Readiness Checklist */
.readiness-checklist {
  background: rgba(45, 106, 79, 0.15);
  border: 3px solid rgba(45, 106, 79, 0.4);
  border-radius: 8px;
  padding: 20px 24px;
  margin: 20px 0;
}

.checklist-title {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #52B788;
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.checklist-title::before {
  content: '✓';
  font-size: 20px;
  color: #52B788;
}

.checklist-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(244, 241, 222, 0.9);
}

.checklist-item::before {
  content: '✓';
  font-size: 16px;
  color: #52B788;
  flex-shrink: 0;
}

.checklist-item[data-status="warning"] {
  color: #F2CC8F;
}

.checklist-item[data-status="warning"]::before {
  content: '⚠️';
}

/* Quick Insights Panel */
.quick-insights-panel {
  background: rgba(27, 73, 101, 0.15);
  border: 3px solid rgba(27, 73, 101, 0.4);
  border-radius: 8px;
  padding: 20px 24px;
  margin: 20px 0;
}

.insights-title {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8ECAE6;
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(244, 241, 222, 0.9);
  line-height: 1.6;
}

.insight-item::before {
  content: '•';
  font-size: 18px;
  color: #8ECAE6;
  flex-shrink: 0;
  line-height: 1.3;
}

/* Readiness Actions */
.readiness-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(184, 134, 11, 0.3);
}

.readiness-action-btn {
  flex: 1;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 14px 24px;
  
  font-family: var(--font-labels);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 10px rgba(0,0,0,0.5),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.readiness-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.6),
    0 0 24px rgba(212, 175, 55, 0.5);
}

.readiness-action-btn.primary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
  
  position: relative;
  overflow: hidden;
}

.readiness-action-btn.primary::before {
  content: '⚙';
  margin-right: 8px;
  font-size: 16px;
}

.readiness-action-btn.primary:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.6),
    0 0 24px rgba(82, 183, 136, 0.5);
}
```

---

## 🎛️ SECTION 2: Optimization Engine Configuration

### Purpose
Set optimization objectives, constraints, and parameters

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  🎛️ OPTIMIZATION ENGINE CONFIGURATION                        │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  OPTIMIZATION OBJECTIVE (Select Primary Goal)            ││
│  ├──────────────────────────────────────────────────────────┤│
│  │                                                          ││
│  │  ┌────────────────┐ ┌────────────────┐ ┌─────────────┐ ││
│  │  │ ● BALANCED     │ │ ○ MINIMIZE     │ │ ○ MAXIMIZE  │ ││
│  │  │   APPROACH     │ │   COST         │ │   COVERAGE  │ ││
│  │  ├────────────────┤ ├────────────────┤ ├─────────────┤ ││
│  │  │ • Min vehicles │ │ • Lowest fuel  │ │ • All trips │ ││
│  │  │ • Balanced hrs │ │ • Fewer buses  │ │ • Max backup│ ││
│  │  │ • Good coverage│ │ • Cost priority│ │ • Extra cap │ ││
│  │  │                │ │                │ │             │ ││
│  │  │ ✓ RECOMMENDED  │ │ Budget Focus   │ │ Peak Hours  │ ││
│  │  └────────────────┘ └────────────────┘ └─────────────┘ ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  CONSTRAINTS & PARAMETERS                                ││
│  ├──────────────────────────────────────────────────────────┤│
│  │                                                          ││
│  │  Driver Duty Constraints:                                ││
│  │  Max Hours per Shift:      [8.0] hours                  ││
│  │  Mandatory Break Duration: [30] minutes                  ││
│  │  Max Continuous Driving:   [4.0] hours                  ││
│  │  Allow Overtime:           ☐ Yes (max 1 hour)           ││
│  │                                                          ││
│  │  Vehicle Constraints:                                    ││
│  │  Force All Vehicles Used:  ☐ Yes                        ││
│  │  Allow Deadhead Moves:     ☑ Yes (empty repositioning)  ││
│  │  Max Deadhead Distance:    [25] km                      ││
│  │  Depot Return Mandatory:   ☑ Yes (end of day)           ││
│  │                                                          ││
│  │  Route Coverage:                                         ││
│  │  Must Cover All Routes:    ☑ Yes (450 trips)            ││
│  │  Allow Route Skipping:     ☐ Only if infeasible         ││
│  │  Peak Hour Priority:       ☑ Yes (6-9 AM, 5-8 PM)       ││
│  │                                                          ││
│  │  [RESET TO DEFAULTS] [LOAD SAVED PRESET]                ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  ADVANCED OPTIONS (Optional)                             ││
│  │  ⊞ Show Advanced Settings                                ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ESTIMATED RUN TIME: 2-4 minutes                              │
│  EXPECTED IMPROVEMENT: 5-12% (based on current data)          │
│                                                               │
│  [START OPTIMIZATION ENGINE] [SAVE CONFIGURATION] [CANCEL]   │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     ENGINE CONFIGURATION PANEL          */
/* ═══════════════════════════════════════ */

.engine-configuration-panel {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 36px rgba(0,0,0,0.4);
}

.config-section-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 3px double #8B6914;
  
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* Objective Selection */
.objective-selection-box {
  background: linear-gradient(
    135deg,
    rgba(62, 39, 35, 0.05) 0%,
    rgba(62, 39, 35, 0.1) 100%
  );
  border: 4px solid #704214;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 28px;
}

.objective-box-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 20px;
}

.objective-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1200px) {
  .objective-cards-grid {
    grid-template-columns: 1fr;
  }
}

.objective-card {
  background: rgba(255,255,255,0.6);
  border: 4px solid rgba(139, 105, 20, 0.3);
  border-radius: 8px;
  padding: 24px;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  position: relative;
  overflow: hidden;
}

.objective-card:hover {
  background: rgba(255,255,255,0.9);
  border-color: rgba(184, 134, 11, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.objective-card.selected {
  background: linear-gradient(
    135deg,
    rgba(45, 106, 79, 0.15) 0%,
    rgba(45, 106, 79, 0.25) 100%
  );
  border-color: #2D6A4F;
  border-width: 5px;
  padding: 23px; /* Compensate for border */
}

.objective-card.selected::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: #2D6A4F;
}

.objective-card.recommended::after {
  content: '✓ RECOMMENDED';
  position: absolute;
  top: 12px;
  right: 12px;
  
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  
  font-family: var(--font-labels);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.objective-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.objective-radio {
  width: 24px;
  height: 24px;
  border: 3px solid #704214;
  border-radius: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0;
  
  transition: all 0.2s ease;
}

.objective-card.selected .objective-radio {
  border-color: #2D6A4F;
  background: #2D6A4F;
}

.objective-card.selected .objective-radio::after {
  content: '';
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
}

.objective-card-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--government-seal);
  flex: 1;
}

.objective-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.objective-feature {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
  line-height: 1.5;
}

.objective-feature::before {
  content: '•';
  color: var(--brass-accent);
  font-weight: bold;
  flex-shrink: 0;
}

.objective-description {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  font-style: italic;
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid rgba(139, 105, 20, 0.2);
}

/* Constraints Panel */
.constraints-panel {
  background: rgba(27, 73, 101, 0.08);
  border: 4px solid rgba(27, 73, 101, 0.3);
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 28px;
}

.constraints-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--railway-blue);
  margin-bottom: 24px;
}

.constraint-group {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid rgba(27, 73, 101, 0.2);
}

.constraint-group:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.constraint-group-title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 16px;
}

.constraint-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.constraint-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.constraint-label {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  flex: 1;
}

.constraint-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.constraint-input input[type="number"] {
  width: 80px;
  background: rgba(255,255,255,0.8);
  border: 3px solid #8B6914;
  border-radius: 4px;
  padding: 8px 12px;
  
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: var(--railway-blue);
  text-align: center;
  
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.constraint-input input[type="number"]:focus {
  outline: none;
  border-color: var(--brass-accent);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.1),
    0 0 12px rgba(184, 134, 11, 0.4);
}

.constraint-unit {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--sepia-tone);
  min-width: 60px;
}

.constraint-input input[type="checkbox"] {
  width: 22px;
  height: 22px;
  accent-color: var(--brass-accent);
  cursor: pointer;
}

.constraint-input label {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
  cursor: pointer;
}

.constraint-note {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--steel-brushed);
  font-style: italic;
  margin-left: 8px;
}

/* Constraint Actions */
.constraint-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(27, 73, 101, 0.2);
}

.constraint-action-btn {
  background: rgba(184, 134, 11, 0.2);
  border: 2px solid rgba(184, 134, 11, 0.4);
  border-radius: 4px;
  padding: 8px 16px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.constraint-action-btn:hover {
  background: rgba(212, 175, 55, 0.3);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-1px);
}

/* Advanced Options Accordion */
.advanced-options-accordion {
  background: rgba(139, 105, 20, 0.05);
  border: 3px solid rgba(139, 105, 20, 0.2);
  border-radius: 8px;
  margin-bottom: 28px;
  overflow: hidden;
}

.accordion-header {
  background: linear-gradient(135deg, #704214 0%, #5A3410 100%);
  padding: 14px 20px;
  
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--parchment-white);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.accordion-header:hover {
  background: linear-gradient(135deg, #8B6914 0%, #704214 100%);
}

.accordion-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.accordion-header[data-expanded="true"] .accordion-icon {
  transform: rotate(90deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.accordion-header[data-expanded="true"] + .accordion-content {
  max-height: 600px;
}

.accordion-inner {
  padding: 24px;
}

/* Estimation Display */
.estimation-display {
  background: rgba(202, 103, 2, 0.1);
  border: 3px solid rgba(202, 103, 2, 0.3);
  border-left-width: 6px;
  border-radius: 6px;
  padding: 16px 20px;
  margin: 24px 0;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.estimation-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.estimation-label {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
}

.estimation-value {
  font-family: var(--font-numbers);
  font-size: 20px;
  font-weight: 700;
  color: var(--brass-accent);
}

/* Configuration Actions */
.config-main-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  padding-top: 28px;
  border-top: 3px solid rgba(139, 105, 20, 0.3);
}

.config-action-btn {
  flex: 1;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 16px 28px;
  
  font-family: var(--font-labels);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.config-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.5),
    0 0 24px rgba(212, 175, 55, 0.5);
}

.config-action-btn.primary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
  
  position: relative;
}

.config-action-btn.primary::before {
  content: '⚙';
  margin-right: 10px;
  font-size: 18px;
  animation: spin-gear 4s linear infinite;
}

@keyframes spin-gear {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.config-action-btn.primary:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.5),
    0 0 24px rgba(82, 183, 136, 0.5);
}

.config-action-btn.secondary {
  background: rgba(255,255,255,0.4);
  border-color: rgba(112, 66, 20, 0.5);
  color: var(--ink-black);
}

.config-action-btn.secondary:hover {
  background: rgba(255,255,255,0.6);
}
```

---

## ⚙ SECTION 3: Optimization Engine Running (Progress Display)

### Purpose
Real-time progress display while optimization is calculating

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  ⚙ CALCULATION ENGINE RUNNING                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  ENGINE STATUS: PROCESSING TIME-SPACE NETWORK             ││
│  │  Progress: ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 67%                      ││
│  │                                                          ││
│  │  Elapsed: 00:01:47  │  Remaining: 00:00:52  │  Total: ~2m││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌────────────────┬────────────────┬────────────────────────┐│
│  │ STAGE 1        │ STAGE 2        │ STAGE 3                ││
│  │ ✓ DATA LOAD    │ ⚙ TSN BUILD   │ ○ OPTIMIZATION         ││
│  │ Complete       │ In Progress    │ Pending                ││
│  │ 00:00:15       │ 00:01:32...    │ Est. 00:01:00          ││
│  └────────────────┴────────────────┴────────────────────────┘│
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  CURRENT OPERATION:                                      ││
│  │  Building time-space network graph...                    ││
│  │                                                          ││
│  │  Nodes Created:    4,823 / ~5,000                       ││
│  │  Edges Generated:  18,945 / ~20,000                     ││
│  │  Trip Coverage:    100% (450/450 trips)                 ││
│  │                                                          ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   ││
│  │  │  ╱───╲  │  │  ╱───╲  │  │  ╱───╲  │  │  ╱───╲  │   ││
│  │  │ │ 96% │ │  │ │ 94% │ │  │ │100% │ │  │ │ 75% │ │   ││
│  │  │  ╲───╱  │  │  ╲───╱  │  │  ╲───╱  │  │  ╲───╱  │   ││
│  │  │  NODES  │  │  EDGES  │  │  TRIPS  │  │ SOLVER  │   ││
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ⚠️ DO NOT CLOSE WINDOW - Optimization in progress           │
│                                                               │
│  [VIEW DETAILED LOG] [CANCEL OPTIMIZATION]                   │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     OPTIMIZATION ENGINE RUNNING         */
/* ═══════════════════════════════════════ */

.optimization-running-panel {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  border: 6px solid #B8860B;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 12px 36px rgba(0,0,0,0.6),
    inset 0 -4px 20px rgba(0,0,0,0.4);
  
  animation: panel-glow 3s ease-in-out infinite;
}

@keyframes panel-glow {
  0%, 100% {
    box-shadow: 
      0 0 0 2px #704214,
      0 12px 36px rgba(0,0,0,0.6),
      inset 0 -4px 20px rgba(0,0,0,0.4);
  }
  50% {
    box-shadow: 
      0 0 0 2px #B8860B,
      0 12px 36px rgba(0,0,0,0.6),
      0 0 24px rgba(184, 134, 11, 0.3),
      inset 0 -4px 20px rgba(0,0,0,0.4);
  }
}

.running-panel-header {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 24px;
  
  display: flex;
  align-items: center;
  gap: 12px;
  
  text-shadow: 
    0 0 16px rgba(212, 175, 55, 0.8),
    2px 2px 4px rgba(0,0,0,0.8);
}

.running-panel-header::before {
  content: '⚙';
  font-size: 24px;
  animation: spin-gear 3s linear infinite;
}

/* Progress Box */
.progress-status-box {
  background: rgba(244, 241, 222, 0.08);
  border: 3px solid rgba(184, 134, 11, 0.4);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.progress-status-text {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 16px;
}

.progress-bar-container {
  width: 100%;
  height: 48px;
  background: rgba(139, 105, 20, 0.2);
  border: 4px solid #704214;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
  
  box-shadow: inset 0 4px 12px rgba(0,0,0,0.4);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #B8860B 0%,
    #D4AF37 25%,
    #B8860B 50%,
    #D4AF37 75%,
    #B8860B 100%
  );
  width: var(--progress-percent, 0%);
  
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  box-shadow: 
    0 0 20px rgba(212, 175, 55, 0.6),
    inset 0 2px 4px rgba(255,255,255,0.3);
  
  /* Animated shimmer */
  background-size: 200% 100%;
  animation: shimmer-progress 3s linear infinite;
  
  position: relative;
}

@keyframes shimmer-progress {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.4) 0%,
    transparent 100%
  );
}

.progress-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  font-family: var(--font-numbers);
  font-size: 22px;
  font-weight: 700;
  color: #1A1A1A;
  text-shadow: 
    1px 1px 0 rgba(255,255,255,0.6),
    0 0 8px rgba(255,255,255,0.4);
  
  z-index: 2;
}

.progress-time-stats {
  display: flex;
  justify-content: space-between;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(244, 241, 222, 0.8);
}

.time-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-stat-label {
  font-size: 10px;
  color: rgba(244, 241, 222, 0.6);
}

.time-stat-value {
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: #D4AF37;
}

/* Stage Progress */
.stage-progress-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stage-card {
  background: rgba(244, 241, 222, 0.08);
  border: 3px solid rgba(184, 134, 11, 0.3);
  border-radius: 8px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  transition: all 0.3s ease;
}

.stage-card[data-status="complete"] {
  border-color: #2D6A4F;
  background: rgba(45, 106, 79, 0.1);
}

.stage-card[data-status="active"] {
  border-color: #B8860B;
  background: rgba(184, 134, 11, 0.15);
  animation: stage-pulse 2s ease-in-out infinite;
}

@keyframes stage-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.stage-card[data-status="pending"] {
  opacity: 0.5;
}

.stage-icon {
  font-size: 32px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
}

.stage-card[data-status="complete"] .stage-icon {
  color: #52B788;
}

.stage-card[data-status="active"] .stage-icon {
  color: #D4AF37;
  animation: spin-gear 3s linear infinite;
}

.stage-title {
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment-white);
}

.stage-status {
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(244, 241, 222, 0.7);
}

.stage-time {
  font-family: var(--font-numbers);
  font-size: 12px;
  color: #D4AF37;
}

/* Current Operation Box */
.current-operation-box {
  background: rgba(27, 73, 101, 0.15);
  border: 3px solid rgba(27, 73, 101, 0.4);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.operation-title {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8ECAE6;
  margin-bottom: 16px;
}

.operation-description {
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(244, 241, 222, 0.9);
  margin-bottom: 20px;
}

.operation-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.operation-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(244, 241, 222, 0.8);
}

.operation-stat-value {
  font-family: var(--font-numbers);
  font-weight: 700;
  color: #D4AF37;
}

/* Mini Gauges Grid */
.mini-gauges-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.mini-gauge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mini-gauge-dial {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: 
    radial-gradient(
      circle at 35% 35%,
      #1B4965 0%,
      #0F2A3D 100%
    );
  border: 3px solid #704214;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: relative;
  
  box-shadow: 
    0 0 0 2px #B8860B,
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 0 15px rgba(0,0,0,0.5);
}

.mini-gauge-value {
  font-family: var(--font-numbers);
  font-size: 20px;
  font-weight: 700;
  color: #D4AF37;
  
  text-shadow: 
    0 0 8px rgba(212, 175, 55, 0.6),
    1px 1px 2px rgba(0,0,0,0.6);
}

.mini-gauge-label {
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(244, 241, 222, 0.7);
  text-align: center;
}

/* Warning Notice */
.running-warning {
  background: rgba(202, 103, 2, 0.15);
  border-left: 5px solid var(--signal-amber);
  border-radius: 6px;
  padding: 14px 18px;
  margin: 24px 0;
  
  display: flex;
  align-items: center;
  gap: 12px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: #F2CC8F;
}

.running-warning::before {
  content: '⚠️';
  font-size: 20px;
  flex-shrink: 0;
}

/* Running Actions */
.running-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(184, 134, 11, 0.3);
}

.running-action-btn {
  flex: 1;
  
  background: rgba(184, 134, 11, 0.2);
  border: 3px solid rgba(184, 134, 11, 0.4);
  border-radius: 6px;
  padding: 12px 20px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #D4AF37;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
}

.running-action-btn:hover {
  background: rgba(212, 175, 55, 0.3);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-2px);
}

.running-action-btn.cancel {
  background: rgba(155, 34, 38, 0.2);
  border-color: rgba(155, 34, 38, 0.4);
  color: #F4A3A8;
}

.running-action-btn.cancel:hover {
  background: rgba(155, 34, 38, 0.3);
  border-color: rgba(155, 34, 38, 0.6);
}
```

---

## 📊 SECTION 4: Optimization Results & Comparison

### Purpose
Show side-by-side comparison of current vs optimized plan with detailed metrics

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  📊 OPTIMIZATION RESULTS & COMPARISON                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ✓ OPTIMIZATION COMPLETE - New Plan v5 Generated             │
│  Duration: 02:47 │ Status: SUCCESS │ Generated: 13-Feb 14:35 │
│                                                               │
│  ┌──────────────────────┬─────────┬──────────────────────────┐│
│  │   CURRENT (v4)       │    →    │   OPTIMIZED (v5)         ││
│  ├──────────────────────┼─────────┼──────────────────────────┤│
│  │                      │         │                          ││
│  │  🚌 118 Vehicles     │    →    │  🚌 115 Vehicles         ││
│  │     of 127 available │         │     of 127 available     ││
│  │     ════════════     │  SAVE   │     ════════════         ││
│  │                      │   3 🚌  │                          ││
│  ├──────────────────────┼─────────┼──────────────────────────┤│
│  │                      │         │                          ││
│  │  👤 108 Drivers      │    →    │  👤 106 Drivers          ││
│  │     of 145 available │         │     of 145 available     ││
│  │     ════════════     │  SAVE   │     ════════════         ││
│  │                      │   2 👤  │                          ││
│  ├──────────────────────┼─────────┼──────────────────────────┤│
│  │                      │         │                          ││
│  │  ₹18,200/day        │    →    │  ₹15,800/day            ││
│  │  Fuel Cost           │         │  Fuel Cost               ││
│  │     ════════════     │  SAVE   │     ════════════         ││
│  │                      │ ₹2,400  │                          ││
│  ├──────────────────────┼─────────┼──────────────────────────┤│
│  │                      │         │                          ││
│  │  580 kg CO₂/day     │    →    │  435 kg CO₂/day         ││
│  │  Emissions           │         │  Emissions               ││
│  │     ════════════     │ REDUCE  │     ════════════         ││
│  │                      │ 145 kg  │                          ││
│  ├──────────────────────┼─────────┼──────────────────────────┤│
│  │                      │         │                          ││
│  │  Avg: 7.2 hrs/driver│    →    │  Avg: 7.4 hrs/driver    ││
│  │  Duty Hours          │         │  Duty Hours              ││
│  │     ════════════     │ BALANCE │     ════════════         ││
│  │  (Some <6h, some 8h)│   +3%   │  (More balanced)         ││
│  └──────────────────────┴─────────┴──────────────────────────┘│
│                                                               │
│  💰 MONTHLY SAVINGS ESTIMATE: ₹72,000 (~₹2,400 × 30 days)   │
│  🌱 ANNUAL CO₂ REDUCTION: ~53 tonnes                         │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  DETAILED BREAKDOWN                                      ││
│  │  ▼ Vehicle Assignments (115 buses) [EXPAND]             ││
│  │  ▼ Driver Schedules (106 drivers) [EXPAND]              ││
│  │  ▼ Route Coverage Analysis [EXPAND]                     ││
│  │  ▼ Constraint Satisfaction Report [EXPAND]              ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  [💾 SAVE PLAN AS DRAFT] [📊 EXPORT COMPARISON] [✓ ACTIVATE]│
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     OPTIMIZATION RESULTS PANEL          */
/* ═══════════════════════════════════════ */

.optimization-results-panel {
  background: var(--aged-cream);
  border: 6px solid #2D6A4F;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #52B788,
    0 12px 36px rgba(0,0,0,0.4),
    0 0 30px rgba(82, 183, 136, 0.2);
}

.results-header {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  border: 4px solid #52B788;
  border-radius: 8px;
  padding: 20px 28px;
  margin-bottom: 28px;
  
  box-shadow: 
    0 6px 16px rgba(0,0,0,0.3),
    inset 0 0 20px rgba(0,0,0,0.2);
}

.results-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: white;
  margin-bottom: 12px;
  
  display: flex;
  align-items: center;
  gap: 10px;
  
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
}

.results-title::before {
  content: '✓';
  font-size: 24px;
  color: #52B788;
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(82, 183, 136, 0.6);
}

.results-meta {
  display: flex;
  gap: 24px;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(255,255,255,0.9);
}

.results-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-separator {
  color: rgba(255,255,255,0.4);
}

/* Comparison Grid */
.comparison-grid-container {
  background: rgba(62, 39, 35, 0.05);
  border: 4px solid #704214;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  
  font-family: var(--font-body);
}

.comparison-header {
  background: linear-gradient(135deg, #704214 0%, #5A3410 100%);
  padding: 16px 24px;
  
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--parchment-white);
  text-align: center;
  
  border-bottom: 2px solid #8B6914;
}

.comparison-divider {
  background: #8B6914;
  width: 80px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 20px;
  color: #D4AF37;
}

.comparison-row {
  display: contents;
}

.comparison-cell {
  padding: 24px;
  background: rgba(255,255,255,0.5);
  border-bottom: 2px solid rgba(139, 105, 20, 0.2);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.comparison-row:last-child .comparison-cell {
  border-bottom: none;
}

.comparison-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.comparison-value {
  font-family: var(--font-numbers);
  font-size: 28px;
  font-weight: 700;
  color: var(--railway-blue);
  line-height: 1;
  
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.comparison-label {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  text-align: center;
}

.comparison-bar {
  width: 100%;
  height: 8px;
  background: rgba(139, 105, 20, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.comparison-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1B4965 0%, #2A6F97 100%);
  width: var(--fill-percent, 0%);
  border-radius: 4px;
}

.comparison-note {
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--steel-brushed);
  font-style: italic;
  text-align: center;
}

/* Improvement Indicator */
.improvement-indicator {
  background: var(--improvement-bg, rgba(45, 106, 79, 0.2));
  border: 3px solid var(--improvement-border, #2D6A4F);
  border-radius: 8px;
  padding: 16px 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.improvement-indicator[data-type="save"] {
  --improvement-bg: rgba(45, 106, 79, 0.2);
  --improvement-border: #2D6A4F;
}

.improvement-indicator[data-type="reduce"] {
  --improvement-bg: rgba(27, 73, 101, 0.2);
  --improvement-border: #1B4965;
}

.improvement-indicator[data-type="balance"] {
  --improvement-bg: rgba(184, 134, 11, 0.2);
  --improvement-border: #B8860B;
}

.improvement-label {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--improvement-border);
}

.improvement-value {
  font-family: var(--font-numbers);
  font-size: 22px;
  font-weight: 700;
  color: var(--improvement-border);
}

/* Savings Summary */
.savings-summary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  border: 4px solid #52B788;
  border-radius: 8px;
  padding: 20px 28px;
  margin: 28px 0;
  
  display: flex;
  justify-content: space-around;
  gap: 24px;
  
  box-shadow: 
    0 6px 16px rgba(0,0,0,0.3),
    inset 0 0 20px rgba(0,0,0,0.2);
}

.savings-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.savings-icon {
  font-size: 28px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
}

.savings-label {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.8);
}

.savings-value {
  font-family: var(--font-numbers);
  font-size: 24px;
  font-weight: 700;
  color: white;
  
  text-shadow: 
    0 0 12px rgba(82, 183, 136, 0.6),
    2px 2px 4px rgba(0,0,0,0.6);
}

/* Detailed Breakdown Accordion */
.breakdown-accordion {
  background: rgba(139, 105, 20, 0.05);
  border: 3px solid rgba(139, 105, 20, 0.3);
  border-radius: 8px;
  margin: 24px 0;
}

.breakdown-accordion-item {
  border-bottom: 2px solid rgba(139, 105, 20, 0.2);
}

.breakdown-accordion-item:last-child {
  border-bottom: none;
}

.breakdown-accordion-header {
  background: rgba(112, 66, 20, 0.1);
  padding: 16px 20px;
  
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brass-accent);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.breakdown-accordion-header:hover {
  background: rgba(112, 66, 20, 0.2);
}

.breakdown-expand-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.breakdown-accordion-header[data-expanded="true"] .breakdown-expand-icon {
  transform: rotate(180deg);
}

.breakdown-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.breakdown-accordion-header[data-expanded="true"] + .breakdown-accordion-content {
  max-height: 800px;
}

.breakdown-accordion-inner {
  padding: 20px 24px;
}

/* Results Actions */
.results-main-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  padding-top: 28px;
  border-top: 3px solid rgba(139, 105, 20, 0.3);
}

.results-action-btn {
  flex: 1;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 16px 28px;
  
  font-family: var(--font-labels);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 1px 2px rgba(255,255,255,0.3);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.results-action-btn::before {
  font-size: 18px;
}

.results-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.5),
    0 0 24px rgba(212, 175, 55, 0.5);
}

.results-action-btn.save::before {
  content: '💾';
}

.results-action-btn.export::before {
  content: '📊';
}

.results-action-btn.activate {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
}

.results-action-btn.activate::before {
  content: '✓';
  background: white;
  color: #2D6A4F;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 900;
}

.results-action-btn.activate:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.5),
    0 0 24px rgba(82, 183, 136, 0.5);
}
```

---

## 📋 Complete HTML Structure Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PMPML Optimization Engine Control</title>
  <link rel="stylesheet" href="styles/optimization.css">
</head>
<body>

  <!-- Status Telegraph Bar -->
  <div class="status-telegraph">
    <!-- Telegraph content -->
  </div>
  
  <!-- Return to Hub Button -->
  <button class="return-hub-btn">
    RETURN TO HUB
  </button>
  
  <!-- Main Page Container -->
  <div class="page-container">
    
    <!-- Page Header -->
    <div class="page-header">
      <div class="breadcrumb">
        <span class="breadcrumb-item">Hub</span>
        <span class="breadcrumb-separator">→</span>
        <span class="breadcrumb-item active">Optimization Engine</span>
      </div>
      
      <h1 class="page-title">
        <span class="page-icon">⚙</span>
        OPTIMIZATION ENGINE CONTROL CENTER
      </h1>
      
      <div class="page-subtitle">
        Fleet resource allocation & route assignment calculator
      </div>
    </div>
    
    <!-- Readiness Dashboard -->
    <div class="optimization-readiness-dashboard">
      <!-- Readiness content -->
    </div>
    
    <!-- Configuration Panel -->
    <div class="engine-configuration-panel">
      <!-- Configuration content -->
    </div>
    
    <!-- Running Panel (shown when optimizing) -->
    <div class="optimization-running-panel" style="display: none;">
      <!-- Progress content -->
    </div>
    
    <!-- Results Panel (shown when complete) -->
    <div class="optimization-results-panel" style="display: none;">
      <!-- Results content -->
    </div>
    
  </div>
  
  <script src="scripts/optimization.js"></script>
</body>
</html>
```

---

**TransitPulse Optimization Engine Page v1.0**  
*Realistic Calculation Chamber with Live Progress*  
*Designed for actual PMPML optimization workflows*  
*Heritage Interface. Modern Algorithms. Professional Results.*
