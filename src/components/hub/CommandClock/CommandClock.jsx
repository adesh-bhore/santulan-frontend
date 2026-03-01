import { useState, useEffect } from 'react';
import styles from './CommandClock.module.css';

export const CommandClock = ({ planVersion, planStatus, activatedAt, onQuickAction }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const toggleActions = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleActions();
    }
  };

  return (
    <div
      className={styles.commandClock}
      onClick={toggleActions}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Command Center Status"
      aria-expanded={isExpanded}
      tabIndex={0}
    >
      {/* Brass Rim */}
      <div className={styles.brassRim}>
        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={styles.hourMarker}
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}

        {/* Parchment Face */}
        <div className={styles.parchmentFace}>
          {/* Time Display */}
          <div className={styles.timeDisplay}>{formatTime(currentTime)}</div>

          {/* Plan Status */}
          <div className={styles.planInfo}>
            <div className={styles.planVersion}>PLAN {planVersion}</div>
            <div className={`${styles.planStatus} ${styles[`status--${planStatus.toLowerCase()}`]}`}>
              {planStatus}
            </div>
          </div>

          {/* Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.badgeVersion}>{planVersion}</span>
          </div>
        </div>
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
            View Plan
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction?.('report');
            }}
          >
            Report
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction?.('settings');
            }}
          >
            Settings
          </button>
        </div>
      )}

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current time: {formatTime(currentTime)}. Active Plan: Version {planVersion}. Status:{' '}
        {planStatus}.
      </div>
    </div>
  );
};
