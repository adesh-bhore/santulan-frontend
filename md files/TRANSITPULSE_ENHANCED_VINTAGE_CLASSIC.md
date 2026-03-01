# TransitPulse — Enhanced Vintage Implementation Guide
## Rotary Pavilion Design System — Complete Component Library

---

## 🎨 Component System Overview

This guide provides **pixel-perfect specifications** for implementing the Revolutionary Rotary Pavilion design for PMPML's TransitPulse system.

**Philosophy:** Every component is a precision-crafted vintage instrument.

---

## 🕐 COMPONENT 1: Central Command Clock

### Visual Anatomy

```
Outer Ring (Brass Rim)
    ↓
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗  │ ← Border: #704214 (8px)
│  ║  ┌───────────────────┐    ║  │
│  ║  │                   │    ║  │ ← Face: Radial brass gradient
│  ║  │  PMPML COMMAND   │    ║  │
│  ║  │                   │    ║  │
│  ║  │    PLAN v4       │    ║  │ ← Status text
│  ║  │    ACTIVE        │    ║  │
│  ║  │                   │    ║  │
│  ║  │   14:32:15       │    ║  │ ← Live time
│  ║  │                   │    ║  │
│  ║  └───────────────────┘    ║  │ ← Inner face: Parchment
│  ╚═══════════════════════════╝  │
└─────────────────────────────────┘
     ↑
Status Badge (floating, top-right)
```

### Complete CSS Implementation

```css
/* ═══════════════════════════════════════ */
/*      COMMAND CLOCK - FULL SPEC         */
/* ═══════════════════════════════════════ */

.command-clock {
  /* Dimensions & Position */
  width: var(--nucleus-diameter);
  height: var(--nucleus-diameter);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  /* Shape */
  border-radius: 50%;
  overflow: visible;
  
  /* Brass Clock Rim - Outer */
  background: 
    radial-gradient(
      circle at 30% 30%,
      #D4AF37 0%,
      #C9A84B 15%,
      #B8860B 50%,
      #A67C00 85%,
      #8B6914 100%
    );
  
  /* Layered Border System */
  border: 8px solid #704214;
  box-shadow: 
    /* Outer brass ring */
    0 0 0 3px #B8860B,
    /* Dark border */
    0 0 0 6px #704214,
    /* Outer glow */
    0 0 0 8px rgba(184, 134, 11, 0.2),
    /* Main shadow */
    0 12px 32px rgba(0,0,0,0.5),
    0 6px 16px rgba(0,0,0,0.3),
    /* Inner shadow for depth */
    inset 0 0 40px rgba(0,0,0,0.2),
    inset 0 4px 8px rgba(0,0,0,0.15);
  
  /* Z-index */
  z-index: var(--z-nucleus);
  
  /* Accessibility */
  cursor: pointer;
  transition: all 0.3s var(--timing-precision);
}

.command-clock:hover {
  box-shadow: 
    0 0 0 3px #D4AF37,
    0 0 0 6px #704214,
    0 0 0 8px rgba(212, 175, 55, 0.4),
    0 0 24px rgba(212, 175, 55, 0.3),
    0 16px 40px rgba(0,0,0,0.6),
    0 8px 20px rgba(0,0,0,0.4),
    inset 0 0 40px rgba(0,0,0,0.2);
  
  transform: translate(-50%, -50%) scale(1.02);
}

.command-clock:focus-visible {
  outline: 4px solid #D4AF37;
  outline-offset: 8px;
}

/* Roman Numeral Markers (Decorative) */
.command-clock::before {
  content: '';
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 28deg,
    rgba(112, 66, 20, 0.3) 28deg 30deg,
    transparent 30deg 90deg
  );
  pointer-events: none;
  z-index: 1;
}

/* Hour Markers */
.command-clock::after {
  content: '';
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  background: 
    repeating-conic-gradient(
      from 0deg,
      transparent 0deg 29deg,
      rgba(184, 134, 11, 0.4) 29deg 31deg,
      transparent 31deg 90deg
    );
  pointer-events: none;
  z-index: 2;
}

/* Inner Clock Face */
.clock-inner {
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  
  /* Parchment background */
  background: 
    radial-gradient(
      circle at 40% 40%,
      #FAF3E0 0%,
      #F4F1DE 60%,
      #EDE8D5 100%
    );
  
  /* Embossed effect */
  box-shadow: 
    inset 0 4px 12px rgba(0,0,0,0.15),
    inset 0 -2px 6px rgba(255,255,255,0.5),
    inset 0 0 0 1px rgba(184, 134, 11, 0.2);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  /* Text selection */
  user-select: none;
  
  z-index: 3;
}

/* Organization Label (Top) */
.clock-org-label {
  font-family: var(--font-labels);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--sepia-tone);
  text-align: center;
  margin-bottom: 4px;
  opacity: 0.8;
}

/* Plan Status */
.clock-status {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brass-accent);
  text-align: center;
  text-shadow: 
    1px 1px 2px rgba(0,0,0,0.3),
    0 0 8px rgba(184, 134, 11, 0.2);
  line-height: 1.2;
  margin-bottom: 4px;
}

/* Plan Version */
.clock-plan-version {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--government-seal);
  text-align: center;
  margin-bottom: 12px;
}

/* Live Time Display */
.clock-time {
  font-family: var(--font-numbers);
  font-size: 28px;
  font-weight: 700;
  color: var(--railway-blue);
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 8px;
  text-shadow: 
    1px 1px 0 rgba(0,0,0,0.2),
    0 0 4px rgba(27, 73, 101, 0.3);
}

/* Seconds (smaller) */
.clock-time-seconds {
  font-size: 18px;
  color: var(--steel-brushed);
  margin-left: 4px;
}

/* Status Badge (Floating) */
.clock-status-badge {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  
  /* Active status color */
  background: 
    radial-gradient(
      circle at 30% 30%,
      #52B788 0%,
      #2D6A4F 100%
    );
  
  /* Borders */
  border: 4px solid #704214;
  box-shadow: 
    0 0 0 2px #B8860B,
    0 4px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(82, 183, 136, 0.4),
    inset 0 2px 4px rgba(255,255,255,0.3),
    inset 0 -2px 4px rgba(0,0,0,0.3);
  
  /* Content */
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: var(--font-numbers);
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  z-index: 10;
  
  /* Animation */
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 0 2px #B8860B,
      0 4px 12px rgba(0,0,0,0.4),
      0 0 16px rgba(82, 183, 136, 0.4);
  }
  50% { 
    box-shadow: 
      0 0 0 2px #B8860B,
      0 4px 12px rgba(0,0,0,0.4),
      0 0 24px rgba(82, 183, 136, 0.6);
  }
}

/* Quick Action Menu (revealed on click) */
.clock-actions {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  opacity: 0;
  
  display: flex;
  gap: 8px;
  
  transition: all 0.3s var(--timing-mechanical);
  transform-origin: top center;
  z-index: 20;
}

.command-clock.expanded .clock-actions {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

.clock-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  border: 3px solid #704214;
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #1A1A1A;
  font-size: 16px;
  
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(255,255,255,0.3);
  
  transition: all 0.2s ease;
}

.clock-action-btn:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  transform: translateY(-2px) scale(1.1);
  box-shadow: 
    0 6px 12px rgba(0,0,0,0.4),
    0 0 16px rgba(212, 175, 55, 0.4);
}

.clock-action-btn:active {
  transform: translateY(0) scale(1);
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
}
```

### HTML Structure

```html
<div 
  class="command-clock" 
  role="region" 
  aria-label="Command Center Status"
  tabindex="0"
  data-expanded="false"
>
  <!-- Status Badge -->
  <div class="clock-status-badge" aria-label="Plan Version 4">
    v4
  </div>
  
  <!-- Clock Face -->
  <div class="clock-inner">
    <div class="clock-org-label">
      PMPML COMMAND
    </div>
    
    <div class="clock-status">
      ACTIVE
    </div>
    
    <div class="clock-plan-version">
      PLAN v4
    </div>
    
    <div class="clock-time">
      14:32<span class="clock-time-seconds">:15</span>
    </div>
  </div>
  
  <!-- Quick Actions (hidden by default) -->
  <div class="clock-actions">
    <button 
      class="clock-action-btn" 
      aria-label="View Plan Details"
      title="View Plan"
    >
      📋
    </button>
    <button 
      class="clock-action-btn" 
      aria-label="Generate Report"
      title="Report"
    >
      📊
    </button>
    <button 
      class="clock-action-btn" 
      aria-label="System Settings"
      title="Settings"
    >
      ⚙
    </button>
  </div>
  
  <!-- Screen reader live region -->
  <div class="sr-only" aria-live="polite" aria-atomic="true">
    Current time: 14:32:15. Active Plan: Version 4. Status: Operational.
  </div>
</div>
```

### JavaScript Behavior

```javascript
class CommandClock {
  constructor(element) {
    this.clock = element;
    this.timeDisplay = element.querySelector('.clock-time');
    this.statusBadge = element.querySelector('.clock-status-badge');
    this.srLiveRegion = element.querySelector('[aria-live]');
    
    this.init();
  }
  
  init() {
    // Update time every second
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    
    // Toggle quick actions on click
    this.clock.addEventListener('click', (e) => {
      if (!e.target.closest('.clock-action-btn')) {
        this.toggleActions();
      }
    });
    
    // Keyboard support
    this.clock.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleActions();
      }
    });
  }
  
  updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    this.timeDisplay.innerHTML = `
      ${hours}:${minutes}<span class="clock-time-seconds">:${seconds}</span>
    `;
    
    // Update screen reader every minute
    if (seconds === '00') {
      this.updateScreenReader();
    }
  }
  
  updateScreenReader() {
    const time = this.timeDisplay.textContent.replace(/:/g, ' ');
    const status = this.clock.querySelector('.clock-status').textContent;
    const version = this.clock.querySelector('.clock-plan-version').textContent;
    
    this.srLiveRegion.textContent = 
      `Current time: ${time}. ${version}. Status: ${status}.`;
  }
  
  toggleActions() {
    const isExpanded = this.clock.dataset.expanded === 'true';
    this.clock.dataset.expanded = !isExpanded;
    this.clock.classList.toggle('expanded');
    this.clock.setAttribute('aria-expanded', !isExpanded);
  }
  
  updateStatus(planVersion, status) {
    this.clock.querySelector('.clock-status').textContent = status;
    this.clock.querySelector('.clock-plan-version').textContent = `PLAN ${planVersion}`;
    this.statusBadge.textContent = planVersion;
    this.updateScreenReader();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const commandClock = new CommandClock(
    document.querySelector('.command-clock')
  );
});
```

---

## 🎚 COMPONENT 2: Cardinal Pressure Gauges

### Visual Specifications

```
┌─────────────────────────────────┐
│    ╔═══════════════════════╗    │ ← Mahogany case
│    ║    ┌───────────┐      ║    │
│    ║   ╱             ╲     ║    │ ← Glass dome effect
│    ║  │   [  /  ]    │    ║    │ ← Needle position
│    ║  │  118         │    ║    │ ← Value display
│    ║   ╲             ╱     ║    │
│    ║    └───────────┘      ║    │
│    ╚═══════════════════════╝    │
│    ┌───────────────────────┐    │
│    │  FLEET IN SERVICE     │    │ ← Brass nameplate
│    └───────────────────────┘    │
└─────────────────────────────────┘
```

### Complete CSS Implementation

```css
/* ═══════════════════════════════════════ */
/*    CARDINAL GAUGE - FULL SPECIFICATION */
/* ═══════════════════════════════════════ */

.cardinal-gauge {
  /* Positioning */
  position: absolute;
  width: 180px;
  height: 220px; /* Includes label */
  
  /* Cardinal direction positioning */
  &[data-direction="north"] {
    left: 50%;
    top: calc(50% - var(--center-offset, 150px) - 320px);
    transform: translateX(-50%);
  }
  
  &[data-direction="east"] {
    left: calc(50% + var(--center-offset, 150px) + 320px);
    top: 50%;
    transform: translateY(-50%);
  }
  
  &[data-direction="south"] {
    left: 50%;
    top: calc(50% + var(--center-offset, 150px) + 320px);
    transform: translateX(-50%);
  }
  
  &[data-direction="west"] {
    left: calc(50% - var(--center-offset, 150px) - 320px);
    top: 50%;
    transform: translateY(-50%);
  }
  
  /* Z-index */
  z-index: var(--z-inner-ring);
  
  /* Hover effect */
  transition: all 0.3s var(--timing-precision);
  
  &:hover {
    transform: 
      translateX(var(--hover-x, -50%)) 
      translateY(var(--hover-y, 0)) 
      scale(1.05);
    z-index: calc(var(--z-inner-ring) + 10);
  }
  
  &[data-direction="north"]:hover { --hover-y: -8px; }
  &[data-direction="south"]:hover { --hover-y: 8px; }
  &[data-direction="east"]:hover { --hover-x: 8px; }
  &[data-direction="west"]:hover { --hover-x: -8px; }
}

/* Gauge Dial Container */
.gauge-dial {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  
  /* Mahogany case background */
  background: 
    radial-gradient(
      circle at 35% 35%,
      #3E2723 0%,
      #321F1B 50%,
      #2C1810 100%
    );
  
  /* Brass rim */
  border: 6px solid #704214;
  
  /* Layered depth */
  box-shadow: 
    /* Outer brass highlight */
    0 0 0 2px #B8860B,
    /* Main shadow */
    0 8px 24px rgba(0,0,0,0.4),
    0 4px 12px rgba(0,0,0,0.3),
    /* Inner depth */
    inset 0 0 30px rgba(0,0,0,0.5),
    inset 0 4px 8px rgba(0,0,0,0.3);
  
  /* Interaction */
  cursor: pointer;
  user-select: none;
}

/* Glass Dome Effect */
.gauge-dial::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  background: 
    radial-gradient(
      circle at 30% 30%,
      rgba(255,255,255,0.15) 0%,
      rgba(255,255,255,0.05) 50%,
      transparent 100%
    );
  pointer-events: none;
  z-index: 8;
}

/* Gauge Markings */
.gauge-markings {
  position: absolute;
  inset: 15px;
  border-radius: 50%;
  background: conic-gradient(
    from 135deg,
    transparent 0deg,
    #B8860B 0deg 2deg,
    transparent 2deg 22.5deg,
    #8B6914 22.5deg 24deg,
    transparent 24deg 45deg,
    #B8860B 45deg 47deg,
    transparent 47deg 67.5deg,
    #8B6914 67.5deg 69deg,
    transparent 69deg 90deg,
    #B8860B 90deg 92deg,
    transparent 92deg 112.5deg,
    #8B6914 112.5deg 114deg,
    transparent 114deg 135deg,
    #B8860B 135deg 137deg,
    transparent 137deg 157.5deg,
    #8B6914 157.5deg 159deg,
    transparent 159deg 180deg,
    #B8860B 180deg 182deg,
    transparent 182deg
  );
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}

/* Range Zones (Green/Amber/Red) */
.gauge-zone-overlay {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: conic-gradient(
    from 135deg,
    rgba(45, 106, 79, 0.2) 0deg 120deg,      /* Green zone */
    rgba(202, 103, 2, 0.2) 120deg 150deg,    /* Amber zone */
    rgba(155, 34, 38, 0.2) 150deg 180deg     /* Red zone */
  );
  pointer-events: none;
  z-index: 2;
}

/* Needle */
.gauge-needle {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 4px;
  height: 60px;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(var(--needle-angle, 0deg));
  z-index: 5;
  
  /* Needle appearance */
  background: linear-gradient(
    to top,
    #8B0000 0%,
    #CD5C5C 50%,
    #FFA07A 100%
  );
  border-radius: 2px;
  
  /* Shadow for depth */
  box-shadow: 
    0 0 8px rgba(139, 0, 0, 0.6),
    2px 0 4px rgba(0,0,0,0.3);
  
  /* Smooth animation */
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Arrow head */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid #8B0000;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
  
  /* Balance weight at bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: #363636;
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.2);
  }
}

/* Ghost Needle (previous value) */
.gauge-needle-ghost {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 4px;
  height: 60px;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(var(--previous-angle, 0deg));
  z-index: 4;
  
  background: rgba(139, 0, 0, 0.3);
  border-radius: 2px;
  pointer-events: none;
  
  animation: ghost-fade 2s ease-out forwards;
}

@keyframes ghost-fade {
  0% { opacity: 0.5; }
  100% { opacity: 0; }
}

/* Center Rivet */
.gauge-center-rivet {
  position: absolute;
  bottom: calc(50% - 12px);
  left: calc(50% - 12px);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  /* Brass rivet */
  background: radial-gradient(
    circle at 30% 30%,
    #D4AF37 0%,
    #B8860B 50%,
    #704214 100%
  );
  
  border: 2px solid #363636;
  
  box-shadow: 
    0 2px 6px rgba(0,0,0,0.5),
    inset 0 1px 2px rgba(255,255,255,0.3),
    inset 0 -1px 2px rgba(0,0,0,0.3);
  
  z-index: 10;
  
  /* Rivet screw slots */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 2px;
    background: rgba(0,0,0,0.4);
    box-shadow: 0 1px 0 rgba(255,255,255,0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    width: 12px;
    height: 2px;
    background: rgba(0,0,0,0.4);
    box-shadow: 0 1px 0 rgba(255,255,255,0.2);
  }
}

/* Value Display */
.gauge-value {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  
  font-family: var(--font-numbers);
  font-size: 32px;
  font-weight: 700;
  color: #D4AF37;
  letter-spacing: 0.05em;
  
  text-shadow: 
    0 0 8px rgba(212, 175, 55, 0.6),
    0 0 16px rgba(212, 175, 55, 0.4),
    2px 2px 4px rgba(0,0,0,0.5);
  
  /* Subtle glow animation */
  animation: value-glow 2s ease-in-out infinite;
  z-index: 6;
}

@keyframes value-glow {
  0%, 100% { 
    text-shadow: 
      0 0 8px rgba(212, 175, 55, 0.6),
      2px 2px 4px rgba(0,0,0,0.5);
  }
  50% { 
    text-shadow: 
      0 0 12px rgba(212, 175, 55, 0.8),
      0 0 20px rgba(212, 175, 55, 0.4),
      2px 2px 4px rgba(0,0,0,0.5);
  }
}

/* Unit Label (small, top) */
.gauge-unit {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 600;
  color: #8B6914;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  
  z-index: 6;
}

/* Maximum Value (small, arc position) */
.gauge-max {
  position: absolute;
  top: 40px;
  right: 25px;
  
  font-family: var(--font-body);
  font-size: 10px;
  color: rgba(184, 134, 11, 0.6);
  
  z-index: 6;
}

/* Brass Nameplate Label */
.gauge-label {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  
  /* Brass plate styling */
  background: linear-gradient(
    135deg,
    #D4AF37 0%,
    #B8860B 50%,
    #8B6914 100%
  );
  
  border: 2px solid #704214;
  border-radius: 2px;
  padding: 6px 16px;
  
  /* Text */
  font-family: var(--font-labels);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1A1A1A;
  white-space: nowrap;
  
  text-shadow: 0 1px 0 rgba(255,255,255,0.3);
  
  /* Depth */
  box-shadow: 
    0 2px 6px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.3),
    inset 0 -1px 0 rgba(0,0,0,0.2);
  
  /* Engraved line */
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 1px;
  }
}

/* Trend Indicator (appears on hover) */
.gauge-trend {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  opacity: 0;
  
  display: flex;
  align-items: center;
  gap: 4px;
  
  background: rgba(0,0,0,0.8);
  border: 1px solid #B8860B;
  border-radius: 4px;
  padding: 4px 8px;
  
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--parchment-white);
  
  transition: all 0.3s var(--timing-precision);
  z-index: 15;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(0,0,0,0.8);
  }
}

.cardinal-gauge:hover .gauge-trend {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

.gauge-trend-icon {
  font-size: 12px;
  
  &[data-direction="up"] { color: #52B788; }
  &[data-direction="down"] { color: #CD5C5C; }
  &[data-direction="stable"] { color: #B8860B; }
}
```

### HTML Structure

```html
<div 
  class="cardinal-gauge" 
  data-direction="north"
  role="img"
  aria-label="Fleet gauge: 118 of 127 vehicles active"
  tabindex="0"
>
  <!-- Gauge Dial -->
  <div class="gauge-dial">
    <!-- Markings -->
    <div class="gauge-markings" aria-hidden="true"></div>
    
    <!-- Zone overlay -->
    <div class="gauge-zone-overlay" aria-hidden="true"></div>
    
    <!-- Unit label -->
    <div class="gauge-unit">FLEET</div>
    
    <!-- Max value -->
    <div class="gauge-max">127</div>
    
    <!-- Needle -->
    <div 
      class="gauge-needle" 
      style="--needle-angle: 147deg;"
      aria-hidden="true"
    ></div>
    
    <!-- Ghost needle (if value changed) -->
    <div 
      class="gauge-needle-ghost" 
      style="--previous-angle: 140deg;"
      aria-hidden="true"
    ></div>
    
    <!-- Center rivet -->
    <div class="gauge-center-rivet" aria-hidden="true"></div>
    
    <!-- Value display -->
    <div class="gauge-value">118</div>
    
    <!-- Trend indicator (shown on hover) -->
    <div class="gauge-trend">
      <span class="gauge-trend-icon" data-direction="up">↑</span>
      <span>+5 from yesterday</span>
    </div>
  </div>
  
  <!-- Brass nameplate label -->
  <div class="gauge-label">
    FLEET IN SERVICE
  </div>
  
  <!-- Screen reader details -->
  <div class="sr-only">
    Current: 118 vehicles active.
    Maximum: 127 vehicles.
    Percentage: 93%.
    Trend: Up 5 from yesterday.
  </div>
</div>
```

### JavaScript Behavior

```javascript
class CardinalGauge {
  constructor(element) {
    this.gauge = element;
    this.needle = element.querySelector('.gauge-needle');
    this.valueDisplay = element.querySelector('.gauge-value');
    this.ghostNeedle = element.querySelector('.gauge-needle-ghost');
    this.trendIndicator = element.querySelector('.gauge-trend');
    
    // Gauge configuration
    this.minValue = 0;
    this.maxValue = parseInt(element.querySelector('.gauge-max').textContent);
    this.minAngle = 135; // degrees (bottom-left)
    this.maxAngle = 405; // degrees (bottom-right, 270deg arc)
    
    this.currentValue = parseInt(this.valueDisplay.textContent);
    this.previousValue = this.currentValue;
  }
  
  updateValue(newValue, animate = true) {
    // Store previous for ghost needle
    this.previousValue = this.currentValue;
    this.currentValue = newValue;
    
    // Calculate needle angle
    const percentage = (newValue - this.minValue) / (this.maxValue - this.minValue);
    const angleRange = this.maxAngle - this.minAngle;
    const targetAngle = this.minAngle + (percentage * angleRange);
    
    if (animate) {
      // Show ghost needle
      if (this.ghostNeedle) {
        const previousAngle = this.minAngle + 
          ((this.previousValue - this.minValue) / (this.maxValue - this.minValue)) * angleRange;
        this.ghostNeedle.style.setProperty('--previous-angle', `${previousAngle}deg`);
        this.ghostNeedle.style.display = 'block';
        
        // Hide ghost after animation
        setTimeout(() => {
          this.ghostNeedle.style.display = 'none';
        }, 2000);
      }
      
      // Animate needle
      this.needle.style.setProperty('--needle-angle', `${targetAngle}deg`);
      
      // Animate value count-up
      this.animateValue(this.previousValue, newValue);
    } else {
      this.needle.style.setProperty('--needle-angle', `${targetAngle}deg`);
      this.valueDisplay.textContent = newValue;
    }
    
    // Update trend
    this.updateTrend();
  }
  
  animateValue(start, end) {
    const duration = 600; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.round(start + (end - start) * easeProgress);
      this.valueDisplay.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  updateTrend() {
    const diff = this.currentValue - this.previousValue;
    const trendIcon = this.trendIndicator?.querySelector('.gauge-trend-icon');
    const trendText = this.trendIndicator?.querySelector('span:last-child');
    
    if (!trendIcon || !trendText) return;
    
    if (diff > 0) {
      trendIcon.textContent = '↑';
      trendIcon.dataset.direction = 'up';
      trendText.textContent = `+${diff} from previous`;
    } else if (diff < 0) {
      trendIcon.textContent = '↓';
      trendIcon.dataset.direction = 'down';
      trendText.textContent = `${diff} from previous`;
    } else {
      trendIcon.textContent = '→';
      trendIcon.dataset.direction = 'stable';
      trendText.textContent = 'No change';
    }
  }
  
  getValue() {
    return this.currentValue;
  }
}

// Initialize all gauges
document.addEventListener('DOMContentLoaded', () => {
  const gauges = {};
  
  document.querySelectorAll('.cardinal-gauge').forEach(el => {
    const direction = el.dataset.direction;
    gauges[direction] = new CardinalGauge(el);
  });
  
  // Example: Update a gauge
  // gauges.north.updateValue(122);
});
```

---

## 🎡 COMPONENT 3: Rotating Information Panel

### Visual Structure

```
┌───────────────────────────────────────┐
│  ⚙ FLEET OPERATIONAL MANIFEST        │ ← Header with icon
├───────────────────────────────────────┤
│                                       │
│  Active Vehicles: 118                 │
│  Depot Distribution:                  │
│    • Swargate: 42                     │
│    • Nigdi: 38                        │
│    • Bhosari: 25                      │
│    • Katraj: 13                       │
│                                       │
│  Current Status: All operational      │
│  Last Updated: 14:31                  │
│                                       │
└───────────────────────────────────────┘
```

### CSS Implementation

```css
/* ═══════════════════════════════════════ */
/*      ROTATING INFORMATION PANEL        */
/* ═══════════════════════════════════════ */

.information-pavilion {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 1200px;
  pointer-events: none;
  z-index: var(--z-middle-ring);
}

.info-panel {
  position: absolute;
  width: 320px;
  min-height: 240px;
  left: 50%;
  top: 50%;
  pointer-events: all;
  
  /* Orbital positioning */
  transform-origin: 50% 50%;
  transform: 
    translate(-50%, -50%)
    rotate(var(--orbit-angle, 0deg))
    translateY(calc(-1 * var(--middle-ring-radius, 450px)))
    rotate(calc(-1 * var(--orbit-angle, 0deg)));
  
  /* Mahogany panel styling */
  background: var(--aged-cream);
  border: 6px solid #704214;
  border-radius: 8px;
  padding: 20px;
  
  /* Layered depth */
  box-shadow: 
    0 0 0 2px #8B6914,
    0 12px 32px rgba(0,0,0,0.4),
    0 6px 16px rgba(0,0,0,0.3),
    inset 0 0 0 1px rgba(184, 134, 11, 0.3),
    inset 0 2px 4px rgba(255,255,255,0.2);
  
  /* Paper texture */
  background-image: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence baseFrequency="0.9" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
  background-blend-mode: multiply;
  
  /* Smooth transition */
  transition: 
    transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.6s ease,
    scale 0.6s ease;
  
  /* Visibility states */
  opacity: var(--panel-opacity, 1);
  scale: var(--panel-scale, 1);
  z-index: var(--panel-z-index, 100);
}

/* Position states */
.info-panel[data-position="front"] {
  --orbit-angle: 0deg;
  --panel-opacity: 1;
  --panel-scale: 1;
  --panel-z-index: 100;
}

.info-panel[data-position="right"] {
  --orbit-angle: 90deg;
  --panel-opacity: 0.3;
  --panel-scale: 0.7;
  --panel-z-index: 50;
  filter: blur(1px);
}

.info-panel[data-position="back"] {
  --orbit-angle: 180deg;
  --panel-opacity: 0;
  --panel-scale: 0.5;
  --panel-z-index: 1;
  pointer-events: none;
}

.info-panel[data-position="left"] {
  --orbit-angle: 270deg;
  --panel-opacity: 0.3;
  --panel-scale: 0.7;
  --panel-z-index: 50;
  filter: blur(1px);
}

/* Panel Header */
.panel-header {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass-accent);
  
  border-bottom: 2px solid #8B6914;
  padding-bottom: 8px;
  margin-bottom: 16px;
  
  display: flex;
  align-items: center;
  gap: 8px;
  
  /* Brass rivet decoration */
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    background: radial-gradient(
      circle at 30% 30%,
      #B8860B 0%,
      #8B6914 100%
    );
    border: 2px solid #704214;
    border-radius: 50%;
    box-shadow: 
      inset 0 1px 2px rgba(255,255,255,0.3),
      0 2px 4px rgba(0,0,0,0.3);
  }
}

/* Panel Content */
.panel-content {
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-black);
}

.panel-content h4 {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--government-seal);
  margin: 12px 0 8px;
}

.panel-content ul {
  list-style: none;
  padding-left: 0;
  margin: 8px 0;
}

.panel-content li {
  padding-left: 20px;
  position: relative;
  margin: 4px 0;
}

.panel-content li::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: var(--brass-accent);
  font-weight: bold;
}

.panel-content strong {
  font-weight: 700;
  color: var(--railway-blue);
}

/* Panel Footer (timestamp) */
.panel-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(139, 105, 20, 0.3);
  
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--steel-brushed);
  text-align: right;
  font-style: italic;
}

/* Panel Navigation Dots */
.panel-nav-dots {
  position: absolute;
  bottom: -48px;
  left: 50%;
  transform: translateX(-50%);
  
  display: flex;
  gap: 8px;
  z-index: 200;
}

.panel-nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(184, 134, 11, 0.3);
  border: 2px solid #704214;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(184, 134, 11, 0.6);
    transform: scale(1.2);
  }
  
  &.active {
    background: #B8860B;
    box-shadow: 0 0 8px rgba(184, 134, 11, 0.6);
  }
}
```

This is the first part of the enhanced implementation guide. Would you like me to continue with the remaining components (Navigation Compass, Status Telegraph, and additional utilities)?

---

**TransitPulse Enhanced Vintage Classic v1.0**  
*Component Library — Part 1 of 3*  
*Precision Engineering for Heritage Interfaces*
