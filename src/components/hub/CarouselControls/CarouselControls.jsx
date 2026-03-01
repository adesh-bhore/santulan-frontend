import { useEffect } from 'react';
import styles from './CarouselControls.module.css';

export const CarouselControls = ({ currentIndex, totalCards, cardNames, onRotate, onJumpTo }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onRotate(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          onRotate(1);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          onJumpTo(parseInt(e.key) - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRotate, onJumpTo]);

  return (
    <div className={styles.carouselControls}>
      {/* Left Arrow */}
      <button
        className={styles.arrowButton}
        onClick={() => onRotate(-1)}
        aria-label="Previous card"
      >
        <span className={styles.arrowIcon}>←</span>
      </button>

      {/* Indicator Dots */}
      <div className={styles.indicators}>
        {[...Array(totalCards)].map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => onJumpTo(index)}
            aria-label={`Go to ${cardNames[index]}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>

      {/* Current Section Label */}
      <div className={styles.sectionLabel}>
        <span className={styles.labelText}>{cardNames[currentIndex]}</span>
      </div>

      {/* Right Arrow */}
      <button
        className={styles.arrowButton}
        onClick={() => onRotate(1)}
        aria-label="Next card"
      >
        <span className={styles.arrowIcon}>→</span>
      </button>

      {/* Keyboard Hint */}
      <div className={styles.keyboardHint}>
        <span className={styles.hintText}>← → or 1-5 to navigate • Enter to open</span>
      </div>
    </div>
  );
};
