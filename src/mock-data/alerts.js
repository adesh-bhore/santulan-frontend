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
  {
    id: 2,
    severity: 'warning',
    icon: '⚠️',
    message: 'Depot 2 (Nigdi) fuel level 15% — Refill required',
    details: 'Status: Tanker scheduled 15:00 → Estimated arrival in 45 minutes',
    actions: [
      { label: 'VIEW DETAILS', type: 'action' },
      { label: 'DISMISS', type: 'dismiss' }
    ]
  },
  {
    id: 3,
    severity: 'info',
    icon: '🟡',
    message: 'Driver D-0234 approaching 7.5 hrs duty time',
    details: 'Action: Relief driver dispatching from Swargate depot',
    actions: [
      { label: 'TRACK', type: 'action' },
      { label: 'DISMISS', type: 'dismiss' }
    ]
  }
];
