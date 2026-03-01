import { useState, useCallback } from 'react';
import { PreviewCard } from '../PreviewCard';
import { previewCardsData } from '@mock-data/previewCards';
import styles from './InformationPavilion.module.css';

export const InformationPavilion = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = previewCardsData.length;

  // Position names for the 5-card carousel
  const positions = ['front', 'right', 'back-right', 'back-left', 'left'];

  // Calculate position for each card based on current index
  const getCardPosition = (cardIndex) => {
    const relativePosition = (cardIndex - currentIndex + totalCards) % totalCards;
    return positions[relativePosition];
  };

  // Calculate orbit angle for each card
  // Starting at 90° (right side) as front position
  const getOrbitAngle = (cardIndex) => {
    const relativePosition = (cardIndex - currentIndex + totalCards) % totalCards;
    return (relativePosition * 72 + 90) % 360; // 360° / 5 cards = 72° per card, offset by 90° to make right side front
  };

  // Rotate carousel
  const handleRotate = useCallback(
    (direction) => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + direction + totalCards) % totalCards;
        return newIndex;
      });
    },
    [totalCards]
  );

  // Open page
  const handleOpenPage = useCallback(
    (page) => {
      onNavigate?.(page);
    },
    [onNavigate]
  );

  // Handle click on clickable overlay to rotate
  const handleOverlayClick = useCallback(() => {
    handleRotate(1);
  }, [handleRotate]);

  return (
    <div className={styles.informationPavilion}>
      {/* Clickable Overlay - captures all clicks except on cards */}
      <div className={styles.clickableOverlay} onClick={handleOverlayClick} />

      {/* Orbital Ring Visualization (optional) */}
      <div className={styles.orbitRing} />

      {/* Preview Cards */}
      <div className={styles.cardsContainer}>
        {previewCardsData.map((cardData, index) => (
          <PreviewCard
            key={cardData.id}
            cardData={cardData}
            position={getCardPosition(index)}
            orbitAngle={getOrbitAngle(index)}
            onOpen={handleOpenPage}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className={styles.navigationArrows}>
        <button
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            handleRotate(-1);
          }}
          aria-label="Previous card"
        >
          <span className={styles.arrowIcon}>←</span>
        </button>
        <button
          className={`${styles.arrowButton} ${styles.arrowRight}`}
          onClick={(e) => {
            e.stopPropagation();
            handleRotate(1);
          }}
          aria-label="Next card"
        >
          <span className={styles.arrowIcon}>→</span>
        </button>
      </div>
    </div>
  );
};
