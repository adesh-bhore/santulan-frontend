import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAppContext } from '@context/AppContext';
import { mockApi } from '@services/mockApi';
import styles from './ActivityLog.module.css';

export const ActivityLog = () => {
  const { state, dispatch } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh activities every 30 seconds
  useEffect(() => {
    const refreshActivities = async () => {
      setIsRefreshing(true);
      try {
        const response = await mockApi.getDashboardSummary();
        if (response.success && response.data.activities) {
          // Update activities in context
          response.data.activities.forEach((activity) => {
            dispatch({
              type: 'ADD_ACTIVITY',
              payload: activity,
            });
          });
        }
      } catch (error) {
        console.error('Failed to refresh activities:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Initial load
    refreshActivities();

    // Set up interval for auto-refresh
    const intervalId = setInterval(refreshActivities, 30000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const activities = state.activities;

  return (
    <div className={styles.panelCard}>
      <div className={styles.panelCardHeader}>
        ACTIVITY LOG
        {isRefreshing && <RefreshCw className={styles.refreshIndicator} size={14} />}
      </div>

      <div className={styles.activityTimeline}>
        {activities.length === 0 ? (
          <div className={styles.emptyState}>No recent activities</div>
        ) : (
          activities.slice(0, 8).map((activity, index) => (
            <div key={`${activity.timestamp}-${index}`} className={styles.activityItemLog}>
              <span className={styles.activityTime}>{activity.timestamp}</span>
              {activity.description}
            </div>
          ))
        )}
      </div>

      <div className={styles.panelViewAllBtn}>
        [View All Activities]
      </div>
    </div>
  );
};
