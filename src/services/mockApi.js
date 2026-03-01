import { dashboardData, gaugeData } from '@mock-data/dashboard';
import { plansData } from '@mock-data/plans';
import { depotsData } from '@mock-data/depots';
import { activitiesData } from '@mock-data/activities';

// Simulated API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Dashboard Data
  getDashboardSummary: async () => {
    await delay(300);
    return {
      success: true,
      data: dashboardData,
    };
  },

  getGaugeData: async () => {
    await delay(200);
    return {
      success: true,
      data: gaugeData,
    };
  },

  // File Upload Simulation
  uploadFile: async (fileType, file) => {
    await delay(1500); // Simulate upload time

    const recordCounts = {
      routes: 125,
      vehicles: 127,
      drivers: 145,
      depots: 4,
      stops: 450,
      timetable: 450,
    };

    return {
      success: true,
      fileType,
      recordsCount: recordCounts[fileType],
      uploadedAt: new Date().toISOString(),
      message: `${recordCounts[fileType]} ${fileType} loaded successfully`,
    };
  },

  // Upload Data (alias for uploadFile, matches API service naming)
  uploadData: async (type, file) => {
    await delay(1500); // Simulate upload time

    const recordCounts = {
      routes: 125,
      vehicles: 127,
      drivers: 145,
      depots: 4,
      stops: 450,
      timetable: 450,
    };

    return {
      type: type,
      records_inserted: recordCounts[type] || 100,
      errors: [],
      warnings: [`Mock upload: ${file.name} processed successfully`],
    };
  },

  // Data Status
  getDataStatus: async () => {
    await delay(200);
    return {
      success: true,
      dataStatus: {
        routes: { count: 125, lastUpdated: '2026-01-30T22:45:00Z', status: 'valid' },
        vehicles: { count: 127, lastUpdated: '2026-01-30T22:45:00Z', status: 'valid' },
        drivers: { count: 145, lastUpdated: '2026-01-30T22:45:00Z', status: 'valid' },
        depots: { count: 4, lastUpdated: '2026-01-30T22:45:00Z', status: 'valid' },
        timetable: { count: 450, lastUpdated: '2026-01-30T22:45:00Z', status: 'valid' },
      },
      validation: {
        allValid: true,
        errors: [],
      },
      readyForOptimization: true,
    };
  },

  // Optimization Simulation
  runOptimization: async (config) => {
    await delay(500);
    return {
      success: true,
      jobId: `opt_${Date.now()}`,
      message: 'Optimization started',
      estimatedTimeSeconds: 120,
    };
  },

  getOptimizationStatus: async (jobId) => {
    await delay(200);
    // Simulate progress
    const progress = Math.min(100, Math.floor(Math.random() * 100));

    if (progress < 100) {
      return {
        success: true,
        jobId,
        status: 'running',
        progress,
        currentStep: 'Building time-space network',
        elapsedSeconds: 45,
        estimatedRemainingSeconds: 75,
      };
    } else {
      return {
        success: true,
        jobId,
        status: 'completed',
        planId: 5,
        runtimeSeconds: 84,
      };
    }
  },

  getOptimizationResult: async (planId) => {
    await delay(300);
    return {
      success: true,
      plan: {
        planId,
        version: `v${planId}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        priorityMode: 'balanced',
        runtimeSeconds: 84,
      },
      summary: {
        vehiclesNeeded: 115,
        currentVehicles: 118,
        vehiclesSaved: 3,
        driversNeeded: 106,
        currentDrivers: 108,
        driversFreed: 2,
        fuelCostDaily: 42800,
        currentCost: 45200,
        costSaved: 2400,
        co2EmissionKg: 1580,
        currentEmission: 1650,
        emissionSaved: 70,
      },
    };
  },

  // Plans
  getPlans: async () => {
    await delay(300);
    return {
      success: true,
      data: plansData,
    };
  },

  activatePlan: async (planId) => {
    await delay(500);
    return {
      success: true,
      message: `Plan v${planId} activated successfully`,
      activatedAt: new Date().toISOString(),
    };
  },

  // Depots
  getDepots: async () => {
    await delay(200);
    return {
      success: true,
      data: depotsData,
    };
  },

  // Activities
  getActivities: async () => {
    await delay(200);
    return {
      success: true,
      data: activitiesData,
    };
  },

  // Reports
  generateReport: async (reportConfig) => {
    await delay(2000); // Simulate report generation
    return {
      success: true,
      reportId: `report_${Date.now()}`,
      filename: `${reportConfig.type}_${new Date().toISOString().split('T')[0]}.pdf`,
      generatedAt: new Date().toISOString(),
      downloadUrl: '#',
    };
  },

  getRecentReports: async () => {
    await delay(300);
    return {
      success: true,
      data: [
        {
          id: 1,
          filename: 'daily_operations_2026-02-10.pdf',
          type: 'pdf',
          generatedAt: '2026-02-10T08:30:00Z',
          downloadUrl: '#',
        },
        {
          id: 2,
          filename: 'fleet_report_2026-02-09.xlsx',
          type: 'excel',
          generatedAt: '2026-02-09T16:45:00Z',
          downloadUrl: '#',
        },
      ],
    };
  },
};
