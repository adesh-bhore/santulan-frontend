import styles from './TodaysSummary.module.css';

export const TodaysSummary = ({ data }) => {
  if (!data) {
    return (
      <div className={styles.panelCard}>
        <div className={styles.panelCardHeader}>TODAY'S SUMMARY</div>
        <div className={styles.loadingState}>No data available</div>
      </div>
    );
  }

  const todaysSummary = data.todays_summary || {};

  return (
    <div className={styles.panelCard}>
      <div className={styles.panelCardHeader}>TODAY'S SUMMARY</div>
      
      <div className={styles.summaryStats}>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>Trips Completed</span>
          <span className={styles.summaryStatValue}>
            {todaysSummary.trips_completed || 0}/{todaysSummary.trips_total || 0}
          </span>
        </div>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>On-Time %</span>
          <span className={styles.summaryStatValue}>{todaysSummary.on_time_percent || 0}%</span>
        </div>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>Fuel Consumed</span>
          <span className={styles.summaryStatValue}>{todaysSummary.fuel_consumed || 0}L</span>
        </div>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>Revenue</span>
          <span className={styles.summaryStatValue}>₹{todaysSummary.revenue || 0}k</span>
        </div>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>Breakdowns</span>
          <span className={styles.summaryStatValue}>{todaysSummary.breakdowns || 0}</span>
        </div>
        <div className={styles.summaryStatItem}>
          <span className={styles.summaryStatLabel}>Delayed Buses</span>
          <span className={styles.summaryStatValue}>{todaysSummary.delayed_buses || 0}</span>
        </div>
      </div>
      <div className={styles.panelViewAllBtn}>
        [Full Statistics]
      </div>
    </div>
  );
};
