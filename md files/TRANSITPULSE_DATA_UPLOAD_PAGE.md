# TransitPulse — PMPML Data Registry Management
## Realistic Data Upload & Validation System Design Specification
### Heritage Vintage Interface for Fleet Data Management

---

## 🎯 Real-World PMPML Data Management Context

### What PMPML Officers Actually Deal With:

**Monthly Data Updates:**
- New vehicle registrations (buses purchased/leased)
- Driver roster changes (new hires, retirements, transfers)
- Route modifications (new routes, route extensions, stop additions)
- Timetable adjustments (seasonal changes, festival schedules)
- Depot capacity updates (expansions, maintenance closures)

**Common Data Issues:**
- Excel files with inconsistent formatting
- Duplicate entries from multiple departments
- Missing vehicle registration numbers
- Driver license expiry tracking
- Route changes not synced across departments
- Historical data archiving needs

**Real Pain Points:**
- **Multiple file versions** floating around (routes_v2_final_FINAL.csv)
- **Data validation errors** discovered too late
- **No audit trail** of who uploaded what when
- **Bulk edits** needed (e.g., depot reassignments)
- **Import conflicts** with existing data
- **No rollback** if wrong file uploaded

---

## 📊 DATA UPLOAD PAGE LAYOUT: "The Registry Archive Chamber"

### Visual Philosophy

The page is designed as a **Vintage Document Archive & Telegraph Registry** — where data files are treated like official government ledgers being catalogued, verified, and filed in brass-bound archives with meticulous record-keeping.

### Master Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║                    STATUS TELEGRAPH BAR                       ║
║  ⦿ SYSTEM OPERATIONAL │ 14:32:45 │ PLAN v4 ACTIVE │ R.SHARMA ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  📋 DATA REGISTRY MANAGEMENT CENTER                     │ ║
║  │  Archive & Validate Official Fleet Records              │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌──────────────────────────────────────────────────────────┐║
║  │  🏛️ CURRENT REGISTRY STATUS & DATA HEALTH              ││
║  │  Last Update: 28-Jan-2026 09:15 │ Records: 851 entries ││
║  │  [🟢 All Systems Valid] [📊 View Registry] [📜 History]││
║  └──────────────────────────────────────────────────────────┘║
║                                                               ║
║  ┌─────────────────┬─────────────────┬─────────────────────┐ ║
║  │ UPLOAD NEW DATA │ VALIDATE & FIX  │ REGISTRY HISTORY   │ ║
║  └─────────────────┴─────────────────┴─────────────────────┘ ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  📂 FLEET RECORDS ARCHIVE                             ║  ║
║  ╠════════════════════════════════════════════════════════╣  ║
║  ║                                                        ║  ║
║  ║  [File Upload Cards with Drag-and-Drop]               ║  ║
║  ║  [Real-time Validation Preview]                       ║  ║
║  ║  [Smart Conflict Resolution]                          ║  ║
║  ║                                                        ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  🔍 DATA QUALITY ASSURANCE & VALIDATION               ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
║                                                               ║
║  ╔════════════════════════════════════════════════════════╗  ║
║  ║  📊 PREVIEW & COMPARISON VIEWER                       ║  ║
║  ╚════════════════════════════════════════════════════════╝  ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📊 SECTION 1: Current Registry Status Dashboard

### Purpose
Show health of current data before any new uploads

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  🏛️ CURRENT REGISTRY STATUS & DATA HEALTH                    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┬──────────────┬──────────────┬────────────┐ │
│  │   ROUTES     │   VEHICLES   │   DRIVERS    │   DEPOTS   │ │
│  ├──────────────┼──────────────┼──────────────┼────────────┤ │
│  │     125      │     127      │     145      │      4     │ │
│  │   entries    │   entries    │   entries    │  entries   │ │
│  │  ✓ Valid     │  ✓ Valid     │  ⚠️ 3 expiry│  ✓ Valid   │ │
│  │  Updated:    │  Updated:    │  Updated:    │  Updated:  │ │
│  │  28-Jan-2026 │  28-Jan-2026 │  15-Jan-2026 │  01-Jan-26 │ │
│  └──────────────┴──────────────┴──────────────┴────────────┘ │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  TIMETABLE REGISTRY                                      ││
│  │  450 scheduled trips │ 98% coverage │ Last: 28-Jan-2026  ││
│  │  ✓ All routes covered │ ✓ No conflicts │ ✓ Optimized   ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
│  ⚠️ ATTENTION REQUIRED:                                       │
│  • 3 driver licenses expiring within 30 days                 │
│  • Route 401 timetable needs seasonal update                 │
│  • Vehicle MH-12-6789 registration renewal due 15-Feb        │
│                                                               │
│  [VIEW COMPLETE REGISTRY] [DOWNLOAD CURRENT DATA] [REPORTS]  │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     REGISTRY STATUS DASHBOARD           */
/* ═══════════════════════════════════════ */

.registry-status-dashboard {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  border: 6px solid #B8860B;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 12px 36px rgba(0,0,0,0.6),
    inset 0 -4px 16px rgba(0,0,0,0.4);
}

.registry-status-header {
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
    0 0 12px rgba(212, 175, 55, 0.6),
    2px 2px 4px rgba(0,0,0,0.6);
}

.registry-status-icon {
  font-size: 28px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
}

/* Data Type Cards Grid */
.data-type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1400px) {
  .data-type-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.data-type-card {
  background: rgba(244, 241, 222, 0.08);
  border: 3px solid rgba(184, 134, 11, 0.4);
  border-radius: 8px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  transition: all 0.3s ease;
  
  position: relative;
  overflow: hidden;
}

.data-type-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--card-status-color, #2D6A4F);
}

.data-type-card:hover {
  background: rgba(244, 241, 222, 0.15);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.data-type-card[data-status="valid"] {
  --card-status-color: #2D6A4F;
}

.data-type-card[data-status="warning"] {
  --card-status-color: #CA6702;
}

.data-type-card[data-status="error"] {
  --card-status-color: #9B2226;
}

.data-type-label {
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-align: center;
}

.data-type-count {
  font-family: var(--font-numbers);
  font-size: 42px;
  font-weight: 700;
  color: #D4AF37;
  line-height: 1;
  
  text-shadow: 
    0 0 16px rgba(212, 175, 55, 0.8),
    2px 2px 6px rgba(0,0,0,0.8);
}

.data-type-unit {
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(244, 241, 222, 0.7);
  text-align: center;
}

.data-type-status {
  display: flex;
  align-items: center;
  gap: 6px;
  
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  color: var(--status-text-color, #52B788);
  
  padding: 6px 12px;
  background: rgba(0,0,0,0.3);
  border-radius: 12px;
}

.data-type-card[data-status="valid"] .data-type-status {
  --status-text-color: #52B788;
}

.data-type-card[data-status="warning"] .data-type-status {
  --status-text-color: #F2CC8F;
}

.data-type-card[data-status="error"] .data-type-status {
  --status-text-color: #F4A3A8;
}

.data-type-updated {
  font-family: var(--font-body);
  font-size: 10px;
  color: rgba(244, 241, 222, 0.5);
  text-align: center;
}

/* Timetable Summary Card */
.timetable-summary-card {
  background: rgba(27, 73, 101, 0.15);
  border: 3px solid rgba(27, 73, 101, 0.5);
  border-radius: 8px;
  padding: 18px 24px;
  margin-bottom: 20px;
  
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}

.timetable-icon {
  font-size: 48px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
}

.timetable-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timetable-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
}

.timetable-stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(244, 241, 222, 0.9);
}

.timetable-stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.timetable-stat-value {
  font-weight: 700;
  color: #D4AF37;
}

/* Attention Required Section */
.attention-required {
  background: rgba(202, 103, 2, 0.15);
  border-left: 5px solid var(--signal-amber);
  border-radius: 6px;
  padding: 16px 20px;
  margin: 20px 0;
}

.attention-title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F2CC8F;
  margin-bottom: 12px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.attention-title::before {
  content: '⚠️';
  font-size: 18px;
  animation: pulse-warning 2s ease-in-out infinite;
}

@keyframes pulse-warning {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.15); }
}

.attention-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attention-item {
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(244, 241, 222, 0.95);
  padding-left: 24px;
  position: relative;
}

.attention-item::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: #F2CC8F;
  font-weight: bold;
  font-size: 16px;
}

/* Registry Actions */
.registry-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(184, 134, 11, 0.3);
}

.registry-action-btn {
  flex: 1;
  min-width: 200px;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 12px 24px;
  
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
    0 4px 10px rgba(0,0,0,0.5),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.registry-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.6),
    0 0 20px rgba(212, 175, 55, 0.4);
}
```

---

## 📂 SECTION 2: File Upload Archive (Enhanced)

### Purpose
Drag-and-drop upload with smart validation and conflict resolution

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  📂 FLEET RECORDS ARCHIVE - UPLOAD NEW REGISTRY FILES         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  FILE 1: ROUTE REGISTRY (routes.csv)                   │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │                                                        │  │
│  │  ╔════════════════════════════════════════════════╗   │  │
│  │  ║                                                ║   │  │
│  │  ║     📄 DRAG & DROP FILE HERE                  ║   │  │
│  │  ║        or click to browse                      ║   │  │
│  │  ║                                                ║   │  │
│  │  ║  Accepted: .csv, .xlsx (max 5MB)              ║   │  │
│  │  ║  Template: [Download Sample Routes.csv]       ║   │  │
│  │  ║                                                ║   │  │
│  │  ╚════════════════════════════════════════════════╝   │  │
│  │                                                        │  │
│  │  Current Registry: 125 routes (Updated: 28-Jan-2026)  │  │
│  │                                                        │  │
│  │  [PREVIEW CURRENT] [DOWNLOAD TEMPLATE]                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  FILE 2: VEHICLE REGISTRY (vehicles.csv)              │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  ✓ vehicles_updated_feb2026.xlsx                      │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  📊 INSTANT VALIDATION PREVIEW                   │ │  │
│  │  ├──────────────────────────────────────────────────┤ │  │
│  │  │  ✓ 130 rows detected                             │ │  │
│  │  │  ✓ All required columns present                  │ │  │
│  │  │  ⚠️ 3 new vehicles detected (vs current 127)    │ │  │
│  │  │  ⚠️ 2 registration numbers need formatting       │ │  │
│  │  │  ✓ No duplicates found                           │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  [FIX ISSUES AUTOMATICALLY] [VIEW DETAILED REPORT]    │  │
│  │  [REPLACE CURRENT ▼] [MERGE WITH CURRENT ▼]          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  FILE 3: DRIVER REGISTRY (drivers.csv)                │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  ✓ driver_roster_february.csv                         │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │  🔍 SMART CONFLICT DETECTION                     │ │  │
│  │  ├──────────────────────────────────────────────────┤ │  │
│  │  │  ⚠️ CONFLICTS DETECTED WITH CURRENT DATA:       │ │  │
│  │  │                                                  │ │  │
│  │  │  Driver D-0234: R. Sharma                        │ │  │
│  │  │  ├─ Current: Depot 1 (Swargate)                 │ │  │
│  │  │  ├─ New File: Depot 2 (Nigdi)                   │ │  │
│  │  │  └─ Action: ● Keep New  ○ Keep Current          │ │  │
│  │  │                                                  │ │  │
│  │  │  Driver D-0567: A. Patil                         │ │  │
│  │  │  ├─ Current: Active                              │ │  │
│  │  │  ├─ New File: Retired (31-Jan-2026)             │ │  │
│  │  │  └─ Action: ● Keep New  ○ Keep Current          │ │  │
│  │  │                                                  │ │  │
│  │  │  +3 more conflicts [SHOW ALL]                    │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  [RESOLVE ALL CONFLICTS] [ACCEPT ALL NEW]             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  [Similar cards for Depots and Timetable...]                 │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  📋 UPLOAD SUMMARY & VALIDATION RESULTS                  ││
│  │                                                          ││
│  │  Files Ready: 3 of 5                                     ││
│  │  Total New Records: 408 entries                          ││
│  │  Conflicts to Resolve: 5 items                           ││
│  │  Validation Warnings: 2 items                            ││
│  │  Validation Errors: 0 items                              ││
│  │                                                          ││
│  │  [UPLOAD ALL TO REGISTRY] [SAVE AS DRAFT] [CANCEL]      ││
│  └──────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     ENHANCED FILE UPLOAD ARCHIVE        */
/* ═══════════════════════════════════════ */

.file-upload-archive {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 36px rgba(0,0,0,0.4);
}

.archive-section-title {
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
}

/* Upload Card */
.upload-file-card {
  background: linear-gradient(
    135deg,
    rgba(62, 39, 35, 0.03) 0%,
    rgba(62, 39, 35, 0.08) 100%
  );
  border: 4px solid #704214;
  border-radius: 10px;
  padding: 0;
  margin-bottom: 24px;
  overflow: hidden;
  
  transition: all 0.3s ease;
  
  box-shadow: 
    0 6px 16px rgba(0,0,0,0.25),
    inset 0 0 0 1px rgba(184, 134, 11, 0.2);
}

.upload-file-card:hover {
  border-color: #B8860B;
  transform: translateY(-3px);
  box-shadow: 
    0 10px 24px rgba(0,0,0,0.35),
    0 0 20px rgba(184, 134, 11, 0.2);
}

.upload-file-card[data-state="uploaded"] {
  border-color: #2D6A4F;
  background: linear-gradient(
    135deg,
    rgba(45, 106, 79, 0.05) 0%,
    rgba(45, 106, 79, 0.1) 100%
  );
}

.upload-file-card[data-state="error"] {
  border-color: #9B2226;
  background: linear-gradient(
    135deg,
    rgba(155, 34, 38, 0.05) 0%,
    rgba(155, 34, 38, 0.1) 100%
  );
}

/* Card Header */
.upload-card-header {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  padding: 16px 24px;
  border-bottom: 2px solid #8B6914;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upload-card-title {
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

.upload-card-icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
}

.upload-card-badge {
  background: rgba(184, 134, 11, 0.2);
  border: 2px solid #B8860B;
  border-radius: 20px;
  padding: 4px 12px;
  
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #D4AF37;
}

/* Card Content */
.upload-card-content {
  padding: 28px;
}

/* Drag and Drop Zone */
.file-drop-zone {
  border: 4px dashed #8B6914;
  border-radius: 8px;
  padding: 48px 32px;
  
  background: 
    repeating-linear-gradient(
      45deg,
      rgba(139, 105, 20, 0.02),
      rgba(139, 105, 20, 0.02) 10px,
      rgba(184, 134, 11, 0.02) 10px,
      rgba(184, 134, 11, 0.02) 20px
    );
  
  text-align: center;
  cursor: pointer;
  
  transition: all 0.3s ease;
  
  position: relative;
}

.file-drop-zone:hover {
  border-color: #B8860B;
  background-color: rgba(184, 134, 11, 0.05);
  transform: scale(1.01);
}

.file-drop-zone.dragover {
  border-color: #D4AF37;
  border-width: 5px;
  background: rgba(212, 175, 55, 0.1);
  box-shadow: 
    inset 0 0 30px rgba(212, 175, 55, 0.2),
    0 0 20px rgba(212, 175, 55, 0.3);
}

.drop-zone-icon {
  font-size: 64px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  opacity: 0.6;
}

.drop-zone-text {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 8px;
}

.drop-zone-subtext {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--sepia-tone);
  margin-bottom: 16px;
}

.drop-zone-specs {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--steel-brushed);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(139, 105, 20, 0.2);
}

.download-template-link {
  display: inline-block;
  margin-top: 8px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-decoration: none;
  
  padding: 6px 12px;
  background: rgba(184, 134, 11, 0.1);
  border: 2px solid rgba(184, 134, 11, 0.3);
  border-radius: 4px;
  
  transition: all 0.2s ease;
}

.download-template-link:hover {
  background: rgba(184, 134, 11, 0.2);
  border-color: rgba(212, 175, 55, 0.5);
  color: #D4AF37;
}

/* Uploaded File Display */
.uploaded-file-display {
  display: flex;
  align-items: center;
  gap: 16px;
  
  background: rgba(45, 106, 79, 0.1);
  border: 3px solid rgba(45, 106, 79, 0.3);
  border-radius: 8px;
  padding: 16px 20px;
  
  margin-bottom: 20px;
}

.uploaded-file-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.uploaded-file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.uploaded-file-name {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-black);
}

.uploaded-file-meta {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  
  display: flex;
  gap: 16px;
}

.uploaded-file-actions {
  display: flex;
  gap: 8px;
}

.file-action-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #704214;
  background: rgba(184, 134, 11, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 14px;
  cursor: pointer;
  
  transition: all 0.2s ease;
}

.file-action-btn:hover {
  background: rgba(212, 175, 55, 0.3);
  transform: scale(1.1);
}

.file-action-btn.remove {
  background: rgba(155, 34, 38, 0.2);
  border-color: #9B2226;
}

.file-action-btn.remove:hover {
  background: rgba(155, 34, 38, 0.3);
}

/* Validation Preview Box */
.validation-preview-box {
  background: rgba(27, 73, 101, 0.08);
  border: 3px solid rgba(27, 73, 101, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.validation-preview-header {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--railway-blue);
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.validation-preview-header::before {
  content: '📊';
  font-size: 18px;
}

.validation-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.validation-item {
  display: flex;
  align-items: center;
  gap: 10px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  
  padding: 8px 12px;
  background: rgba(255,255,255,0.5);
  border-left: 3px solid var(--validation-color, #2D6A4F);
  border-radius: 4px;
}

.validation-item[data-type="success"] {
  --validation-color: #2D6A4F;
}

.validation-item[data-type="warning"] {
  --validation-color: #CA6702;
  background: rgba(202, 103, 2, 0.05);
}

.validation-item[data-type="error"] {
  --validation-color: #9B2226;
  background: rgba(155, 34, 38, 0.05);
}

.validation-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.validation-text {
  flex: 1;
}

/* Conflict Resolution Box */
.conflict-resolution-box {
  background: rgba(202, 103, 2, 0.08);
  border: 3px solid rgba(202, 103, 2, 0.4);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.conflict-header {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #CA6702;
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.conflict-header::before {
  content: '🔍';
  font-size: 18px;
  animation: pulse-warning 2s ease-in-out infinite;
}

.conflict-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.conflict-item {
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(139, 105, 20, 0.3);
  border-radius: 8px;
  padding: 16px;
}

.conflict-item-header {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--government-seal);
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(139, 105, 20, 0.2);
}

.conflict-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.conflict-value-box {
  background: rgba(27, 73, 101, 0.05);
  border: 2px solid rgba(27, 73, 101, 0.2);
  border-radius: 6px;
  padding: 10px 14px;
}

.conflict-label {
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
  margin-bottom: 6px;
}

.conflict-value {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-black);
}

.conflict-arrow {
  font-size: 24px;
  color: var(--brass-accent);
}

.conflict-resolution-options {
  display: flex;
  gap: 12px;
}

.conflict-option {
  flex: 1;
  
  display: flex;
  align-items: center;
  gap: 8px;
  
  padding: 10px 14px;
  background: rgba(255,255,255,0.6);
  border: 2px solid rgba(139, 105, 20, 0.3);
  border-radius: 6px;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.conflict-option:hover {
  background: rgba(184, 134, 11, 0.1);
  border-color: rgba(184, 134, 11, 0.5);
}

.conflict-option.selected {
  background: rgba(45, 106, 79, 0.2);
  border-color: #2D6A4F;
  border-width: 3px;
}

.conflict-option input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: var(--brass-accent);
}

.conflict-option-label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-black);
}

/* Current Registry Info */
.current-registry-info {
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(139, 105, 20, 0.05);
  border-left: 3px solid var(--brass-accent);
  border-radius: 4px;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--sepia-tone);
}

/* Card Actions */
.upload-card-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(139, 105, 20, 0.2);
}

.upload-card-btn {
  flex: 1;
  min-width: 140px;
  
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 10px 18px;
  
  font-family: var(--font-labels);
  font-size: 10px;
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

.upload-card-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.upload-card-btn.secondary {
  background: rgba(255,255,255,0.3);
  border-color: rgba(112, 66, 20, 0.5);
  color: var(--ink-black);
}

.upload-card-btn.secondary:hover {
  background: rgba(255,255,255,0.5);
}

.upload-card-btn.primary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
}

.upload-card-btn.primary:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
}

/* Upload Summary Panel */
.upload-summary-panel {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  border: 6px solid #B8860B;
  border-radius: 10px;
  padding: 28px;
  margin-top: 32px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 12px 36px rgba(0,0,0,0.6);
}

.summary-panel-header {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(212, 175, 55, 0.4);
  
  display: flex;
  align-items: center;
  gap: 10px;
}

.summary-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 12px 16px;
  background: rgba(244, 241, 222, 0.08);
  border: 2px solid rgba(184, 134, 11, 0.3);
  border-radius: 6px;
}

.summary-stat-label {
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(244, 241, 222, 0.8);
}

.summary-stat-value {
  font-family: var(--font-numbers);
  font-size: 20px;
  font-weight: 700;
  color: #D4AF37;
  
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
}

.summary-stat-value[data-status="warning"] {
  color: #F2CC8F;
}

.summary-stat-value[data-status="error"] {
  color: #F4A3A8;
}

.summary-panel-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(184, 134, 11, 0.3);
}

.summary-action-btn {
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

.summary-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.6),
    0 0 24px rgba(212, 175, 55, 0.5);
}

.summary-action-btn.primary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
}

.summary-action-btn.primary:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.6),
    0 0 24px rgba(82, 183, 136, 0.5);
}

.summary-action-btn.cancel {
  background: rgba(155, 34, 38, 0.2);
  border-color: #9B2226;
  color: #F4A3A8;
}

.summary-action-btn.cancel:hover {
  background: rgba(155, 34, 38, 0.3);
}
```

---

## 📊 SECTION 3: Data Preview & Comparison Viewer

### Purpose
Side-by-side comparison of current data vs new upload with interactive table

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  📊 DATA PREVIEW & COMPARISON VIEWER                          │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Viewing: VEHICLES REGISTRY                                   │
│  [Current Data] [New Upload] [Side-by-Side Comparison]       │
│                                                               │
│  ┌──────────────────────────────┬──────────────────────────┐ │
│  │  CURRENT REGISTRY (127)      │  NEW UPLOAD (130)        │ │
│  ├──────────────────────────────┼──────────────────────────┤ │
│  │  Reg No    │ Type  │ Depot   │  Reg No   │ Type │ Depot│ │
│  ├──────────────────────────────┼──────────────────────────┤ │
│  │  MH-12-5847│ AC    │ Depot 1 │ MH-12-5847│ AC  │ Depot1│ │
│  │  MH-12-5848│ NonAC │ Depot 2 │ MH-12-5848│ NonAC│Depot2│ │
│  │  MH-12-5849│ AC    │ Depot 1 │ MH-12-5849│ AC  │ Depot1│ │
│  │             ...              │            ...          │ │
│  │                              │ +MH-12-9876│AC │ Depot3│ │
│  │                              │ +MH-12-9877│AC │ Depot3│ │
│  │                              │ +MH-12-9878│NonAC│Depot4│ │
│  └──────────────────────────────┴──────────────────────────┘ │
│                                                               │
│  📈 CHANGES SUMMARY:                                          │
│  • 3 new vehicles added (highlighted in green)                │
│  • 0 vehicles removed                                         │
│  • 2 vehicles modified (depot reassignment)                   │
│  • 125 vehicles unchanged                                     │
│                                                               │
│  [EXPORT COMPARISON] [APPROVE CHANGES] [REJECT]              │
└───────────────────────────────────────────────────────────────┘
```

### Component Specification

```css
/* ═══════════════════════════════════════ */
/*     DATA PREVIEW & COMPARISON VIEWER    */
/* ═══════════════════════════════════════ */

.data-preview-viewer {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 32px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 36px rgba(0,0,0,0.4);
}

.preview-viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.preview-viewer-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass-accent);
  
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-view-tabs {
  display: flex;
  gap: 8px;
  background: rgba(62, 39, 35, 0.1);
  border: 2px solid rgba(112, 66, 20, 0.3);
  border-radius: 6px;
  padding: 4px;
}

.preview-tab {
  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sepia-tone);
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-tab:hover {
  background: rgba(184, 134, 11, 0.1);
  color: var(--brass-accent);
}

.preview-tab.active {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  color: #1A1A1A;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

/* Comparison Grid */
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 24px 0;
}

.comparison-panel {
  background: rgba(255,255,255,0.5);
  border: 3px solid #704214;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-panel-header {
  background: linear-gradient(135deg, #3E2723 0%, #2C1810 100%);
  padding: 12px 16px;
  
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #D4AF37;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.record-count-badge {
  background: rgba(212, 175, 55, 0.2);
  border: 2px solid rgba(212, 175, 55, 0.4);
  border-radius: 12px;
  padding: 4px 10px;
  
  font-family: var(--font-numbers);
  font-size: 11px;
  font-weight: 700;
  color: #D4AF37;
}

/* Data Table */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  
  font-family: var(--font-body);
  font-size: 12px;
}

.comparison-table thead {
  background: rgba(112, 66, 20, 0.1);
  border-bottom: 2px solid #704214;
}

.comparison-table th {
  padding: 10px 12px;
  text-align: left;
  
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
}

.comparison-table tbody tr {
  border-bottom: 1px solid rgba(139, 105, 20, 0.1);
  transition: all 0.2s ease;
}

.comparison-table tbody tr:hover {
  background: rgba(184, 134, 11, 0.05);
}

.comparison-table tbody tr[data-change="added"] {
  background: rgba(45, 106, 79, 0.1);
  border-left: 4px solid #2D6A4F;
}

.comparison-table tbody tr[data-change="removed"] {
  background: rgba(155, 34, 38, 0.1);
  border-left: 4px solid #9B2226;
  text-decoration: line-through;
  opacity: 0.7;
}

.comparison-table tbody tr[data-change="modified"] {
  background: rgba(202, 103, 2, 0.1);
  border-left: 4px solid #CA6702;
}

.comparison-table td {
  padding: 10px 12px;
  color: var(--ink-black);
}

.comparison-table td.changed-value {
  background: rgba(202, 103, 2, 0.15);
  font-weight: 700;
  color: #7A2E00;
  
  position: relative;
}

.comparison-table td.changed-value::after {
  content: '✎';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: #CA6702;
}

/* Changes Summary Box */
.changes-summary-box {
  background: rgba(27, 73, 101, 0.08);
  border: 3px solid rgba(27, 73, 101, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
}

.changes-summary-title {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--railway-blue);
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.changes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.change-item {
  display: flex;
  align-items: center;
  gap: 10px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  
  padding: 8px 12px;
  background: rgba(255,255,255,0.5);
  border-left: 3px solid var(--change-color, #2D6A4F);
  border-radius: 4px;
}

.change-item[data-type="added"] {
  --change-color: #2D6A4F;
}

.change-item[data-type="removed"] {
  --change-color: #9B2226;
}

.change-item[data-type="modified"] {
  --change-color: #CA6702;
}

.change-item[data-type="unchanged"] {
  --change-color: #71797E;
}

.change-bullet {
  font-size: 16px;
  flex-shrink: 0;
}

.change-count {
  font-weight: 700;
  color: var(--railway-blue);
  margin-left: auto;
}

/* Viewer Actions */
.preview-viewer-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(139, 105, 20, 0.3);
}

.preview-action-btn {
  flex: 1;
  
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

.preview-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.preview-action-btn.approve {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
  border-color: #52B788;
}

.preview-action-btn.approve:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
}

.preview-action-btn.reject {
  background: rgba(155, 34, 38, 0.2);
  border-color: #9B2226;
  color: #9B2226;
}

.preview-action-btn.reject:hover {
  background: rgba(155, 34, 38, 0.3);
}
```

---

## 🔍 SECTION 4: Advanced Features

### Bulk Data Operations

```css
/* ═══════════════════════════════════════ */
/*     BULK OPERATIONS PANEL               */
/* ═══════════════════════════════════════ */

.bulk-operations-panel {
  background: linear-gradient(135deg, #1B4965 0%, #0F2A3D 100%);
  border: 6px solid #B8860B;
  border-radius: 10px;
  padding: 28px;
  margin-bottom: 32px;
  
  box-shadow: 
    0 0 0 2px #704214,
    0 12px 36px rgba(0,0,0,0.6);
}

.bulk-ops-header {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 20px;
  
  display: flex;
  align-items: center;
  gap: 10px;
}

.bulk-operation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.bulk-op-card {
  background: rgba(244, 241, 222, 0.08);
  border: 3px solid rgba(184, 134, 11, 0.3);
  border-radius: 8px;
  padding: 20px;
  
  transition: all 0.3s ease;
  cursor: pointer;
}

.bulk-op-card:hover {
  background: rgba(244, 241, 222, 0.15);
  border-color: rgba(212, 175, 55, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.bulk-op-title {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 10px;
}

.bulk-op-description {
  font-family: var(--font-body);
  font-size: 12px;
  color: rgba(244, 241, 222, 0.8);
  line-height: 1.6;
}

.bulk-op-examples {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(184, 134, 11, 0.2);
  
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(244, 241, 222, 0.6);
  font-style: italic;
}
```

### Upload History & Audit Trail

```css
/* ═══════════════════════════════════════ */
/*     UPLOAD HISTORY & AUDIT TRAIL        */
/* ═══════════════════════════════════════ */

.upload-history-section {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 10px;
  padding: 28px;
  margin-top: 32px;
}

.history-timeline {
  position: relative;
  padding-left: 40px;
}

.history-timeline::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    #B8860B 0%,
    rgba(184, 134, 11, 0.3) 100%
  );
}

.history-item {
  position: relative;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(139, 105, 20, 0.2);
  border-radius: 8px;
  
  transition: all 0.2s ease;
}

.history-item::before {
  content: '';
  position: absolute;
  left: -34px;
  top: 24px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #B8860B;
  border: 3px solid var(--aged-cream);
  box-shadow: 0 0 8px rgba(184, 134, 11, 0.6);
}

.history-item:hover {
  background: rgba(184, 134, 11, 0.08);
  border-color: rgba(184, 134, 11, 0.4);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.history-action {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--government-seal);
}

.history-timestamp {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--steel-brushed);
}

.history-details {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
  line-height: 1.6;
}

.history-user {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(139, 105, 20, 0.1);
  
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  
  display: flex;
  align-items: center;
  gap: 6px;
}
```

---

## 📋 Complete HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PMPML Data Registry Management</title>
  <link rel="stylesheet" href="styles/data-upload.css">
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
        <span class="breadcrumb-item active">Data Registry Management</span>
      </div>
      
      <h1 class="page-title">
        <span class="page-icon">📋</span>
        DATA REGISTRY MANAGEMENT CENTER
      </h1>
      
      <div class="page-subtitle">
        Archive, validate, and manage official PMPML fleet records
      </div>
    </div>
    
    <!-- Registry Status Dashboard -->
    <div class="registry-status-dashboard">
      <!-- Current data health display -->
    </div>
    
    <!-- File Upload Archive -->
    <div class="file-upload-archive">
      
      <h2 class="archive-section-title">
        📂 FLEET RECORDS ARCHIVE - UPLOAD NEW REGISTRY FILES
      </h2>
      
      <!-- Route Registry Card -->
      <div class="upload-file-card" data-state="empty">
        <div class="upload-card-header">
          <div class="upload-card-title">
            <span class="upload-card-icon">📄</span>
            FILE 1: ROUTE REGISTRY (routes.csv)
          </div>
          <div class="upload-card-badge">REQUIRED</div>
        </div>
        
        <div class="upload-card-content">
          <div class="file-drop-zone">
            <div class="drop-zone-icon">📄</div>
            <div class="drop-zone-text">DRAG & DROP FILE HERE</div>
            <div class="drop-zone-subtext">or click to browse</div>
            <div class="drop-zone-specs">
              Accepted: .csv, .xlsx (max 5MB)<br>
              <a href="#" class="download-template-link">
                Download Sample Routes.csv
              </a>
            </div>
          </div>
          
          <div class="current-registry-info">
            Current Registry: 125 routes (Updated: 28-Jan-2026)
          </div>
          
          <div class="upload-card-actions">
            <button class="upload-card-btn secondary">
              PREVIEW CURRENT
            </button>
            <button class="upload-card-btn secondary">
              DOWNLOAD TEMPLATE
            </button>
          </div>
        </div>
      </div>
      
      <!-- Vehicle Registry Card (with uploaded file) -->
      <div class="upload-file-card" data-state="uploaded">
        <div class="upload-card-header">
          <div class="upload-card-title">
            <span class="upload-card-icon">🚌</span>
            FILE 2: VEHICLE REGISTRY (vehicles.csv)
          </div>
          <div class="upload-card-badge">REQUIRED</div>
        </div>
        
        <div class="upload-card-content">
          <div class="uploaded-file-display">
            <div class="uploaded-file-icon">✓</div>
            <div class="uploaded-file-info">
              <div class="uploaded-file-name">
                vehicles_updated_feb2026.xlsx
              </div>
              <div class="uploaded-file-meta">
                <span>2.3 MB</span>
                <span>130 rows</span>
                <span>Uploaded: 2 min ago</span>
              </div>
            </div>
            <div class="uploaded-file-actions">
              <button class="file-action-btn" title="View">👁️</button>
              <button class="file-action-btn remove" title="Remove">🗑️</button>
            </div>
          </div>
          
          <div class="validation-preview-box">
            <div class="validation-preview-header">
              INSTANT VALIDATION PREVIEW
            </div>
            <div class="validation-items">
              <div class="validation-item" data-type="success">
                <span class="validation-icon">✓</span>
                <span class="validation-text">130 rows detected</span>
              </div>
              <div class="validation-item" data-type="success">
                <span class="validation-icon">✓</span>
                <span class="validation-text">All required columns present</span>
              </div>
              <div class="validation-item" data-type="warning">
                <span class="validation-icon">⚠️</span>
                <span class="validation-text">3 new vehicles detected (vs current 127)</span>
              </div>
              <div class="validation-item" data-type="warning">
                <span class="validation-icon">⚠️</span>
                <span class="validation-text">2 registration numbers need formatting</span>
              </div>
              <div class="validation-item" data-type="success">
                <span class="validation-icon">✓</span>
                <span class="validation-text">No duplicates found</span>
              </div>
            </div>
          </div>
          
          <div class="upload-card-actions">
            <button class="upload-card-btn primary">
              FIX ISSUES AUTOMATICALLY
            </button>
            <button class="upload-card-btn secondary">
              VIEW DETAILED REPORT
            </button>
            <button class="upload-card-btn secondary">
              REPLACE CURRENT ▼
            </button>
            <button class="upload-card-btn secondary">
              MERGE WITH CURRENT ▼
            </button>
          </div>
        </div>
      </div>
      
      <!-- More upload cards... -->
      
      <!-- Upload Summary Panel -->
      <div class="upload-summary-panel">
        <div class="summary-panel-header">
          <span>📋</span>
          UPLOAD SUMMARY & VALIDATION RESULTS
        </div>
        
        <div class="summary-stats-grid">
          <div class="summary-stat">
            <span class="summary-stat-label">Files Ready:</span>
            <span class="summary-stat-value">3 of 5</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">Total New Records:</span>
            <span class="summary-stat-value">408</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">Conflicts to Resolve:</span>
            <span class="summary-stat-value" data-status="warning">5</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">Validation Warnings:</span>
            <span class="summary-stat-value" data-status="warning">2</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">Validation Errors:</span>
            <span class="summary-stat-value">0</span>
          </div>
        </div>
        
        <div class="summary-panel-actions">
          <button class="summary-action-btn primary">
            UPLOAD ALL TO REGISTRY
          </button>
          <button class="summary-action-btn">
            SAVE AS DRAFT
          </button>
          <button class="summary-action-btn cancel">
            CANCEL
          </button>
        </div>
      </div>
      
    </div>
    
    <!-- Data Preview & Comparison Viewer -->
    <div class="data-preview-viewer">
      <!-- Comparison tables -->
    </div>
    
    <!-- Upload History Section -->
    <div class="upload-history-section">
      <h2 class="section-title">📜 UPLOAD HISTORY & AUDIT TRAIL</h2>
      
      <div class="history-timeline">
        <div class="history-item">
          <div class="history-header">
            <div class="history-action">Vehicle Registry Updated</div>
            <div class="history-timestamp">28-Jan-2026 09:15</div>
          </div>
          <div class="history-details">
            Updated vehicles.csv: 127 entries validated and uploaded
          </div>
          <div class="history-user">
            <span>👤</span>
            <span>R. Sharma (Operations Officer)</span>
          </div>
        </div>
        <!-- More history items... -->
      </div>
    </div>
    
  </div>
  
  <script src="scripts/data-upload.js"></script>
</body>
</html>
```

---

**TransitPulse Data Upload Page v2.0**  
*Realistic Registry Management with Smart Validation*  
*Designed for real-world PMPML data operations*  
*Heritage Interface. Modern Functionality. Professional Authority.*
