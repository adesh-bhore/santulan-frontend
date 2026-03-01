export const dashboardData = {
  activePlan: {
    version: 'v4',
    status: 'OPERATIONAL',
    activatedAt: '2026-01-30T02:35:00Z',
    metrics: {
      vehiclesActive: 118,
      vehiclesTotal: 127,
      driversOnDuty: 106,
      driversTotal: 145,
      tripsCovered: 450,
      tripsTotal: 450,
    },
  },
  fleetOverview: {
    metrics: [
      {
        id: 'buses-active',
        value: 118,
        total: 127,
        label: 'BUSES ACTIVE',
        sublabel: 'of 127 total',
        gaugePercent: 93,
        trend: { direction: 'up', value: '+5' }
      },
      {
        id: 'drivers-duty',
        value: 106,
        total: 145,
        label: 'DRIVERS DUTY',
        sublabel: 'of 145 total',
        gaugePercent: 73,
        trend: { direction: 'down', value: '-2' }
      },
      {
        id: 'trips-covered',
        value: 450,
        total: 450,
        label: 'TRIPS COVERED',
        sublabel: 'of 450 total',
        gaugePercent: 100,
        trend: { direction: 'stable', value: '0' }
      },
      {
        id: 'fleet-util',
        value: '93%',
        label: 'FLEET UTIL',
        sublabel: 'Target 90%',
        gaugePercent: 93,
        trend: { direction: 'up', value: '+3%' }
      },
      {
        id: 'fuel-effic',
        value: '87%',
        label: 'FUEL EFFIC',
        sublabel: 'Target 85%',
        gaugePercent: 87,
        trend: { direction: 'up', value: '+2%' }
      },
      {
        id: 'avg-kmpl',
        value: '15.2',
        label: 'AVG KMPL',
        sublabel: 'vs 14.8 plan',
        gaugePercent: 85,
        trend: { direction: 'up', value: '+0.4' }
      }
    ],
    statusBreakdown: [
      { icon: '⦿', label: 'On Route', count: 105, status: 'active' },
      { icon: '⏸', label: 'At Depot', count: 13, status: 'idle' },
      { icon: '⚙', label: 'Workshop', count: 9, status: 'maintenance' },
      { icon: '⏰', label: 'On Schedule', count: 98, status: 'active' },
      { icon: '⚠️', label: 'Delayed', count: 7, status: 'delayed' },
      { icon: '🔴', label: 'Breakdown', count: 0, status: 'active' }
    ]
  },
  todaysSummary: {
    tripsCompleted: 287,
    tripsTotal: 450,
    onTimePercent: 94,
    fuelConsumed: '1,847',
    revenue: '42.3',
    breakdowns: 0,
    delayedBuses: 7
  },
  depots: [
    { name: 'Swargate Depot', vehicles: 42, drivers: 38 },
    { name: 'Nigdi Depot', vehicles: 38, drivers: 34 },
    { name: 'Bhosari Depot', vehicles: 25, drivers: 22 },
    { name: 'Katraj Depot', vehicles: 13, drivers: 12 },
  ],
  activities: [
    { timestamp: '14:32', description: 'Bus 5847 completed 401' },
    { timestamp: '14:25', description: 'Driver D234 shift start' },
    { timestamp: '14:18', description: 'Route 205 on schedule' },
    { timestamp: '14:10', description: 'Fuel delivery at Nigdi' },
    { timestamp: '13:55', description: 'Bus 5912 refueled' },
    { timestamp: '13:42', description: 'Route 203 completed' },
    { timestamp: '13:30', description: 'Driver D156 break start' },
    { timestamp: '13:15', description: 'Bus 6234 maintenance done' },
  ],
};

export const gaugeData = {
  north: {
    label: 'FLEET IN SERVICE',
    unit: 'VEHICLES',
    value: 118,
    maxValue: 127,
    previousValue: 115,
    trend: { direction: 'up', change: 3 },
  },
  east: {
    label: 'DRIVERS ON DUTY',
    unit: 'DRIVERS',
    value: 106,
    maxValue: 145,
    previousValue: 108,
    trend: { direction: 'down', change: 2 },
  },
  south: {
    label: 'TRIPS COVERED',
    unit: 'TRIPS',
    value: 450,
    maxValue: 450,
    previousValue: 448,
    trend: { direction: 'up', change: 2 },
  },
  west: {
    label: 'ON-TIME PERFORMANCE',
    unit: 'PERCENT',
    value: 94.2,
    maxValue: 100,
    previousValue: 93.8,
    trend: { direction: 'up', change: 0.4 },
  },
};

// Export as mockDashboard for consistency
export const mockDashboard = dashboardData;
