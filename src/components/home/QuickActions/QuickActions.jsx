import { useState } from 'react';
import { Bus, UserCheck, BarChart3, Settings } from 'lucide-react';
import styles from './QuickActions.module.css';

export const QuickActions = () => {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (actionName) => {
    setLoadingAction(actionName);
    
    // Simulate action execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoadingAction(null);
    console.log(`${actionName} executed`);
  };

  const actions = [
    { id: 'assignments', label: 'View Vehicle Assignments', icon: <Bus size={20} /> },
    { id: 'schedule', label: 'View Driver Schedule', icon: <UserCheck size={20} /> },
    { id: 'report', label: 'Generate Daily Report', icon: <BarChart3 size={20} /> },
    { id: 'health', label: 'System Health Check', icon: <Settings size={20} /> },
  ];

  return (
    <section className={styles.quickActions}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.brassRivet}></div>
        <h2 className={styles.sectionTitle}>QUICK ACTIONS</h2>
      </div>

      {/* Actions Grid */}
      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <button
            key={action.id}
            className={`${styles.actionButton} ${loadingAction === action.id ? styles.loading : ''}`}
            onClick={() => handleAction(action.id)}
            disabled={loadingAction !== null}
            aria-label={action.label}
          >
            <span className={styles.actionIcon}>{action.icon}</span>
            <span className={styles.actionLabel}>{action.label}</span>
            {loadingAction === action.id && (
              <span className={styles.loadingSpinner}></span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
