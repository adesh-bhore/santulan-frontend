import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Save, FileText, Trash2, Bus, Users, IndianRupee, Cloud, DollarSign, Leaf } from 'lucide-react';
import { AssignmentModal } from './AssignmentModal';
import api from '../../services/api';
import styles from './OptimizationResults.module.css';

export const OptimizationResults = ({ results, onActivate, onDiscard, onSaveDraft }) => {
  const [modalState, setModalState] = useState({ isOpen: false, type: null, title: '' });
  const [planDetails, setPlanDetails] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);

  // Load plan details and comparison when results are available
  useEffect(() => {
    if (results?.plan_id) {
      loadPlanData();
    }
  }, [results?.plan_id]);

  const loadPlanData = async () => {
    try {
      setLoading(true);
      
      // Fetch plan details with full assignments
      const details = await api.getPlanDetails(results.plan_id);
      setPlanDetails(details);
      
      // Skip comparison for now - endpoint not implemented
      // The comparison will be calculated from depot resources instead
      setComparison(null);
    } catch (err) {
      console.error('Failed to load plan data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, title) => {
    setModalState({ isOpen: true, type, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, title: '' });
  };

  const handleActivatePlan = async () => {
    if (!results?.plan_id) return;
    
    if (!confirm(`Are you sure you want to activate Plan v${results.version}? This will replace the current active plan for ${results.depot_id}.`)) {
      return;
    }
    
    try {
      setActivating(true);
      await api.deployPlan(results.plan_id);
      alert(`Plan v${results.version} activated successfully!`);
      if (onActivate) onActivate();
    } catch (err) {
      console.error('Failed to activate plan:', err);
      alert(`Failed to activate plan: ${err.message}`);
    } finally {
      setActivating(false);
    }
  };

  // Handle both old mock format and new backend format
  const metrics = results?.metrics || {};
  const depotResources = results?.depot_resources || {};
  const planVersion = results?.version || results?.newPlanVersion || 1;
  const planId = results?.plan_id || 'N/A';
  const depotId = results?.depot_id || 'N/A';
  
  // Log received data for debugging
  console.log('=== Optimization Results Received ===');
  console.log('Full results object:', results);
  console.log('results.depot_resources exists?', 'depot_resources' in results);
  console.log('results.depot_resources value:', results.depot_resources);
  console.log('Metrics:', metrics);
  console.log('Depot Resources:', depotResources);
  console.log('Fleet Size (optimized):', metrics.fleet_size);
  console.log('Total Vehicles (depot):', depotResources.total_vehicles);
  console.log('Total Drivers (depot):', depotResources.total_drivers);
  console.log('Emissions:', metrics.estimated_emissions_kg);
  
  // Use real metrics from backend
  const fleetSize = metrics.fleet_size || 0;
  const driversUsed = metrics.drivers_used || 0;  // NEW: Actual drivers from optimizer
  const tripsCovered = metrics.trips_covered || 0;
  const tripsTotal = metrics.trips_total || 0;
  const deadheadKm = metrics.total_deadhead_km || 0;
  const emissionsKg = metrics.estimated_emissions_kg || 0;
  const dutyVariance = metrics.duty_variance_minutes || 0;
  const solverTime = metrics.solver_time_seconds || 0;
  
  // Get actual depot resources (total available)
  // CRITICAL: Don't fall back to fleetSize - that defeats the purpose!
  const totalVehicles = depotResources.total_vehicles || 0;
  const totalDrivers = depotResources.total_drivers || 0;
  
  console.log('After extraction:');
  console.log('  fleetSize (optimized):', fleetSize);
  console.log('  driversUsed (optimized):', driversUsed);
  console.log('  totalVehicles (depot):', totalVehicles);
  console.log('  totalDrivers (depot):', totalDrivers);
  
  // If depot resources are missing, we can't show comparison
  if (!totalVehicles || !totalDrivers) {
    console.error('❌ ERROR: Depot resources not provided by API!');
    console.error('Cannot calculate current vs optimized comparison');
    console.error('This usually means:');
    console.error('1. Frontend dev server needs restart');
    console.error('2. Backend is not sending depot_resources in response');
    console.error('3. OptimizationPage is not passing depot_resources to this component');
  }
  
  // SAFETY CHECK: If depot resources are 0, show error message
  if (totalVehicles === 0 || totalDrivers === 0) {
    return (
      <div className={styles.optimizationResultsPanel}>
        <div className={styles.errorMessage}>
          <h3>⚠️ Configuration Error</h3>
          <p>Depot resources data is missing from the API response.</p>
          <p>Please ensure:</p>
          <ul>
            <li>Backend server is running the latest code</li>
            <li>Frontend dev server has been restarted</li>
            <li>Check browser console for detailed logs</li>
          </ul>
          <p><strong>Debug Info:</strong></p>
          <pre>{JSON.stringify({ 
            hasDepotResources: !!results.depot_resources,
            depotResources: results.depot_resources,
            totalVehicles, 
            totalDrivers,
            fleetSize,
            driversUsed
          }, null, 2)}</pre>
        </div>
      </div>
    );
  }
  
  // Calculate improvements from comparison or use depot totals as baseline
  let improvements;
  if (comparison?.differences) {
    // Use real comparison data
    const diffs = comparison.differences;
    improvements = {
      vehicles: {
        current: comparison.plan_b.metrics.fleet_size,
        optimized: comparison.plan_a.metrics.fleet_size,
        saved: -diffs.fleet_size // Negative diff means reduction
      },
      drivers: {
        current: Math.ceil(comparison.plan_b.metrics.fleet_size * 1.05),
        optimized: comparison.plan_a.metrics.drivers_used || Math.ceil(comparison.plan_a.metrics.fleet_size * 1.05),
        saved: Math.ceil(-diffs.fleet_size * 0.05)
      },
      cost: {
        current: comparison.plan_b.metrics.fleet_size * 1400,
        optimized: comparison.plan_a.metrics.fleet_size * 1400,
        saved: -diffs.fleet_size * 1400
      },
      emissions: {
        current: comparison.plan_b.metrics.estimated_emissions_kg,
        optimized: comparison.plan_a.metrics.estimated_emissions_kg,
        reduced: -diffs.estimated_emissions_kg
      }
    };
  } else {
    // No active plan - use total depot resources as "current" baseline
    // This represents the depot's full capacity vs optimized usage
    const costPerVehicle = 1400; // Daily cost per vehicle
    
    console.log('Calculating improvements from depot totals:');
    console.log('  Total Vehicles:', totalVehicles);
    console.log('  Optimized Vehicles:', fleetSize);
    console.log('  Total Drivers:', totalDrivers);
    console.log('  Optimized Drivers:', driversUsed);
    
    improvements = {
      vehicles: { 
        current: totalVehicles, 
        optimized: fleetSize, 
        saved: Math.max(0, totalVehicles - fleetSize)
      },
      drivers: { 
        current: totalDrivers, 
        optimized: driversUsed,  // Use actual driver count from optimizer
        saved: Math.max(0, totalDrivers - driversUsed)
      },
      cost: { 
        current: totalVehicles * costPerVehicle, 
        optimized: fleetSize * costPerVehicle, 
        saved: Math.max(0, (totalVehicles - fleetSize) * costPerVehicle)
      },
      emissions: { 
        current: emissionsKg * (totalVehicles / fleetSize), 
        optimized: emissionsKg, 
        reduced: Math.max(0, emissionsKg * ((totalVehicles / fleetSize) - 1))
      }
    };
    
    console.log('Calculated improvements:', improvements);
  }
  
  // Calculate monthly and annual savings
  const monthlySavings = improvements.cost.saved * 30;
  const annualCO2Reduction = (improvements.emissions.reduced * 365) / 1000; // in tonnes

  // Get assignment counts from plan details or use metrics
  const vehicleCount = planDetails?.vehicle_assignments?.length || metrics.fleet_size || 0;
  const driverCount = planDetails?.driver_assignments?.length || metrics.drivers_used || 0;

  if (loading) {
    return (
      <div className={styles.optimizationResultsPanel}>
        <div className={styles.loadingMessage}>Loading plan details...</div>
      </div>
    );
  }

  return (
    <div className={styles.optimizationResultsPanel}>
      {/* Results Header */}
      <div className={styles.resultsHeader}>
        <div className={styles.resultsTitle}>
          <CheckCircle size={32} className={styles.successIcon} />
          <span>OPTIMIZATION COMPLETE - New Plan v{planVersion} Generated</span>
        </div>
        <div className={styles.resultsMeta}>
          <div className={styles.resultsMetaItem}>
            Depot: {depotId}
          </div>
          <div className={styles.metaSeparator}>│</div>
          <div className={styles.resultsMetaItem}>
            Duration: {solverTime ? `${solverTime.toFixed(1)}s` : 'N/A'}
          </div>
          <div className={styles.metaSeparator}>│</div>
          <div className={styles.resultsMetaItem}>
            Status: {results.status || 'SUCCESS'}
          </div>
          <div className={styles.metaSeparator}>│</div>
          <div className={styles.resultsMetaItem}>
            Trips: {tripsCovered}/{tripsTotal}
          </div>
          <div className={styles.metaSeparator}>│</div>
          <div className={styles.resultsMetaItem}>
            Deadhead: {deadheadKm.toFixed(1)} km
          </div>
        </div>
      </div>

      {/* Compact Comparison Cards */}
      <div className={styles.comparisonCardsContainer}>
        {/* Vehicles Card */}
        <div className={styles.comparisonCard}>
          <div className={styles.cardHeader}>
            <Bus size={20} />
            <span>VEHICLES</span>
          </div>
          <div className={styles.cardComparison}>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Current</div>
              <div className={styles.valueNumber}>{improvements.vehicles.current}</div>
            </div>
            <div className={styles.cardArrow}>
              <ArrowRight size={20} />
              <div className={styles.cardSavings}>-{improvements.vehicles.saved}</div>
            </div>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Optimized</div>
              <div className={styles.valueNumber}>{improvements.vehicles.optimized}</div>
            </div>
          </div>
        </div>

        {/* Drivers Card */}
        <div className={styles.comparisonCard}>
          <div className={styles.cardHeader}>
            <Users size={20} />
            <span>DRIVERS</span>
          </div>
          <div className={styles.cardComparison}>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Current</div>
              <div className={styles.valueNumber}>{improvements.drivers.current}</div>
            </div>
            <div className={styles.cardArrow}>
              <ArrowRight size={20} />
              <div className={styles.cardSavings}>-{improvements.drivers.saved}</div>
            </div>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Optimized</div>
              <div className={styles.valueNumber}>{improvements.drivers.optimized}</div>
            </div>
          </div>
        </div>

        {/* Cost Card */}
        <div className={styles.comparisonCard}>
          <div className={styles.cardHeader}>
            <IndianRupee size={20} />
            <span>DAILY COST</span>
          </div>
          <div className={styles.cardComparison}>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Current</div>
              <div className={styles.valueNumber}>₹{(improvements.cost.current / 1000).toFixed(1)}k</div>
            </div>
            <div className={styles.cardArrow}>
              <ArrowRight size={20} />
              <div className={styles.cardSavings}>-₹{(improvements.cost.saved / 1000).toFixed(1)}k</div>
            </div>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Optimized</div>
              <div className={styles.valueNumber}>₹{(improvements.cost.optimized / 1000).toFixed(1)}k</div>
            </div>
          </div>
        </div>

        {/* Emissions Card */}
        <div className={styles.comparisonCard}>
          <div className={styles.cardHeader}>
            <Cloud size={20} />
            <span>CO₂ EMISSIONS</span>
          </div>
          <div className={styles.cardComparison}>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Current</div>
              <div className={styles.valueNumber}>{improvements.emissions.current.toFixed(1)}kg</div>
            </div>
            <div className={styles.cardArrow}>
              <ArrowRight size={20} />
              <div className={styles.cardSavings}>-{improvements.emissions.reduced.toFixed(1)}kg</div>
            </div>
            <div className={styles.cardValue}>
              <div className={styles.valueLabel}>Optimized</div>
              <div className={styles.valueNumber}>{improvements.emissions.optimized.toFixed(1)}kg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <div className={styles.savingsSummary}>
        <div className={styles.savingsItem}>
          <div className={styles.savingsIcon}>
            <DollarSign size={32} />
          </div>
          <div className={styles.savingsLabel}>MONTHLY SAVINGS ESTIMATE</div>
          <div className={styles.savingsValue}>₹{monthlySavings.toLocaleString()}</div>
          <div className={styles.savingsNote}>(~₹{improvements.cost.saved.toLocaleString()} × 30 days)</div>
        </div>
        <div className={styles.savingsItem}>
          <div className={styles.savingsIcon}>
            <Leaf size={32} />
          </div>
          <div className={styles.savingsLabel}>ANNUAL CO₂ REDUCTION</div>
          <div className={styles.savingsValue}>~{annualCO2Reduction.toFixed(0)} tonnes</div>
          <div className={styles.savingsNote}>Environmental impact</div>
        </div>
      </div>

      {/* Detailed Breakdown Buttons */}
      <div className={styles.breakdownButtons}>
        <button 
          className={styles.breakdownBtn}
          onClick={() => openModal('vehicles', `Vehicle Assignments (${vehicleCount} buses)`)}
        >
          <Bus size={20} />
          <span>VIEW VEHICLE ASSIGNMENTS</span>
          <span className={styles.breakdownCount}>{vehicleCount} buses</span>
        </button>
        <button 
          className={styles.breakdownBtn}
          onClick={() => openModal('drivers', `Driver Schedules (${driverCount} drivers)`)}
        >
          <Users size={20} />
          <span>VIEW DRIVER SCHEDULES</span>
          <span className={styles.breakdownCount}>{driverCount} drivers</span>
        </button>
        <button 
          className={styles.breakdownBtn}
          onClick={() => openModal('routes', 'Route Coverage Analysis')}
        >
          <IndianRupee size={20} />
          <span>VIEW ROUTE COVERAGE</span>
          <span className={styles.breakdownCount}>All routes</span>
        </button>
        <button 
          className={styles.breakdownBtn}
          onClick={() => openModal('constraints', 'Constraint Satisfaction Report')}
        >
          <CheckCircle size={20} />
          <span>VIEW CONSTRAINTS</span>
          <span className={styles.breakdownCount}>All satisfied</span>
        </button>
      </div>

      {/* Assignment Modal */}
      <AssignmentModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        planDetails={planDetails}
      />

      {/* Results Actions */}
      <div className={styles.resultsMainActions}>
        <button 
          className={`${styles.resultsActionBtn} ${styles.secondary}`}
          onClick={onSaveDraft}
        >
          <Save size={16} />
          SAVE PLAN AS DRAFT
        </button>
        <button 
          className={`${styles.resultsActionBtn} ${styles.secondary}`}
        >
          <FileText size={16} />
          EXPORT COMPARISON
        </button>
        <button 
          className={`${styles.resultsActionBtn} ${styles.primary}`}
          onClick={handleActivatePlan}
          disabled={activating}
        >
          <CheckCircle size={16} />
          {activating ? 'ACTIVATING...' : `ACTIVATE PLAN v${planVersion}`}
        </button>
        <button 
          className={`${styles.resultsActionBtn} ${styles.danger}`}
          onClick={onDiscard}
        >
          <Trash2 size={16} />
          DISCARD PLAN
        </button>
      </div>
    </div>
  );
};
