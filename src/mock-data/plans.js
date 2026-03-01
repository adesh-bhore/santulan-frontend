export const plansData = [
  {
    planId: 4,
    version: 'v4',
    status: 'ACTIVE',
    createdAt: '2026-01-29T18:20:00Z',
    activatedAt: '2026-01-30T02:35:00Z',
    priorityMode: 'balanced',
    runtimeSeconds: 84,
    summary: {
      vehiclesNeeded: 118,
      driversNeeded: 106,
      fuelCostDaily: 45200,
      co2EmissionKg: 1650,
    },
  },
  {
    planId: 3,
    version: 'v3',
    status: 'ARCHIVED',
    createdAt: '2026-01-28T14:15:00Z',
    activatedAt: '2026-01-29T02:30:00Z',
    priorityMode: 'cost-focused',
    runtimeSeconds: 92,
    summary: {
      vehiclesNeeded: 120,
      driversNeeded: 108,
      fuelCostDaily: 46100,
      co2EmissionKg: 1680,
    },
  },
  {
    planId: 2,
    version: 'v2',
    status: 'ARCHIVED',
    createdAt: '2026-01-27T16:45:00Z',
    activatedAt: '2026-01-28T02:30:00Z',
    priorityMode: 'balanced',
    runtimeSeconds: 78,
    summary: {
      vehiclesNeeded: 119,
      driversNeeded: 107,
      fuelCostDaily: 45800,
      co2EmissionKg: 1665,
    },
  },
];

export const optimizationConfig = {
  priorityStrategy: 'balanced', // 'balanced' | 'cost-focused' | 'hours-balanced'
  constraints: {
    maxDriverHours: 8.0,
    minBreakDuration: 30,
    allowOvertime: false,
  },
};
