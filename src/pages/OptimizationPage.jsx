import { useState, useEffect } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { OptimizationReadiness } from '../components/optimization/OptimizationReadiness';
import { OptimizationConfig } from '../components/optimization/OptimizationConfig';
import { OptimizationProgress } from '../components/optimization/OptimizationProgress';
import { OptimizationResults } from '../components/optimization/OptimizationResults';
import api from '../services/api';
import styles from './OptimizationPage.module.css';

export const OptimizationPage = () => {
  const [depots, setDepots] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState('');
  const [dayType, setDayType] = useState('weekday');
  const [configData, setConfigData] = useState({
    objective: 'balanced',
    fleet_size: 0.4,
    deadhead: 0.3,
    emissions: 0.2,
    duty_variance: 0.1
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [isDataReady, setIsDataReady] = useState(true);
  const [error, setError] = useState(null);

  // Load depots on mount
  useEffect(() => {
    loadDepots();
  }, []);

  const loadDepots = async () => {
    try {
      const response = await api.getOptimizationDepots();
      setDepots(response.depots || []);
      if (response.depots && response.depots.length > 0) {
        setSelectedDepot(response.depots[0].depot_id);
      }
    } catch (err) {
      console.error('Failed to load depots:', err);
      setError('Failed to load depots. Please check backend connection.');
    }
  };

  const handleConfigChange = (newConfig) => {
    setConfigData({ ...configData, ...newConfig });
  };

  const handleStartOptimization = async () => {
    if (!selectedDepot) {
      setError('Please select a depot');
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      const objectiveWeights = getObjectiveWeights(configData.objective);
      const request = {
        depot_id: selectedDepot,
        day_type: dayType,
        objective_weights: objectiveWeights
      };
      
      // Call backend API - this may take up to 10 minutes for large depots
      const result = await api.runOptimization(request);
      
      console.log('✅ Optimization API Response:', result);
      console.log('   depot_resources:', result.depot_resources);
      
      setOptimizationResults({
        success: true,
        plan_id: result.plan_id,
        version: result.version,
        depot_id: result.depot_id,
        status: result.status,
        metrics: result.metrics,
        depot_resources: result.depot_resources,  // ✅ CRITICAL: Include depot resources
        created_at: result.created_at
      });
    } catch (err) {
      console.error('Optimization failed:', err);
      console.error('Error details:', JSON.stringify(err, null, 2));
      
      // Better error message extraction
      let errorMessage = 'Optimization failed. Please try again.';
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.detail) {
        errorMessage = err.detail;
      } else if (err.error) {
        errorMessage = err.error;
      }
      
      setError(errorMessage);
      setOptimizationResults({
        success: false,
        error: errorMessage
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const getObjectiveWeights = (objective) => {
    switch (objective) {
      case 'cost':
        return {
          fleet_size: 0.5,
          deadhead: 0.3,
          emissions: 0.15,
          duty_variance: 0.05
        };
      case 'coverage':
        return {
          fleet_size: 0.2,
          deadhead: 0.2,
          emissions: 0.1,
          duty_variance: 0.5
        };
      case 'balanced':
      default:
        return {
          fleet_size: 0.4,
          deadhead: 0.3,
          emissions: 0.2,
          duty_variance: 0.1
        };
    }
  };

  const handleCancelOptimization = () => {
    setIsOptimizing(false);
  };

  const handleActivatePlan = () => {
    console.log('Activating plan:', optimizationResults.plan_id);
    alert(`Plan ${optimizationResults.plan_id} activated successfully!`);
  };

  const handleDiscardPlan = () => {
    console.log('Discarding plan');
    setOptimizationResults(null);
  };

  const handleSaveDraft = () => {
    console.log('Saving plan as draft');
    alert('Plan saved as draft');
  };

  return (
    <PageLayout
      title="Optimization Engine Control Center"
      subtitle="Fleet Resource Allocation & Route Assignment Calculator"
      breadcrumbPath="Optimization"
    >
      <div className={styles.optimizationPage}>
        {/* Error Display */}
        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}

        {/* Depot Selection */}
        {!isOptimizing && !optimizationResults && (
          <div className={styles.depotSelectionPanel}>
            <div className={styles.depotSelectionTitle}>SELECT DEPOT & DAY TYPE</div>
            <div className={styles.depotSelectionContent}>
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>Depot:</label>
                <select
                  className={styles.depotSelect}
                  value={selectedDepot}
                  onChange={(e) => setSelectedDepot(e.target.value)}
                >
                  {depots.map(depot => (
                    <option key={depot.depot_id} value={depot.depot_id}>
                      {depot.depot_name} ({depot.depot_id})
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>Day Type:</label>
                <select
                  className={styles.dayTypeSelect}
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value)}
                >
                  <option value="weekday">Weekday</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Readiness Dashboard */}
        <OptimizationReadiness 
          onStartOptimization={handleStartOptimization}
          selectedDepot={selectedDepot}
        />

        {/* Configuration Panel - Compact */}
        {!isOptimizing && !optimizationResults && (
          <div className={styles.simplifiedConfig}>
            <div className={styles.configTitle}>Optimization Objective</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div className={styles.objectiveButtons}>
                <button
                  className={`${styles.objectiveBtn} ${configData.objective === 'balanced' ? styles.active : ''}`}
                  onClick={() => handleConfigChange({ objective: 'balanced' })}
                >
                  Balanced
                </button>
                <button
                  className={`${styles.objectiveBtn} ${configData.objective === 'cost' ? styles.active : ''}`}
                  onClick={() => handleConfigChange({ objective: 'cost' })}
                >
                  Minimize Cost
                </button>
                <button
                  className={`${styles.objectiveBtn} ${configData.objective === 'coverage' ? styles.active : ''}`}
                  onClick={() => handleConfigChange({ objective: 'coverage' })}
                >
                  Maximize Coverage
                </button>
              </div>
              <button
                className={styles.startOptimizationBtn}
                onClick={handleStartOptimization}
                disabled={!selectedDepot || !isDataReady}
              >
                Start Optimization
              </button>
            </div>
          </div>
        )}

        {/* Progress Display */}
        {isOptimizing && (
          <OptimizationProgress onCancel={handleCancelOptimization} />
        )}

        {/* Results Display */}
        {optimizationResults && (
          <OptimizationResults 
            results={optimizationResults}
            onActivate={handleActivatePlan}
            onDiscard={handleDiscardPlan}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </div>
    </PageLayout>
  );
};
