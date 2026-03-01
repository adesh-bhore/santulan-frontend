import { useEffect } from 'react';
import styles from './ReturnHubButton.module.css';

export const ReturnHubButton = ({ onClick }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClick?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClick]);

  return (
    <button
      className={styles.returnHubButton}
      onClick={onClick}
      aria-label="Return to Hub (Press Escape)"
      title="Return to Hub (Esc)"
    >
      <span className={styles.icon}>⟲</span>
      <span className={styles.label}>RETURN TO HUB</span>
    </button>
  );
};
