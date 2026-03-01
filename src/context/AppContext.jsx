import { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  // Active Plan Data
  activePlan: {
    planId: 4,
    version: 'v4',
    status: 'ACTIVE',
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

  // System Status
  systemStatus: {
    status: 'OPERATIONAL', // 'OPERATIONAL' | 'WARNING' | 'CRITICAL'
    lastUpdated: new Date(),
  },

  // Navigation State
  navigation: {
    currentMode: 'hub', // 'hub' | 'page'
    currentPage: null, // 'home' | 'data' | 'optimize' | 'reports' | 'settings'
    previousPage: null,
  },

  // Depot Data
  depots: [
    { id: 'DEP01', name: 'Swargate', vehicles: 42, drivers: 38 },
    { id: 'DEP02', name: 'Nigdi', vehicles: 38, drivers: 34 },
    { id: 'DEP03', name: 'Bhosari', vehicles: 25, drivers: 22 },
    { id: 'DEP04', name: 'Katraj', vehicles: 13, drivers: 12 },
  ],

  // Activity Log
  activities: [
    { timestamp: '14:25', description: 'Vehicle MH-12-5847 completed Route 401' },
    { timestamp: '14:18', description: 'Driver D-0234 started shift at Swargate' },
    { timestamp: '14:10', description: 'Plan v4 status check: All nominal' },
    { timestamp: '13:55', description: 'Vehicle MH-12-5912 refueled at Nigdi' },
  ],
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PLAN_METRICS':
      return {
        ...state,
        activePlan: {
          ...state.activePlan,
          metrics: { ...state.activePlan.metrics, ...action.payload },
        },
      };

    case 'UPDATE_SYSTEM_STATUS':
      return {
        ...state,
        systemStatus: { ...action.payload, lastUpdated: new Date() },
      };

    case 'SET_NAVIGATION':
      return {
        ...state,
        navigation: { ...state.navigation, ...action.payload },
      };

    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities].slice(0, 10),
      };

    case 'UPDATE_DEPOTS':
      return {
        ...state,
        depots: action.payload,
      };

    case 'ACTIVATE_PLAN':
      return {
        ...state,
        activePlan: action.payload,
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
