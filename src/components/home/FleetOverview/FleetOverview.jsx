import { Building } from 'lucide-react';
import styles from './FleetOverview.module.css';

export const FleetOverview = ({ data }) => {
  if (!data) {
    return (
      <section className={styles.fleetOverview}>
        <h2 className={styles.sectionTitle}>FLEET OPERATIONAL OVERVIEW</h2>
        <div className={styles.loadingState}>No data available</div>
      </section>
    );
  }

  const fleetMetrics = data.fleet_metrics || [];
  const statusBreakdown = data.status_breakdown || [];

  return (
    <section className={styles.fleetOverview}>
      <h2 className={styles.sectionTitle}>
        FLEET OPERATIONAL OVERVIEW
      </h2>

      {/* Key Metrics - Simplified to 3 */}
      <div className={styles.metricsGrid}>
        {fleetMetrics.map((metric) => (
          <div 
            key={metric.id} 
            className={styles.metricGauge}
            style={{ '--gauge-percent': `${metric.gaugePercent}%` }}
          >
            {metric.trend && (
              <div className={`${styles.metricTrend} ${styles[metric.trend.direction]}`}>
                {metric.trend.direction === 'up' && '↑'}
                {metric.trend.direction === 'down' && '↓'}
                {metric.trend.direction === 'stable' && '→'}
                {metric.trend.value}
              </div>
            )}
            
            <div className={styles.metricDial}>
              <div className={styles.metricValue}>
                {metric.value}
                {metric.unit && <span className={styles.metricUnit}>{metric.unit}</span>}
              </div>
            </div>
            
            <div className={styles.metricLabel}>{metric.label}</div>
            <div className={styles.metricSublabel}>{metric.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Status Breakdown - Compact */}
      <div className={styles.statusBreakdown}>
        <div className={styles.statusItems}>
          {statusBreakdown.map((item, index) => (
            <div 
              key={index} 
              className={styles.statusItem}
              data-status={item.status}
            >
              <span className={styles.statusIcon}>{item.icon}</span>
              <span className={styles.statusLabel}>{item.label}:</span>
              <span className={styles.statusCount}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
