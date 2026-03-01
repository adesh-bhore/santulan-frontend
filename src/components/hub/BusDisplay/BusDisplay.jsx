import { useState } from 'react';
import { Bus, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './BusDisplay.module.css';

export const BusDisplay = ({ planVersion, planStatus, activatedAt, onQuickAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleActions = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleActions();
    }
  };

  const getStatusIcon = () => {
    switch (planStatus.toLowerCase()) {
      case 'active':
        return <CheckCircle size={20} />;
      case 'pending':
        return <Clock size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  return (
    <div
      className={styles.busDisplay}
      onClick={toggleActions}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Active Plan Status"
      aria-expanded={isExpanded}
      tabIndex={0}
    >
      {/* Bus Container */}
      <div className={styles.busContainer}>
        {/* Bus Body */}
        <div className={styles.busBody}>
          {/* Front Section */}
          <div className={styles.busFront}>
            {/* Windshield */}
            <div className={styles.windshield}>
              <div className={styles.windshieldGlass}></div>
            </div>
            
            {/* Headlights */}
            <div className={styles.headlights}>
              <div className={styles.headlight}></div>
              <div className={styles.headlight}></div>
            </div>
          </div>

          {/* Main Body Section */}
          <div className={styles.busMainBody}>
            {/* Route Display Board */}
            <div className={styles.routeBoard}>
              <div className={styles.routeBoardContent}>
                <div className={styles.planHeader}>
                  <Bus size={24} className={styles.busIcon} />
                  <span className={styles.planLabel}>ACTIVE PLAN</span>
                </div>
                
                <div className={styles.planVersion}>
                  VERSION {planVersion}
                </div>
                
                <div className={`${styles.planStatus} ${styles[`status--${planStatus.toLowerCase()}`]}`}>
                  {getStatusIcon()}
                  <span>{planStatus}</span>
                </div>

                {activatedAt && (
                  <div className={styles.activatedInfo}>
                    <Calendar size={14} />
                    <span>Activated: {activatedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Windows */}
            <div className={styles.windows}>
              <div className={styles.window}></div>
              <div className={styles.window}></div>
              <div className={styles.window}></div>
              <div className={styles.window}></div>
            </div>

            {/* Side Details */}
            <div className={styles.sideStripe}></div>
          </div>

          {/* Wheels */}
          <div className={styles.wheels}>
            <div className={styles.wheel}>
              <div className={styles.wheelRim}></div>
              <div className={styles.wheelHub}></div>
            </div>
            <div className={styles.wheel}>
              <div className={styles.wheelRim}></div>
              <div className={styles.wheelHub}></div>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className={styles.busShadow}></div>
      </div>

      {/* Quick Actions Menu */}
      {isExpanded && (
        <div className={styles.quickActions}>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction?.('view-plan');
            }}
          >
            View Plan Details
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction?.('report');
            }}
          >
            Generate Report
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction?.('settings');
            }}
          >
            Plan Settings
          </button>
        </div>
      )}

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Active Plan: Version {planVersion}. Status: {planStatus}.
        {activatedAt && ` Activated on ${activatedAt}.`}
      </div>
    </div>
  );
};
