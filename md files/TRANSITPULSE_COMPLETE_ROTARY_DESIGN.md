# TransitPulse — Complete Rotary Pavilion Design System
## PMPML Heritage Control System — Hub & Full Page Specifications

---

## 🎯 Design Architecture Overview

### The Dual-Mode Interface System

**TransitPulse operates in TWO distinct modes:**

1. **ROTARY HUB MODE** (Navigation Center)
   - Central command pavilion with rotating preview cards
   - Quick overview of all sections
   - Fast navigation between pages
   
2. **FULL PAGE MODE** (Working Screens)
   - Individual pages for actual work
   - Data upload, optimization, reports, etc.
   - "Return to Hub" button always visible

### Navigation Flow

```
┌─────────────────────────────────────────────────────────┐
│                   ROTARY HUB MODE                       │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐            │
│  │ Preview │ →  │ Preview │ →  │ Preview │            │
│  │  Card   │    │  Card   │    │  Card   │            │
│  └────┬────┘    └────┬────┘    └────┬────┘            │
│       │              │              │                  │
│       ▼              ▼              ▼                  │
│  Click Card    Click Card    Click Card               │
│       │              │              │                  │
└───────┼──────────────┼──────────────┼──────────────────┘
        │              │              │
        ▼              ▼              ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  FULL PAGE    │ │  FULL PAGE    │ │  FULL PAGE    │
│  DATA UPLOAD  │ │  OPTIMIZATION │ │  REPORTS      │
│               │ │               │ │               │
│  [Return Hub] │ │  [Return Hub] │ │  [Return Hub] │
└───────────────┘ └───────────────┘ └───────────────┘
```

---

## 📐 PART 1: ROTARY HUB MODE SPECIFICATION

### Hub Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║  STATUS TELEGRAPH (Top Bar)                                   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║               ┌─────────────────────┐                         ║
║               │  PREVIEW CARD       │ ← Front position       ║
║               │  (Currently shown)  │                         ║
║               └─────────────────────┘                         ║
║                        ↑                                      ║
║          ┌─────────────┴─────────────┐                       ║
║     ┌────┴────┐                 ┌────┴────┐                  ║
║     │ GAUGE   │    ╔═══════╗    │ GAUGE   │                  ║
║     │ (West)  │    ║COMMAND║    │ (East)  │                  ║
║     └─────────┘    ║ CLOCK ║    └─────────┘                  ║
║                    ╚═══════╝                                  ║
║     ┌─────────┐                 ┌─────────┐                  ║
║     │ STATION │                 │ STATION │                  ║
║     │ (SW)    │                 │ (SE)    │                  ║
║     └─────────┘                 └─────────┘                  ║
║                                                               ║
║               ┌─────────────────────┐                         ║
║               │ ROTATION CONTROLS   │                         ║
║               │    ← ● ● ● ● →     │                         ║
║               └─────────────────────┘                         ║
╚═══════════════════════════════════════════════════════════════╝
```

### Preview Cards Configuration

**Five Main Preview Cards (Rotating in Middle Ring):**

1. **HOME Dashboard Preview**
2. **DATA Upload Preview**  
3. **OPTIMIZE Engine Preview**
4. **REPORTS Generation Preview**
5. **SETTINGS System Preview**

---

## 🏠 Preview Card 1: HOME Dashboard

### Card Content (Preview Mode)

```css
.preview-card[data-page="home"] {
  width: 380px;
  min-height: 280px;
  
  /* Mahogany panel */
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 32px rgba(0,0,0,0.4);
}
```

**Visual Structure:**
```
┌──────────────────────────────────────────┐
│  🏠 COMMAND CENTER DASHBOARD             │
├──────────────────────────────────────────┤
│                                          │
│  Active Plan: v4                         │
│  Status: ⦿ OPERATIONAL                   │
│                                          │
│  ┌────────────┐  ┌────────────┐         │
│  │ 118 Buses  │  │ 106 Drivers│         │
│  │ Active     │  │ On Duty    │         │
│  └────────────┘  └────────────┘         │
│                                          │
│  Quick Actions:                          │
│  • View Current Assignments              │
│  • Check System Status                   │
│  • Recent Activity Log                   │
│                                          │
│  ┌──────────────────────────┐           │
│  │   OPEN DASHBOARD →       │           │
│  └──────────────────────────┘           │
└──────────────────────────────────────────┘
```

**HTML Structure:**
```html
<div class="preview-card" data-page="home" data-position="front">
  <div class="preview-header">
    <span class="preview-icon">🏠</span>
    <h3 class="preview-title">COMMAND CENTER DASHBOARD</h3>
  </div>
  
  <div class="preview-content">
    <div class="preview-status">
      <div class="status-item">
        <span class="label">Active Plan:</span>
        <span class="value">v4</span>
      </div>
      <div class="status-item">
        <span class="label">Status:</span>
        <span class="value">
          <span class="status-lamp-mini lamp-green">⦿</span>
          OPERATIONAL
        </span>
      </div>
    </div>
    
    <div class="preview-metrics">
      <div class="metric-mini">
        <div class="metric-value">118</div>
        <div class="metric-label">Buses Active</div>
      </div>
      <div class="metric-mini">
        <div class="metric-value">106</div>
        <div class="metric-label">Drivers On Duty</div>
      </div>
    </div>
    
    <div class="preview-quick-info">
      <h4>Quick Actions:</h4>
      <ul>
        <li>View Current Assignments</li>
        <li>Check System Status</li>
        <li>Recent Activity Log</li>
      </ul>
    </div>
  </div>
  
  <button class="preview-open-btn" data-target-page="home">
    OPEN DASHBOARD →
  </button>
</div>
```

---

## 📋 Preview Card 2: DATA Upload

### Card Content (Preview Mode)

```
┌──────────────────────────────────────────┐
│  📋 DATA REGISTRY MANAGEMENT             │
├──────────────────────────────────────────┤
│                                          │
│  Upload Status:                          │
│  ✓ Routes.csv      (125 entries)        │
│  ✓ Vehicles.csv    (127 entries)        │
│  ✓ Drivers.csv     (145 entries)        │
│  ✓ Depots.csv      (4 entries)          │
│  ✓ Timetable.csv   (450 entries)        │
│                                          │
│  Last Updated: 28-Jan-2026 09:15         │
│                                          │
│  Next Action:                            │
│  • Upload new month's data               │
│  • Validate existing records             │
│                                          │
│  ┌──────────────────────────┐           │
│  │   MANAGE DATA FILES →    │           │
│  └──────────────────────────┘           │
└──────────────────────────────────────────┘
```

**HTML Structure:**
```html
<div class="preview-card" data-page="data" data-position="back">
  <div class="preview-header">
    <span class="preview-icon">📋</span>
    <h3 class="preview-title">DATA REGISTRY MANAGEMENT</h3>
  </div>
  
  <div class="preview-content">
    <div class="preview-upload-status">
      <h4>Upload Status:</h4>
      <ul class="file-status-list">
        <li class="file-uploaded">
          <span class="status-icon">✓</span>
          <span class="filename">Routes.csv</span>
          <span class="file-count">(125 entries)</span>
        </li>
        <li class="file-uploaded">
          <span class="status-icon">✓</span>
          <span class="filename">Vehicles.csv</span>
          <span class="file-count">(127 entries)</span>
        </li>
        <li class="file-uploaded">
          <span class="status-icon">✓</span>
          <span class="filename">Drivers.csv</span>
          <span class="file-count">(145 entries)</span>
        </li>
        <li class="file-uploaded">
          <span class="status-icon">✓</span>
          <span class="filename">Depots.csv</span>
          <span class="file-count">(4 entries)</span>
        </li>
        <li class="file-uploaded">
          <span class="status-icon">✓</span>
          <span class="filename">Timetable.csv</span>
          <span class="file-count">(450 entries)</span>
        </li>
      </ul>
      
      <div class="last-updated">
        Last Updated: <strong>28-Jan-2026 09:15</strong>
      </div>
    </div>
  </div>
  
  <button class="preview-open-btn" data-target-page="data">
    MANAGE DATA FILES →
  </button>
</div>
```

---

## ⚙ Preview Card 3: OPTIMIZE Engine

### Card Content (Preview Mode)

```
┌──────────────────────────────────────────┐
│  ⚙ OPTIMIZATION ENGINE CONTROL           │
├──────────────────────────────────────────┤
│                                          │
│  Last Optimization:                      │
│  Plan v4 - 30-Jan-2026 02:00             │
│                                          │
│  Results:                                │
│  • Vehicles: 127 → 118 (9 saved)        │
│  • Fuel: ₹2,400/day saved               │
│  • CO₂: 145kg/day reduced               │
│                                          │
│  Status: ✓ Deployed & Active             │
│                                          │
│  Next Action:                            │
│  • Run new optimization                  │
│  • Compare with current plan             │
│  • Review historical results             │
│                                          │
│  ┌──────────────────────────┐           │
│  │   RUN OPTIMIZATION →     │           │
│  └──────────────────────────┘           │
└──────────────────────────────────────────┘
```

---

## 📊 Preview Card 4: REPORTS Generation

### Card Content (Preview Mode)

```
┌──────────────────────────────────────────┐
│  📊 OFFICIAL REPORTS & DOCUMENTS         │
├──────────────────────────────────────────┤
│                                          │
│  Available Reports:                      │
│  • Fleet Utilization Report              │
│  • Driver Duty Hours Report              │
│  • Cost Analysis Report                  │
│  • Environmental Impact Report           │
│  • Optimization History Report           │
│                                          │
│  Recent Reports:                         │
│  📄 Jan-2026 Fleet Report (PDF)         │
│  📄 Weekly Summary 04-Feb (Excel)       │
│                                          │
│  ┌──────────────────────────┐           │
│  │   GENERATE REPORT →      │           │
│  └──────────────────────────┘           │
└──────────────────────────────────────────┘
```

---

## ⚙️ Preview Card 5: SETTINGS System

### Card Content (Preview Mode)

```
┌──────────────────────────────────────────┐
│  ⚙️ SYSTEM CONFIGURATION                 │
├──────────────────────────────────────────┤
│                                          │
│  Optimization Parameters:                │
│  • Priority: Balanced ▼                  │
│  • Max Driver Hours: 8.0h                │
│  • Min Break Duration: 30min             │
│                                          │
│  System Settings:                        │
│  • Auto-optimize: Daily at 02:00         │
│  • Backup: Enabled                       │
│  • Notifications: Enabled                │
│                                          │
│  Officer: R. Sharma                      │
│  Department: Operations                  │
│                                          │
│  ┌──────────────────────────┐           │
│  │   OPEN SETTINGS →        │           │
│  └──────────────────────────┘           │
└──────────────────────────────────────────┘
```

---

## 🎨 Preview Card CSS Specifications

```css
/* ═══════════════════════════════════════ */
/*        PREVIEW CARD COMPONENTS          */
/* ═══════════════════════════════════════ */

.preview-card {
  width: 380px;
  min-height: 280px;
  
  /* Mahogany panel styling */
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  
  /* Position in orbit */
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50%;
  transform: 
    translate(-50%, -50%)
    rotate(var(--orbit-angle, 0deg))
    translateY(calc(-1 * var(--middle-ring-radius, 450px)))
    rotate(calc(-1 * var(--orbit-angle, 0deg)));
  
  /* Depth and shadows */
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 32px rgba(0,0,0,0.4),
    inset 0 0 0 1px rgba(184, 134, 11, 0.3);
  
  /* Visibility states */
  opacity: var(--card-opacity, 1);
  scale: var(--card-scale, 1);
  z-index: var(--card-z-index, 100);
  
  /* Transitions */
  transition: 
    transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.6s ease,
    scale 0.6s ease,
    box-shadow 0.3s ease;
  
  /* Cursor */
  cursor: pointer;
  user-select: none;
}

/* Position States */
.preview-card[data-position="front"] {
  --orbit-angle: 0deg;
  --card-opacity: 1;
  --card-scale: 1;
  --card-z-index: 100;
  pointer-events: all;
}

.preview-card[data-position="right"] {
  --orbit-angle: 72deg;  /* 360/5 cards = 72deg spacing */
  --card-opacity: 0.4;
  --card-scale: 0.75;
  --card-z-index: 50;
  filter: blur(1px);
  pointer-events: none;
}

.preview-card[data-position="back-right"] {
  --orbit-angle: 144deg;
  --card-opacity: 0.15;
  --card-scale: 0.6;
  --card-z-index: 25;
  filter: blur(2px);
  pointer-events: none;
}

.preview-card[data-position="back-left"] {
  --orbit-angle: 216deg;
  --card-opacity: 0.15;
  --card-scale: 0.6;
  --card-z-index: 25;
  filter: blur(2px);
  pointer-events: none;
}

.preview-card[data-position="left"] {
  --orbit-angle: 288deg;
  --card-opacity: 0.4;
  --card-scale: 0.75;
  --card-z-index: 50;
  filter: blur(1px);
  pointer-events: none;
}

/* Hover Effect (Only on front card) */
.preview-card[data-position="front"]:hover {
  transform: 
    translate(-50%, -50%)
    rotate(0deg)
    translateY(calc(-1 * var(--middle-ring-radius, 450px) - 8px))
    scale(1.02);
  
  box-shadow: 
    0 0 0 2px #D4AF37,
    0 16px 40px rgba(0,0,0,0.5),
    0 0 24px rgba(212, 175, 55, 0.3);
}

/* Preview Header */
.preview-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #8B6914;
}

.preview-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.preview-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin: 0;
  flex: 1;
}

/* Preview Content Area */
.preview-content {
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-black);
  margin-bottom: 20px;
}

.preview-content h4 {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--government-seal);
  margin: 12px 0 8px;
}

.preview-content ul {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

.preview-content li {
  padding-left: 16px;
  position: relative;
  margin: 4px 0;
}

.preview-content li::before {
  content: '•';
  position: absolute;
  left: 4px;
  color: var(--brass-accent);
  font-weight: bold;
}

/* Status Display */
.preview-status {
  background: rgba(184, 134, 11, 0.05);
  border: 1px solid rgba(139, 105, 20, 0.3);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  font-size: 12px;
}

.status-item .label {
  color: var(--sepia-tone);
  font-weight: 600;
}

.status-item .value {
  color: var(--railway-blue);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Mini Status Lamp */
.status-lamp-mini {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #704214;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.3);
}

.status-lamp-mini.lamp-green {
  background: var(--signal-green);
  box-shadow: 
    0 0 8px rgba(45, 106, 79, 0.6),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

/* Preview Metrics */
.preview-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
}

.metric-mini {
  background: rgba(27, 73, 101, 0.05);
  border: 2px solid rgba(27, 73, 101, 0.2);
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}

.metric-value {
  font-family: var(--font-numbers);
  font-size: 24px;
  font-weight: 700;
  color: var(--railway-blue);
  margin-bottom: 4px;
}

.metric-label {
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
}

/* Quick Info Section */
.preview-quick-info h4 {
  margin-top: 16px;
}

/* File Status List (for Data Upload card) */
.file-status-list {
  padding: 0;
  margin: 8px 0;
}

.file-status-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin: 4px 0;
  background: rgba(45, 106, 79, 0.05);
  border-radius: 4px;
}

.file-status-list .status-icon {
  color: var(--signal-green);
  font-weight: bold;
  font-size: 14px;
}

.file-status-list .filename {
  font-weight: 600;
  color: var(--ink-black);
  flex: 1;
}

.file-status-list .file-count {
  font-size: 11px;
  color: var(--steel-brushed);
}

.last-updated {
  margin-top: 12px;
  font-size: 11px;
  color: var(--sepia-tone);
  text-align: right;
}

/* Open Button */
.preview-open-btn {
  width: 100%;
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 4px;
  padding: 12px 20px;
  
  font-family: var(--font-labels);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  text-shadow: 0 1px 0 rgba(255,255,255,0.3);
  
  cursor: pointer;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
  
  transition: all 0.2s ease;
}

.preview-open-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
  transform: translateY(-2px);
}

.preview-open-btn:active {
  transform: translateY(0);
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
}
```

---

## 🎮 Carousel Navigation Controls

```css
/* ═══════════════════════════════════════ */
/*        CAROUSEL ROTATION CONTROLS       */
/* ═══════════════════════════════════════ */

.carousel-controls {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  
  display: flex;
  align-items: center;
  gap: 16px;
  
  background: rgba(62, 39, 35, 0.9);
  border: 3px solid #B8860B;
  border-radius: 50px;
  padding: 12px 24px;
  
  box-shadow: 
    0 8px 24px rgba(0,0,0,0.5),
    inset 0 0 20px rgba(0,0,0,0.3);
  
  z-index: 200;
}

/* Arrow Buttons */
.carousel-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 2px solid #704214;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 18px;
  color: #1A1A1A;
  cursor: pointer;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
  
  transition: all 0.2s ease;
}

.carousel-arrow:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: scale(1.1);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.carousel-arrow:active {
  transform: scale(1);
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
}

/* Page Indicator Dots */
.carousel-indicators {
  display: flex;
  gap: 12px;
}

.carousel-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(184, 134, 11, 0.3);
  border: 2px solid #704214;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot:hover {
  background: rgba(184, 134, 11, 0.6);
  transform: scale(1.15);
}

.carousel-dot.active {
  background: #D4AF37;
  box-shadow: 
    0 0 12px rgba(212, 175, 55, 0.8),
    inset 0 1px 2px rgba(255,255,255,0.3);
  transform: scale(1.2);
}

/* Page Label */
.carousel-label {
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-white);
  padding: 0 8px;
  white-space: nowrap;
}
```

---

## 📐 PART 2: FULL PAGE MODE SPECIFICATIONS

### Page Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║  STATUS TELEGRAPH (Top Bar) + [RETURN TO HUB] Button         ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │  PAGE HEADER (Title, Breadcrumb)                        │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │                                                         │ ║
║  │  PAGE CONTENT AREA                                      │ ║
║  │  (Specific to each page)                                │ ║
║  │                                                         │ ║
║  │                                                         │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Return to Hub Button

```css
/* ═══════════════════════════════════════ */
/*        RETURN TO HUB BUTTON             */
/* ═══════════════════════════════════════ */

.return-hub-btn {
  position: fixed;
  top: 70px;
  right: 40px;
  
  width: 160px;
  height: 48px;
  
  background: linear-gradient(135deg, #1B4965 0%, #0F2A3D 100%);
  border: 3px solid #B8860B;
  border-radius: 6px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment-white);
  
  cursor: pointer;
  z-index: 999;
  
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 1px 2px rgba(255,255,255,0.2);
  
  transition: all 0.3s ease;
}

.return-hub-btn::before {
  content: '⟲';
  font-size: 20px;
  color: #B8860B;
}

.return-hub-btn:hover {
  background: linear-gradient(135deg, #2A5975 0%, #1B3A4D 100%);
  border-color: #D4AF37;
  box-shadow: 
    0 6px 16px rgba(0,0,0,0.5),
    0 0 20px rgba(184, 134, 11, 0.3);
  transform: translateY(-2px);
}

.return-hub-btn:active {
  transform: translateY(0);
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
}
```

---

## 🏠 PAGE 1: HOME Dashboard (Full Page)

### Page Header

```html
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
    Real-time fleet operations overview and quick actions
  </div>
</div>
```

### Page Content Layout

```
┌─────────────────────────────────────────────────────┐
│  ACTIVE PLAN SUMMARY                                │
├─────────────────────────────────────────────────────┤
│  Plan v4  │  Status: ⦿ OPERATIONAL  │  Since: 30-Jan│
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 118/127  │  │ 106/145  │  │ 450/450  │          │
│  │ Vehicles │  │ Drivers  │  │  Trips   │          │
│  │ Active   │  │ On Duty  │  │ Covered  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  DEPOT-WISE DISTRIBUTION                            │
├─────────────────────────────────────────────────────┤
│  Swargate Depot:  42 vehicles │ 38 drivers          │
│  Nigdi Depot:     38 vehicles │ 34 drivers          │
│  Bhosari Depot:   25 vehicles │ 22 drivers          │
│  Katraj Depot:    13 vehicles │ 12 drivers          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  QUICK ACTIONS                                      │
├─────────────────────────────────────────────────────┤
│  [View Vehicle Assignments]  [View Driver Schedule] │
│  [Generate Daily Report]     [System Health Check]  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  RECENT ACTIVITY LOG                                │
├─────────────────────────────────────────────────────┤
│  14:25 - Vehicle MH-12-5847 completed Route 401     │
│  14:18 - Driver D-0234 started shift at Swargate    │
│  14:10 - Plan v4 status check: All nominal          │
│  13:55 - Vehicle MH-12-5912 refueled at Nigdi       │
└─────────────────────────────────────────────────────┘
```

### CSS for Dashboard Page

```css
/* ═══════════════════════════════════════ */
/*        FULL PAGE - DASHBOARD            */
/* ═══════════════════════════════════════ */

.page-container {
  min-height: 100vh;
  background: var(--parchment-white);
  padding: 80px 40px 40px;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 40px;
}

.breadcrumb {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  margin-bottom: 12px;
}

.breadcrumb-item {
  display: inline;
}

.breadcrumb-item.active {
  color: var(--brass-accent);
  font-weight: 700;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: var(--steel-brushed);
}

.page-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin: 0 0 8px;
  
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.page-subtitle {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--sepia-tone);
  font-style: italic;
}

.page-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Dashboard Sections */
.dashboard-section {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 8px 20px rgba(0,0,0,0.3),
    inset 0 0 0 1px rgba(184, 134, 11, 0.2);
}

.section-header {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  border-bottom: 2px solid #8B6914;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.metric-card {
  background: rgba(27, 73, 101, 0.05);
  border: 3px solid rgba(27, 73, 101, 0.3);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.metric-value-large {
  font-family: var(--font-numbers);
  font-size: 36px;
  font-weight: 700;
  color: var(--railway-blue);
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.metric-label-large {
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia-tone);
}

.metric-sublabel {
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--steel-brushed);
  margin-top: 4px;
}

/* Depot Distribution Table */
.depot-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 16px 0;
}

.depot-table thead {
  background: linear-gradient(135deg, #704214 0%, #5A3410 100%);
}

.depot-table th {
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment-white);
  padding: 12px 16px;
  text-align: left;
  border: 2px solid #8B6914;
}

.depot-table tbody tr {
  background: rgba(255,255,255,0.5);
  transition: background 0.2s ease;
}

.depot-table tbody tr:hover {
  background: rgba(184, 134, 11, 0.1);
}

.depot-table td {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  padding: 12px 16px;
  border: 1px solid rgba(139, 105, 20, 0.2);
}

.depot-table td:first-child {
  font-weight: 700;
  color: var(--government-seal);
}

/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.quick-action-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 6px;
  padding: 16px 20px;
  
  font-family: var(--font-labels);
  font-size: 12px;
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

.quick-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.3);
}

/* Activity Log */
.activity-log {
  margin: 16px 0;
}

.activity-item {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  padding: 10px 16px;
  margin: 4px 0;
  background: rgba(255,255,255,0.5);
  border-left: 4px solid var(--brass-accent);
  border-radius: 4px;
  
  transition: all 0.2s ease;
}

.activity-item:hover {
  background: rgba(184, 134, 11, 0.1);
  border-left-width: 6px;
  padding-left: 14px;
}

.activity-timestamp {
  font-weight: 700;
  color: var(--railway-blue);
}
```

---

## 📋 PAGE 2: DATA Upload (Full Page)

### Page Layout

```
┌─────────────────────────────────────────────────────┐
│  UPLOAD REGISTRY FILES                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  FILE 1: ROUTES.CSV                            │ │
│  │  ┌──────────────┐                              │ │
│  │  │ SELECT FILE  │  ✓ routes.csv (125 entries)  │ │
│  │  └──────────────┘                              │ │
│  │  Status: ✓ Validated & Uploaded               │ │
│  │  Last: 28-Jan-2026 09:15                       │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  FILE 2: VEHICLES.CSV                          │ │
│  │  ┌──────────────┐                              │ │
│  │  │ SELECT FILE  │  ✓ vehicles.csv (127 entries)│ │
│  │  └──────────────┘                              │ │
│  │  Status: ✓ Validated & Uploaded               │ │
│  │  Last: 28-Jan-2026 09:15                       │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  [Similar cards for Drivers, Depots, Timetable]     │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  [VALIDATE ALL FILES]  [UPLOAD TO REGISTRY]   │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  VALIDATION RESULTS                                 │
├─────────────────────────────────────────────────────┤
│  ✓ All files validated successfully                 │
│  ✓ No duplicate entries found                       │
│  ✓ All foreign key references valid                 │
│  ⚠ 3 warnings (review recommended)                  │
│                                                      │
│  [VIEW DETAILED VALIDATION REPORT]                  │
└─────────────────────────────────────────────────────┘
```

### Upload Card Component

```css
/* ═══════════════════════════════════════ */
/*        DATA UPLOAD PAGE COMPONENTS      */
/* ═══════════════════════════════════════ */

.upload-card {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 6px 16px rgba(0,0,0,0.3);
}

.upload-card-header {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-input-wrapper {
  position: relative;
  display: inline-block;
}

.file-input-hidden {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.file-input-label {
  display: inline-block;
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  border-radius: 4px;
  padding: 10px 20px;
  
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  
  cursor: pointer;
  transition: all 0.2s ease;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.file-input-label:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-1px);
}

.file-selected-info {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
}

.file-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 16px;
  background: rgba(45, 106, 79, 0.1);
  border-left: 4px solid var(--signal-green);
  border-radius: 4px;
  
  font-family: var(--font-body);
  font-size: 12px;
}

.file-status.warning {
  background: rgba(202, 103, 2, 0.1);
  border-left-color: var(--signal-amber);
}

.file-status.error {
  background: rgba(155, 34, 38, 0.1);
  border-left-color: var(--signal-red);
}

.file-timestamp {
  font-size: 11px;
  color: var(--steel-brushed);
  margin-top: 8px;
}

/* Validation Results Box */
.validation-results {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-top: 30px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 6px 16px rgba(0,0,0,0.3);
}

.validation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  
  font-family: var(--font-body);
  font-size: 13px;
}

.validation-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.validation-icon.success { color: var(--signal-green); }
.validation-icon.warning { color: var(--signal-amber); }
.validation-icon.error { color: var(--signal-red); }

/* Upload Action Buttons */
.upload-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(139, 105, 20, 0.3);
}

.upload-action-btn {
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
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.upload-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.3);
}

.upload-action-btn.primary {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
  color: white;
}

.upload-action-btn.primary:hover {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
}
```

---

## ⚙ PAGE 3: OPTIMIZATION Engine (Full Page)

### Page Layout

```
┌─────────────────────────────────────────────────────┐
│  OPTIMIZATION CONFIGURATION                         │
├─────────────────────────────────────────────────────┤
│  Priority Strategy:                                  │
│  ● Balanced  ○ Cost-Focused  ○ Hours-Balanced       │
│                                                      │
│  Constraints:                                        │
│  Max Driver Hours: [8.0] hours                      │
│  Min Break Duration: [30] minutes                   │
│  Allow Overtime: ☐ Yes                              │
│                                                      │
│  [RUN OPTIMIZATION ENGINE]                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  OPTIMIZATION PROGRESS                              │
├─────────────────────────────────────────────────────┤
│  Status: ⚙ Processing TSN Builder...               │
│  Progress: ▓▓▓▓▓▓▓▓░░░░░░░░ 45%                     │
│  Elapsed: 00:02:15  |  Est. Remaining: 00:02:48     │
│                                                      │
│  Current Step: Building time-space network graph    │
│  Nodes Created: 4,823 | Edges Created: 18,945       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  OPTIMIZATION RESULTS                               │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐                │
│  │ CURRENT PLAN │  │   NEW PLAN   │                │
│  │   (Plan v4)  │  │  (Plan v5)   │                │
│  ├──────────────┤  ├──────────────┤                │
│  │ 118 Vehicles │  │ 115 Vehicles │ -3 (-2.5%)    │
│  │ 108 Drivers  │  │ 106 Drivers  │ -2 (-1.9%)    │
│  │ ₹18,200/day  │  │ ₹15,800/day  │ ₹2,400 saved  │
│  │ 580kg CO₂    │  │ 435kg CO₂    │ 145kg reduced │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│  [VIEW DETAILED COMPARISON]  [ACTIVATE PLAN v5]    │
└─────────────────────────────────────────────────────┘
```

### Optimization Components CSS

```css
/* ═══════════════════════════════════════ */
/*      OPTIMIZATION PAGE COMPONENTS       */
/* ═══════════════════════════════════════ */

.config-panel {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
}

.config-group {
  margin: 20px 0;
}

.config-label {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 12px;
  display: block;
}

/* Radio Strategy Options */
.strategy-options {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.strategy-option {
  display: flex;
  align-items: center;
  gap: 8px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  cursor: pointer;
  
  padding: 10px 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.strategy-option:hover {
  background: rgba(184, 134, 11, 0.1);
  border-color: rgba(184, 134, 11, 0.3);
}

.strategy-option input[type="radio"] {
  width: 20px;
  height: 20px;
  accent-color: var(--brass-accent);
}

/* Number Inputs */
.config-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
}

.config-input input[type="number"] {
  width: 80px;
  background: rgba(255,255,255,0.6);
  border: 2px solid #8B6914;
  border-radius: 4px;
  padding: 8px 12px;
  
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: var(--railway-blue);
  
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.config-input input[type="number"]:focus {
  outline: none;
  border-color: var(--brass-accent);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.1),
    0 0 8px rgba(184, 134, 11, 0.4);
}

.config-input label {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
}

/* Checkbox */
.config-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
}

.config-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--brass-accent);
}

/* Progress Bar */
.progress-container {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
}

.progress-status {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-black);
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar-track {
  width: 100%;
  height: 40px;
  background: rgba(139, 105, 20, 0.2);
  border: 3px solid #704214;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.2);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #B8860B 0%,
    #D4AF37 50%,
    #B8860B 100%
  );
  width: var(--progress-width, 0%);
  
  transition: width 0.5s ease;
  
  box-shadow: 
    0 0 16px rgba(212, 175, 55, 0.6),
    inset 0 2px 4px rgba(255,255,255,0.3);
  
  /* Animated shimmer */
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.progress-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  font-family: var(--font-numbers);
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
  text-shadow: 
    1px 1px 0 rgba(255,255,255,0.5),
    0 0 4px rgba(255,255,255,0.3);
  
  z-index: 2;
}

.progress-details {
  margin-top: 16px;
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--sepia-tone);
  
  display: flex;
  justify-content: space-between;
}

.progress-step-info {
  margin-top: 12px;
  padding: 12px;
  background: rgba(184, 134, 11, 0.05);
  border-left: 3px solid var(--brass-accent);
  border-radius: 4px;
  
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-black);
}

/* Comparison Cards */
.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  margin: 24px 0;
  align-items: start;
}

.plan-card {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  
  box-shadow: 
    0 0 0 2px #8B6914,
    0 6px 16px rgba(0,0,0,0.3);
}

.plan-card.current {
  border-color: #8B6914;
}

.plan-card.new {
  border-color: #52B788;
  box-shadow: 
    0 0 0 2px #52B788,
    0 6px 16px rgba(0,0,0,0.3),
    0 0 20px rgba(82, 183, 136, 0.2);
}

.plan-card-header {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #8B6914;
}

.plan-metric {
  margin: 12px 0;
  padding: 12px;
  background: rgba(255,255,255,0.5);
  border-radius: 4px;
}

.plan-metric-label {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
  margin-bottom: 4px;
}

.plan-metric-value {
  font-family: var(--font-numbers);
  font-size: 24px;
  font-weight: 700;
  color: var(--railway-blue);
}

/* Difference Indicator */
.comparison-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0;
}

.difference-badge {
  background: linear-gradient(135deg, #52B788 0%, #2D6A4F 100%);
  border: 3px solid #704214;
  border-radius: 50px;
  padding: 12px 20px;
  
  font-family: var(--font-labels);
  font-size: 12px;
  font-weight: 700;
  color: white;
  text-align: center;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    0 0 16px rgba(82, 183, 136, 0.3);
}

.difference-badge.negative {
  background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
}

.arrow-icon {
  font-size: 32px;
  color: var(--brass-accent);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}
```

---

## 📊 PAGE 4: REPORTS Generation (Full Page)

### Page Layout

```
┌─────────────────────────────────────────────────────┐
│  REPORT GENERATOR                                   │
├─────────────────────────────────────────────────────┤
│  Report Type:                                        │
│  ▼ Fleet Utilization Report                         │
│     - Fleet Utilization Report                       │
│     - Driver Duty Hours Report                       │
│     - Cost Analysis Report                           │
│     - Environmental Impact Report                    │
│     - Optimization History Report                    │
│                                                      │
│  Date Range:                                         │
│  From: [01-Jan-2026]  To: [31-Jan-2026]             │
│                                                      │
│  Include:                                            │
│  ☑ Summary Statistics                               │
│  ☑ Detailed Tables                                  │
│  ☑ Visualizations                                   │
│  ☐ Raw Data Export                                  │
│                                                      │
│  Format: ● PDF  ○ Excel  ○ Both                     │
│                                                      │
│  [GENERATE REPORT]                                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  RECENT REPORTS                                     │
├─────────────────────────────────────────────────────┤
│  📄 Fleet_Utilization_Jan2026.pdf                   │
│     Generated: 05-Feb-2026 10:30  |  [Download]     │
│                                                      │
│  📄 Weekly_Summary_Week05.xlsx                       │
│     Generated: 04-Feb-2026 16:45  |  [Download]     │
│                                                      │
│  📄 Environmental_Impact_Q1.pdf                      │
│     Generated: 02-Feb-2026 09:15  |  [Download]     │
└─────────────────────────────────────────────────────┘
```

### Reports Page CSS

```css
/* ═══════════════════════════════════════ */
/*        REPORTS PAGE COMPONENTS          */
/* ═══════════════════════════════════════ */

.report-config {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin: 20px 0;
}

.form-label {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  margin-bottom: 10px;
  display: block;
}

.form-select {
  width: 100%;
  max-width: 400px;
  background: rgba(255,255,255,0.6);
  border: 2px solid #8B6914;
  border-radius: 4px;
  padding: 10px 16px;
  
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-black);
  
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--brass-accent);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.1),
    0 0 8px rgba(184, 134, 11, 0.4);
}

.date-range-inputs {
  display: flex;
  gap: 16px;
  align-items: center;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.date-input-label {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
}

.form-date {
  background: rgba(255,255,255,0.6);
  border: 2px solid #8B6914;
  border-radius: 4px;
  padding: 8px 12px;
  
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.form-date:focus {
  outline: none;
  border-color: var(--brass-accent);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.1),
    0 0 8px rgba(184, 134, 11, 0.4);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-option input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--brass-accent);
}

.checkbox-option label {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-black);
  cursor: pointer;
}

/* Recent Reports List */
.recent-reports-list {
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 24px;
}

.report-item {
  padding: 16px;
  margin: 8px 0;
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(139, 105, 20, 0.2);
  border-radius: 6px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  transition: all 0.2s ease;
}

.report-item:hover {
  background: rgba(184, 134, 11, 0.1);
  border-color: rgba(184, 134, 11, 0.4);
}

.report-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.report-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.report-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.report-filename {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-black);
}

.report-metadata {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--sepia-tone);
}

.report-download-btn {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 2px solid #704214;
  border-radius: 4px;
  padding: 8px 16px;
  
  font-family: var(--font-labels);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
  
  cursor: pointer;
  transition: all 0.2s ease;
  
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
}

.report-download-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.4),
    0 0 12px rgba(212, 175, 55, 0.3);
}
```

---

## 🎮 JavaScript: Page Navigation System

```javascript
/* ═══════════════════════════════════════ */
/*      ROTARY PAVILION NAVIGATION         */
/* ═══════════════════════════════════════ */

class RotaryPavilionNavigator {
  constructor() {
    this.currentPage = 'hub';  // 'hub' or 'home', 'data', 'optimize', 'reports', 'settings'
    this.currentCardIndex = 0;
    this.totalCards = 5;
    
    this.cards = [
      { id: 'home', name: 'Home Dashboard' },
      { id: 'data', name: 'Data Upload' },
      { id: 'optimize', name: 'Optimization' },
      { id: 'reports', name: 'Reports' },
      { id: 'settings', name: 'Settings' }
    ];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.showHub();
  }
  
  setupEventListeners() {
    // Carousel arrow buttons
    document.querySelector('.carousel-arrow-prev')?.addEventListener('click', () => {
      this.rotateCarousel(-1);
    });
    
    document.querySelector('.carousel-arrow-next')?.addEventListener('click', () => {
      this.rotateCarousel(1);
    });
    
    // Carousel dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.rotateToCard(index);
      });
    });
    
    // Preview card open buttons
    document.querySelectorAll('.preview-open-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetPage = e.target.dataset.targetPage;
        this.openPage(targetPage);
      });
    });
    
    // Card click (on front card)
    document.querySelectorAll('.preview-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (card.dataset.position === 'front' && !e.target.classList.contains('preview-open-btn')) {
          const targetPage = card.dataset.page;
          this.openPage(targetPage);
        }
      });
    });
    
    // Return to hub button
    document.querySelector('.return-hub-btn')?.addEventListener('click', () => {
      this.returnToHub();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.currentPage === 'hub') {
        if (e.key === 'ArrowLeft') this.rotateCarousel(-1);
        if (e.key === 'ArrowRight') this.rotateCarousel(1);
        if (e.key === 'Enter') {
          const frontCard = document.querySelector('.preview-card[data-position="front"]');
          if (frontCard) {
            this.openPage(frontCard.dataset.page);
          }
        }
      }
      
      // Escape to return to hub
      if (e.key === 'Escape' && this.currentPage !== 'hub') {
        this.returnToHub();
      }
    });
  }
  
  rotateCarousel(direction) {
    // direction: -1 for prev, 1 for next
    this.currentCardIndex = (this.currentCardIndex + direction + this.totalCards) % this.totalCards;
    this.updateCarouselPositions();
  }
  
  rotateToCard(index) {
    this.currentCardIndex = index;
    this.updateCarouselPositions();
  }
  
  updateCarouselPositions() {
    const positions = ['front', 'right', 'back-right', 'back-left', 'left'];
    
    document.querySelectorAll('.preview-card').forEach((card, cardIndex) => {
      const relativePosition = (cardIndex - this.currentCardIndex + this.totalCards) % this.totalCards;
      const positionName = positions[relativePosition] || 'back-left';
      
      card.dataset.position = positionName;
      
      // Update orbit angle
      const angle = relativePosition * (360 / this.totalCards);
      card.style.setProperty('--orbit-angle', `${angle}deg`);
    });
    
    // Update indicator dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentCardIndex);
    });
    
    // Update label
    const labelEl = document.querySelector('.carousel-label');
    if (labelEl) {
      labelEl.textContent = this.cards[this.currentCardIndex].name;
    }
  }
  
  showHub() {
    this.currentPage = 'hub';
    
    // Hide all full pages
    document.querySelectorAll('.page-container').forEach(page => {
      page.style.display = 'none';
    });
    
    // Show hub
    const hub = document.querySelector('.rotary-hub');
    if (hub) {
      hub.style.display = 'block';
      hub.classList.add('active');
    }
    
    // Hide return button
    const returnBtn = document.querySelector('.return-hub-btn');
    if (returnBtn) {
      returnBtn.style.display = 'none';
    }
    
    // Update positions
    this.updateCarouselPositions();
  }
  
  openPage(pageId) {
    this.currentPage = pageId;
    
    // Hide hub
    const hub = document.querySelector('.rotary-hub');
    if (hub) {
      hub.style.display = 'none';
      hub.classList.remove('active');
    }
    
    // Hide all pages first
    document.querySelectorAll('.page-container').forEach(page => {
      page.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.querySelector(`.page-container[data-page="${pageId}"]`);
    if (targetPage) {
      targetPage.style.display = 'block';
      targetPage.classList.add('active');
      
      // Trigger page enter animation
      setTimeout(() => {
        targetPage.classList.add('page-entered');
      }, 50);
    }
    
    // Show return button
    const returnBtn = document.querySelector('.return-hub-btn');
    if (returnBtn) {
      returnBtn.style.display = 'flex';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  returnToHub() {
    // Hide current page
    const currentPageEl = document.querySelector(`.page-container[data-page="${this.currentPage}"]`);
    if (currentPageEl) {
      currentPageEl.classList.remove('page-entered');
      
      // Wait for animation
      setTimeout(() => {
        this.showHub();
      }, 300);
    } else {
      this.showHub();
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const navigator = new RotaryPavilionNavigator();
  
  // Make globally accessible for debugging
  window.pavilionNavigator = navigator;
});
```

---

## 🎨 Page Transition Animations

```css
/* ═══════════════════════════════════════ */
/*        PAGE TRANSITION ANIMATIONS       */
/* ═══════════════════════════════════════ */

.rotary-hub {
  opacity: 1;
  transform: scale(1);
  transition: 
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rotary-hub:not(.active) {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}

.page-container {
  opacity: 0;
  transform: translateY(20px);
  transition: 
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.page-container.page-entered {
  opacity: 1;
  transform: translateY(0);
}

/* Return button slide in */
.return-hub-btn {
  animation: slideInFromRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## 📏 Complete Layout Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TransitPulse — PMPML Command Center</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

  <!-- Status Telegraph (Always visible) -->
  <div class="status-telegraph">
    <!-- Telegraph content -->
  </div>
  
  <!-- Return to Hub Button (hidden initially) -->
  <button class="return-hub-btn" style="display: none;">
    RETURN TO HUB
  </button>
  
  <!-- ROTARY HUB MODE -->
  <div class="rotary-hub active">
    
    <!-- Central Command Clock -->
    <div class="command-clock">
      <!-- Clock content -->
    </div>
    
    <!-- Cardinal Gauges -->
    <div class="cardinal-gauge" data-direction="north">
      <!-- North gauge -->
    </div>
    <div class="cardinal-gauge" data-direction="east">
      <!-- East gauge -->
    </div>
    <div class="cardinal-gauge" data-direction="south">
      <!-- South gauge -->
    </div>
    <div class="cardinal-gauge" data-direction="west">
      <!-- West gauge -->
    </div>
    
    <!-- Rotating Preview Cards -->
    <div class="information-pavilion">
      <div class="preview-card" data-page="home" data-position="front">
        <!-- Home preview -->
      </div>
      <div class="preview-card" data-page="data" data-position="right">
        <!-- Data preview -->
      </div>
      <div class="preview-card" data-page="optimize" data-position="back-right">
        <!-- Optimize preview -->
      </div>
      <div class="preview-card" data-page="reports" data-position="back-left">
        <!-- Reports preview -->
      </div>
      <div class="preview-card" data-page="settings" data-position="left">
        <!-- Settings preview -->
      </div>
    </div>
    
    <!-- Carousel Controls -->
    <div class="carousel-controls">
      <button class="carousel-arrow carousel-arrow-prev">←</button>
      <div class="carousel-indicators">
        <div class="carousel-dot active"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
      </div>
      <span class="carousel-label">Home Dashboard</span>
      <button class="carousel-arrow carousel-arrow-next">→</button>
    </div>
    
  </div>
  
  <!-- FULL PAGE: HOME -->
  <div class="page-container" data-page="home" style="display: none;">
    <div class="page-header">
      <!-- Page header -->
    </div>
    <div class="page-content">
      <!-- Dashboard content -->
    </div>
  </div>
  
  <!-- FULL PAGE: DATA -->
  <div class="page-container" data-page="data" style="display: none;">
    <div class="page-header">
      <!-- Page header -->
    </div>
    <div class="page-content">
      <!-- Data upload content -->
    </div>
  </div>
  
  <!-- FULL PAGE: OPTIMIZE -->
  <div class="page-container" data-page="optimize" style="display: none;">
    <div class="page-header">
      <!-- Page header -->
    </div>
    <div class="page-content">
      <!-- Optimization content -->
    </div>
  </div>
  
  <!-- FULL PAGE: REPORTS -->
  <div class="page-container" data-page="reports" style="display: none;">
    <div class="page-header">
      <!-- Page header -->
    </div>
    <div class="page-content">
      <!-- Reports content -->
    </div>
  </div>
  
  <!-- FULL PAGE: SETTINGS -->
  <div class="page-container" data-page="settings" style="display: none;">
    <div class="page-header">
      <!-- Page header -->
    </div>
    <div class="page-content">
      <!-- Settings content -->
    </div>
  </div>
  
  <script src="scripts/main.js"></script>
</body>
</html>
```

---

## ✅ Design System Summary

### Navigation Flow
1. **Hub Mode**: User sees rotary pavilion with preview cards
2. **Card Rotation**: Left/right arrows or dots to browse pages
3. **Page Entry**: Click "OPEN" button or click card to enter full page
4. **Page Exit**: Click "RETURN TO HUB" button or press Escape
5. **Seamless Transitions**: Smooth animations between modes

### Key Features
- ✅ Unique rotary navigation system
- ✅ Preview cards show page summaries
- ✅ Full pages for actual work
- ✅ Always-accessible return button
- ✅ Keyboard navigation support
- ✅ Smooth page transitions
- ✅ Vintage aesthetic maintained throughout
- ✅ Project flow properly implemented

---

**TransitPulse Complete Rotary Design v2.0**  
*Hub Navigation + Full Page System*  
*Heritage Interface. Modern Workflow. Unforgettable Experience.*
