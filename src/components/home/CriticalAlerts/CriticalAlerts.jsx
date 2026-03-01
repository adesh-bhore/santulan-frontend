import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import styles from './CriticalAlerts.module.css';

export const CriticalAlerts = ({ alerts = [] }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDismiss = (alertId) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const handleAction = (alertId, action) => {
    console.log(`Action ${action} triggered for alert ${alertId}`);
    // Handle action logic here
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  const hasAlerts = visibleAlerts.length > 0;

  return (
    <div className={styles.alertsBanner}>
      <button 
        className={styles.alertsHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.headerContent}>
          <AlertCircle className={styles.headerIcon} size={20} />
          <span className={styles.headerTitle}>CRITICAL ALERTS & PRIORITY NOTIFICATIONS</span>
          {hasAlerts && (
            <span className={styles.alertCount}>{visibleAlerts.length}</span>
          )}
        </span>
        <span className={styles.expandIcon}>
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.alertsContent}>
          {!hasAlerts ? (
            <div className={styles.alertsEmpty}>
              <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              All systems operational — No critical alerts at this time
            </div>
          ) : (
            visibleAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={styles.alertItem} 
                data-severity={alert.severity}
              >
                <div className={styles.alertIcon}>{alert.icon}</div>
                
                <div className={styles.alertContent}>
                  <div className={styles.alertMessage}>{alert.message}</div>
                  <div className={styles.alertDetails}>{alert.details}</div>
                </div>

                <div className={styles.alertActions}>
                  {alert.actions?.map((action, index) => (
                    <button
                      key={index}
                      className={`${styles.alertActionBtn} ${action.type === 'dismiss' ? styles.dismiss : ''}`}
                      onClick={() => action.type === 'dismiss' ? handleDismiss(alert.id) : handleAction(alert.id, action.label)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
