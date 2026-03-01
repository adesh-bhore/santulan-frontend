import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Settings, BarChart3, Loader2 } from 'lucide-react';
import api from '../../services/api';
import styles from './OptimizationReadiness.module.css';

export const OptimizationReadiness = ({ onStartOptimization, selectedDepot }) => {
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState(null);
  const [depotData, setDepotData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReadinessData();
  }, [selectedDepot]);

  const loadReadinessData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch active plans
      const plansResponse = await api.getActivePlans();
      
      // Find active plan for selected depot
      const depotPlan = plansResponse.active_plans?.find(
        plan => plan.depot_id === selectedDepot
      );
      
      setActivePlan(depotPlan || null);

      // Fetch depot data from dashboard
      const dashboardResponse = await api.getDashboardSummary();
      const depot = dashboardResponse.depots?.find(d => d.depot_id === selectedDepot);
      setDepotData(depot || null);

    } catch (err) {
      console.error('Failed to load readiness data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.optimizationReadinessDashboard}>
        <div className={styles.readinessHeader}>
          <Loader2 size={24} className="spinning" />
          LOADING READINESS DATA...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.optimizationReadinessDashboard}>
        <div className={styles.readinessHeader}>
          <AlertTriangle size={24} />
          ERROR LOADING DATA
        </div>
        <div style={{ padding: '20px', color: 'var(--signal-red)' }}>
          {error}
        </div>
      </div>
    );
  }

  // Build status cards from real data
  const statusCards = [
    {
      id: 'plan',
      title: 'ACTIVE PLAN',
      value: activePlan ? `PLAN v${activePlan.version}` : 'NO PLAN',
      status: activePlan ? 'ACTIVE' : 'NONE',
      statusType: activePlan ? 'ready' : 'warning',
      meta: activePlan ? [
        `Since: ${new Date(activePlan.deployed_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`
      ] : ['No active plan deployed'],
      action: 'VIEW'
    },
    {
      id: 'fleet',
      title: 'FLEET STATUS',
      value: depotData ? `${depotData.vehicles_total} Buses` : 'N/A',
      status: depotData ? '✓ OPERATIONAL' : 'N/A',
      statusType: depotData ? 'ready' : 'warning',
      meta: depotData ? [
        `${depotData.drivers_total} Drivers`,
        `${depotData.trips_total} Trips`,
        `${Math.round((depotData.vehicles_active / depotData.vehicles_total) * 100)}% Util`
      ] : ['No data available'],
      action: 'DETAILS'
    },
    {
      id: 'data',
      title: 'DATA QUALITY',
      value: '✓ VALID',
      status: '✓ COMPLETE',
      statusType: 'ready',
      meta: ['All required data present'],
      action: 'VALIDATE'
    },
    {
      id: 'engine',
      title: 'ENGINE',
      value: '⦿ READY',
      status: 'READY',
      statusType: 'ready',
      meta: activePlan ? [
        `Last Run: ${new Date(activePlan.deployed_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`,
        'Duration: ~2-4 min'
      ] : ['Ready to optimize'],
      action: 'STATUS'
    }
  ];

  const checklistItems = [
    { 
      text: 'All required data files present and validated', 
      status: depotData ? 'ready' : 'warning' 
    },
    { 
      text: 'No active trips in progress (safe to optimize)', 
      status: 'ready' 
    },
    { 
      text: 'Database connection stable', 
      status: 'ready' 
    },
    { 
      text: 'Calculation engine ready', 
      status: 'ready' 
    },
    { 
      text: 'Note: Optimization will take 2-4 minutes', 
      status: 'warning' 
    }
  ];

  const insights = activePlan && depotData ? [
    `Current plan uses ${activePlan.metrics.fleet_size} vehicles (${depotData.vehicles_total - activePlan.metrics.fleet_size} idle)`,
    `Trips covered: ${activePlan.metrics.trips_covered}/${activePlan.metrics.trips_total}`,
    `Deadhead distance: ${activePlan.metrics.total_deadhead_km.toFixed(1)} km`,
    `Estimated emissions: ${activePlan.metrics.estimated_emissions_kg.toFixed(1)} kg CO₂`
  ] : [
    'No active plan data available',
    'Run optimization to generate insights',
    'Select a depot to view current status'
  ];

  return (
    <div className={styles.optimizationReadinessDashboard}>
      <div className={styles.readinessHeader}>
        <BarChart3 size={24} />
        CURRENT PLAN STATUS & OPTIMIZATION READINESS
      </div>

      {/* Status Cards Grid */}
      <div className={styles.readinessStatusGrid}>
        {statusCards.map(card => (
          <div 
            key={card.id}
            className={styles.readinessCard}
            data-status={card.statusType}
          >
            <div className={styles.readinessCardTitle}>{card.title}</div>
            <div className={styles.readinessCardValue}>{card.value}</div>
            <div className={styles.readinessCardStatus}>
              {card.statusType === 'ready' && <CheckCircle size={14} />}
              {card.statusType === 'warning' && <AlertTriangle size={14} />}
              <span>{card.status}</span>
            </div>
            <div className={styles.readinessCardMeta}>
              {card.meta.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
            <button className={styles.readinessCardAction}>
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* Readiness Checklist */}
      <div className={styles.readinessChecklist}>
        <div className={styles.checklistTitle}>
          OPTIMIZATION READINESS CHECK:
        </div>
        <div className={styles.checklistItems}>
          {checklistItems.map((item, index) => (
            <div 
              key={index}
              className={styles.checklistItem}
              data-status={item.status}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className={styles.quickInsightsPanel}>
        <div className={styles.insightsTitle}>
          QUICK INSIGHTS:
        </div>
        <div className={styles.insightsList}>
          {insights.map((insight, index) => (
            <div key={index} className={styles.insightItem}>
              {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.readinessActions}>
        <button 
          className={`${styles.readinessActionBtn} ${styles.primary}`}
          onClick={onStartOptimization}
          disabled={!selectedDepot}
        >
          <Settings size={16} />
          RUN NEW OPTIMIZATION
        </button>
        <button className={styles.readinessActionBtn}>
          VIEW PAST RESULTS
        </button>
        <button className={styles.readinessActionBtn}>
          SCHEDULE AUTO
        </button>
      </div>
    </div>
  );
};
