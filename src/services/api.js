/**
 * Real API Service Layer
 * Replace mockApi with this when backend is ready
 */

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://51.21.226.149:8000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'; // Toggle for development

// Import mock API as fallback
import { mockApi } from './mockApi';

/**
 * HTTP Client with error handling and retry logic
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Set timeout based on endpoint (optimization needs longer timeout)
    const isOptimization = endpoint.includes('/optimization/optimize');
    const timeoutMs = isOptimization ? 620000 : 30000; // 10min 20s for optimization, 30s for others
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - optimization is taking longer than expected. Please try again or contact support.');
        }
        if (attempt === this.retryAttempts) {
          console.error(`API request failed after ${attempt} attempts:`, error);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
      }
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const client = new ApiClient(API_BASE_URL);

/**
 * Real API Service
 * Maps to backend endpoints defined in TRANSITPULSE_API_SPEC.md
 */
export const api = {
  // ==================== DASHBOARD ====================
  
  /**
   * Get dashboard summary with live metrics
   * @returns {Promise<Object>} Dashboard data
   */
  getDashboardSummary: async () => {
    if (USE_MOCK) return mockApi.getDashboardSummary();
    return client.get('/dashboard/summary');
  },

  /**
   * Get gauge data for RotaryHub
   * @returns {Promise<Object>} Gauge data for all four cardinal directions
   */
  getDashboardGauges: async () => {
    if (USE_MOCK) {
      const { gaugeData } = await import('../mock-data/dashboard');
      return { success: true, gauges: gaugeData };
    }
    return client.get('/dashboard/gauges');
  },

  /**
   * Get depot list with statistics
   * @returns {Promise<Object>} Depot list with vehicle/driver counts
   */
  getDashboardDepots: async () => {
    if (USE_MOCK) {
      const { dashboardData } = await import('../mock-data/dashboard');
      return { success: true, depots: dashboardData.depots, total: dashboardData.depots.length };
    }
    return client.get('/dashboard/depots');
  },

  /**
   * Get live metrics (real-time updates)
   * @returns {Promise<Object>} Live metrics
   */
  getLiveMetrics: async () => {
    // Use dashboard summary for now - /dashboard/live not implemented
    if (USE_MOCK) return mockApi.getDashboardSummary();
    return client.get('/dashboard/summary'); // Use summary instead of live
  },

  // ==================== DEPOTS ====================
  
  /**
   * Get all depots with current status
   * @returns {Promise<Array>} Depot list
   */
  getDepots: async () => {
    if (USE_MOCK) {
      const { mockDepots } = await import('../mock-data/depots');
      return { success: true, depots: mockDepots };
    }
    return client.get('/depots');
  },

  // ==================== ROUTES ====================
  
  /**
   * Get live route monitoring data
   * @returns {Promise<Array>} Route list with status
   */
  getRoutes: async () => {
    // Always use mock data for now - endpoint not implemented
    const { mockRoutes } = await import('../mock-data/routes');
    return { success: true, routes: mockRoutes };
    
    // TODO: Implement backend endpoint
    // if (USE_MOCK) {
    //   const { mockRoutes } = await import('../mock-data/routes');
    //   return { success: true, routes: mockRoutes };
    // }
    // return client.get('/routes/live');
  },

  // ==================== ALERTS ====================
  
  /**
   * Get active critical alerts
   * @returns {Promise<Array>} Alert list
   */
  getAlerts: async () => {
    // Always use mock data for now - endpoint not implemented
    const { mockAlerts } = await import('../mock-data/alerts');
    return { success: true, alerts: mockAlerts };
    
    // TODO: Implement backend endpoint
    // if (USE_MOCK) {
    //   const { mockAlerts } = await import('../mock-data/alerts');
    //   return { success: true, alerts: mockAlerts };
    // }
    // return client.get('/alerts/active');
  },

  /**
   * Dismiss an alert
   * @param {string} alertId - Alert ID
   */
  dismissAlert: async (alertId) => {
    // Always use mock for now - endpoint not implemented
    return { success: true };
    
    // TODO: Implement backend endpoint
    // if (USE_MOCK) return { success: true };
    // return client.post(`/alerts/${alertId}/dismiss`);
  },

  // ==================== ACTIVITIES ====================
  
  /**
   * Get recent activities
   * @param {number} limit - Number of activities to fetch
   * @returns {Promise<Array>} Activity list
   */
  getActivities: async (limit = 10) => {
    // Always use mock data for now - endpoint not implemented
    const { mockActivities } = await import('../mock-data/activities');
    return { success: true, activities: mockActivities.slice(0, limit) };
    
    // TODO: Implement backend endpoint
    // if (USE_MOCK) {
    //   const { mockActivities } = await import('../mock-data/activities');
    //   return { success: true, activities: mockActivities.slice(0, limit) };
    // }
    // return client.get(`/activities?limit=${limit}`);
  },

  // ==================== PLANS ====================
  
  /**
   * Get active plans (all depots)
   * @returns {Promise<Object>} Active plans data
   */
  getActivePlans: async () => {
    if (USE_MOCK) return mockApi.getActivePlan?.() || { active_plans: [], total: 0 };
    return client.get('/plans/active');
  },

  /**
   * Get all plans with optional filtering
   * @param {Object} params - Query parameters
   * @param {string} params.depot_id - Filter by depot ID
   * @param {string} params.status - Filter by status (PENDING, ACTIVE, ARCHIVED)
   * @param {number} params.limit - Maximum results
   * @param {number} params.offset - Results offset
   * @returns {Promise<Object>} Plans list
   */
  getPlans: async (params = {}) => {
    if (USE_MOCK) return mockApi.getAllPlans?.() || { plans: [], total: 0 };
    const queryString = new URLSearchParams(params).toString();
    return client.get(`/plans${queryString ? '?' + queryString : ''}`);
  },

  /**
   * Get plan details with full assignments
   * @param {string} planId - Plan ID (UUID)
   * @returns {Promise<Object>} Plan details with vehicle and driver assignments
   */
  getPlanDetails: async (planId) => {
    if (USE_MOCK) return mockApi.getPlanDetails?.(planId) || {};
    return client.get(`/plans/${planId}`);
  },

  /**
   * Deploy a PENDING plan (activate it)
   * @param {string} planId - Plan ID (UUID)
   * @returns {Promise<Object>} Deployment result
   */
  deployPlan: async (planId) => {
    if (USE_MOCK) return mockApi.activatePlan?.(planId) || { success: true };
    return client.post(`/plans/${planId}/deploy`);
  },

  /**
   * Compare two plans
   * @param {string} planId - Plan ID to compare
   * @param {string} compareToId - Plan ID to compare with (optional, defaults to active plan)
   * @returns {Promise<Object>} Comparison result
   */
  comparePlans: async (planId, compareToId = null) => {
    if (USE_MOCK) return { plan_a: {}, plan_b: {}, differences: {} };
    const queryString = compareToId ? `?compare_to_id=${compareToId}` : '';
    return client.get(`/plans/${planId}/compare${queryString}`);
  },

  // ==================== DATA UPLOAD ====================
  
  /**
   * Upload CSV file
   * @param {string} type - File type (routes, vehicles, drivers, depots, timetable, stops)
   * @param {File} file - CSV file
   * @returns {Promise<Object>} Upload result with records_inserted, errors, warnings
   */
  uploadData: async (type, file) => {
    if (USE_MOCK) return mockApi.uploadData(type, file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/data/upload/${type}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail?.message || errorData.message || 'Upload failed';
      const errorDetails = errorData.detail?.details || {};
      
      throw {
        message: errorMessage,
        errors: errorDetails.errors || [],
        warnings: errorDetails.warnings || [],
        status: response.status
      };
    }
    
    return response.json();
  },

  /**
   * Get data status
   * @returns {Promise<Object>} Data status for all types
   */
  getDataStatus: async () => {
    if (USE_MOCK) return mockApi.getDataStatus();
    return client.get('/data/status');
  },

  // ==================== OPTIMIZATION ====================
  
  /**
   * Get available depots for optimization
   * @returns {Promise<Object>} Depot list
   */
  getOptimizationDepots: async () => {
    if (USE_MOCK) {
      const { mockDepots } = await import('../mock-data/depots');
      return { depots: mockDepots };
    }
    // Use /data/depots endpoint since there's no specific optimization/depots endpoint
    const response = await client.get('/data/depots');
    return { depots: response.depots || [] };
  },

  /**
   * Run optimization for a specific depot
   * @param {Object} request - Optimization request
   * @param {string} request.depot_id - Depot ID
   * @param {string} request.day_type - Day type (weekday/weekend)
   * @param {Object} request.objective_weights - Objective weights
   * @returns {Promise<Object>} Optimization result with plan_id and metrics
   */
  runOptimization: async (request) => {
    if (USE_MOCK) return mockApi.runOptimization(request);
    
    try {
      // The backend endpoint is POST /api/optimization/optimize
      // Since API_BASE_URL is http://localhost:8000/api, we call /optimization/optimize
      const result = await client.post('/optimization/optimize', request);
      return result;
    } catch (error) {
      console.error('Optimization API Error:', error);
      console.error('Request was:', request);
      console.error('Full URL would be:', `${API_BASE_URL}/optimization/optimize`);
      throw error;
    }
  },

  /**
   * Run optimization (legacy - kept for compatibility)
   * @param {Object} config - Optimization configuration
   * @returns {Promise<Object>} Job ID and status
   */
  runOptimizationLegacy: async (config) => {
    if (USE_MOCK) return mockApi.runOptimization(config);
    return client.post('/optimization/run', config);
  },

  /**
   * Check optimization status
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Job status
   */
  getOptimizationStatus: async (jobId) => {
    if (USE_MOCK) return mockApi.getOptimizationStatus(jobId);
    return client.get(`/optimization/status/${jobId}`);
  },

  /**
   * Get optimization result
   * @param {number} planId - Plan ID
   * @returns {Promise<Object>} Optimization result
   */
  getOptimizationResult: async (planId) => {
    if (USE_MOCK) return mockApi.getOptimizationResult(planId);
    return client.get(`/optimization/result/${planId}`);
  },

  // ==================== REPORTS ====================
  
  /**
   * Generate report
   * @param {Object} request - Report request
   * @param {string} request.report_type - Report type (daily_operations, monthly_fleet, etc.)
   * @param {string} request.start_date - Start date (YYYY-MM-DD)
   * @param {string} request.end_date - End date (YYYY-MM-DD)
   * @param {string} request.depot_id - Optional depot filter
   * @param {string} request.format - Output format (pdf, excel, both)
   * @param {boolean} request.include_charts - Include charts
   * @param {boolean} request.include_summary - Include summary
   * @returns {Promise<Object>} Report response with files
   */
  generateReport: async (request) => {
    if (USE_MOCK) return mockApi.generateReport?.(request) || { success: true, report_id: 'mock_123' };
    return client.post('/reports/generate', request);
  },

  /**
   * Get list of recent reports
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Maximum results (default: 20)
   * @param {number} params.offset - Results offset (default: 0)
   * @param {string} params.depot_id - Optional depot filter
   * @returns {Promise<Object>} Reports list with pagination
   */
  getReportsList: async (params = {}) => {
    if (USE_MOCK) return mockApi.getRecentReports?.() || { success: true, reports: [], total: 0 };
    const queryString = new URLSearchParams(params).toString();
    return client.get(`/reports/list${queryString ? '?' + queryString : ''}`);
  },

  /**
   * Download a report file
   * @param {string} reportId - Report ID
   * @returns {Promise<Blob>} Report file
   */
  downloadReport: async (reportId) => {
    if (USE_MOCK) {
      throw new Error('Report download not available in mock mode');
    }
    const url = `${API_BASE_URL}/reports/download/${reportId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to download report');
    }
    return response.blob();
  }
};

// Export for easy switching between mock and real API
export default api;
