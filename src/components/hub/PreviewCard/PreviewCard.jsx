import { useEffect } from 'react';
import styles from './PreviewCard.module.css';

export const PreviewCard = ({ cardData, position, onOpen, orbitAngle }) => {
  const { title, subtitle, icon, status, quickInfo } = cardData;

  const handleClick = () => {
    if (position === 'front') {
      onOpen?.(cardData.page);
    }
  };

  const handleKeyPress = (e) => {
    if (position === 'front' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onOpen?.(cardData.page);
    }
  };

  // Position-based styling
  const positionStyles = {
    front: {
      opacity: 1,
      scale: 1,
      zIndex: 100,
      blur: 0,
      pointerEvents: 'all',
    },
    right: {
      opacity: 0.5,
      scale: 0.75,
      zIndex: 50,
      blur: 0.5,
      pointerEvents: 'none',
    },
    'back-right': {
      opacity: 0.45,
      scale: 0.6,
      zIndex: 25,
      blur: 1,
      pointerEvents: 'none',
    },
    'back-left': {
      opacity: 0.45,
      scale: 0.6,
      zIndex: 25,
      blur: 1,
      pointerEvents: 'none',
    },
    left: {
      opacity: 0.5,
      scale: 0.75,
      zIndex: 50,
      blur: 0.5,
      pointerEvents: 'none',
    },
  };

  const currentStyle = positionStyles[position] || positionStyles.front;

  return (
    <div
      className={`${styles.previewCard} ${styles[`position--${position}`]}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      aria-label={`Open ${title} page`}
      tabIndex={position === 'front' ? 0 : -1}
      style={{
        '--orbit-angle': `${orbitAngle}deg`,
        '--card-opacity': currentStyle.opacity,
        '--card-scale': currentStyle.scale,
        '--card-blur': `${currentStyle.blur}px`,
        zIndex: currentStyle.zIndex,
        pointerEvents: currentStyle.pointerEvents,
      }}
    >
      {/* Paper Texture Overlay */}
      <div className={styles.paperTexture} />

      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      {/* Status Section */}
      <div className={styles.statusSection}>
        <div className={`${styles.statusBadge} ${styles[`status--${status.color}`]}`}>
          <span className={styles.statusLabel}>{status.label}</span>
        </div>
        <p className={styles.statusValue}>{status.value}</p>
      </div>

      {/* Quick Info List */}
      <div className={styles.quickInfo}>
        {quickInfo.map((info, index) => (
          <div key={index} className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span className={styles.infoText}>{info}</span>
          </div>
        ))}
      </div>

      {/* Open Button */}
      {position === 'front' && (
        <button className={styles.openButton}>
          OPEN {title.toUpperCase()} →
        </button>
      )}

      {/* Brass Corner Decorations */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />
    </div>
  );
};
