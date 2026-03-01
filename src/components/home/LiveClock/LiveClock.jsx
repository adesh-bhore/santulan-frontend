import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './LiveClock.module.css';

export const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const formatDay = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long'
    }).toUpperCase();
  };

  // Render to document.body using Portal to avoid parent transform issues
  return createPortal(
    <div className={styles.dashboardLiveClock}>
      <div className={styles.liveTime}>{formatTime(time)}</div>
      <div className={styles.liveDate}>{formatDate(time)}</div>
      <div className={styles.liveDay}>{formatDay(time)}</div>
    </div>,
    document.body
  );
};
