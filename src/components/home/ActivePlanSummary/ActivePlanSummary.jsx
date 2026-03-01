import { useAppContext } from '@context/AppContext';
import styles from './ActivePlanSummary.module.css';

export const ActivePlanSummary = () => {
  const { state } = useAppContext();
  const { activePlan } = state;
  const { version, status, activatedAt, metrics } = activePlan;

  // Format activation date/time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return { date: dateStr, time: timeStr };
  };

  const { date, time } = formatDateTime(activatedAt);

  return (
    <section className={styles.activePlanSummary}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.brassRivet}></div>
        <h2 className={styles.sectionTitle}>ACTIVE PLAN SUMMARY</h2>
      </div>

      {/* Plan Header */}
      <div className={styles.planHeader}>
        <div className={styles.planInfo}>
          <span className={styles.planVersion}>PLAN {version.toUpperCase()}</span>
          <span className={`${styles.statusBadge} ${styles[`status${status}`]}`}>
            {status}
          </span>
        </div>
        <div className={styles.activationInfo}>
          <span className={styles.activationLabel}>ACTIVATED:</span>
          <span className={styles.activationDate}>{date}</span>
          <span className={styles.activationTime}>{time}</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>
            <span className={styles.metricCurrent}>{metrics.vehiclesActive}</span>
            <span className={styles.metricSeparator}>/</span>
            <span className={styles.metricTotal}>{metrics.vehiclesTotal}</span>
          </div>
          <div className={styles.metricLabel}>VEHICLES ACTIVE</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricValue}>
            <span className={styles.metricCurrent}>{metrics.driversOnDuty}</span>
            <span className={styles.metricSeparator}>/</span>
            <span className={styles.metricTotal}>{metrics.driversTotal}</span>
          </div>
          <div className={styles.metricLabel}>DRIVERS ON DUTY</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricValue}>
            <span className={styles.metricCurrent}>{metrics.tripsCovered}</span>
            <span className={styles.metricSeparator}>/</span>
            <span className={styles.metricTotal}>{metrics.tripsTotal}</span>
          </div>
          <div className={styles.metricLabel}>TRIPS COVERED</div>
        </div>
      </div>
    </section>
  );
};
