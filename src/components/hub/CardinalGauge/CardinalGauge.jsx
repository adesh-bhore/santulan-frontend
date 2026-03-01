import { useState, useEffect, useMemo } from 'react';
import styles from './CardinalGauge.module.css';

export const CardinalGauge = ({
  value,
  maxValue,
  label,
  unit,
  direction,
  previousValue = null,
  trend = null,
}) => {
  const [showGhost, setShowGhost] = useState(false);
  const [showTrend, setShowTrend] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  // Calculate needle angle (135° to 405° = 270° arc)
  const minAngle = 135;
  const maxAngle = 405;
  const angleRange = maxAngle - minAngle;

  const needleAngle = useMemo(() => {
    const percentage = value / maxValue;
    return minAngle + percentage * angleRange;
  }, [value, maxValue]);

  const ghostNeedleAngle = useMemo(() => {
    if (!previousValue) return needleAngle;
    const percentage = previousValue / maxValue;
    return minAngle + percentage * angleRange;
  }, [previousValue, maxValue, needleAngle]);

  // Count-up animation for value
  useEffect(() => {
    const duration = 600;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, current + increment);
      setDisplayValue(Math.round(current * 10) / 10);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  // Ghost needle animation
  useEffect(() => {
    if (previousValue !== null && previousValue !== value) {
      setShowGhost(true);
      const timer = setTimeout(() => {
        setShowGhost(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const percentage = ((value / maxValue) * 100).toFixed(1);

  return (
    <div
      className={`${styles.cardinalGauge} ${styles[`gauge--${direction}`]}`}
      onMouseEnter={() => setShowTrend(true)}
      onMouseLeave={() => setShowTrend(false)}
      role="img"
      aria-label={`${label}: ${value} of ${maxValue}`}
      tabIndex={0}
    >
      {/* Mahogany Case */}
      <div className={styles.mahoganyCase}>
        {/* Brass Rim */}
        <div className={styles.brassRim}>
          {/* Glass Dome */}
          <div className={styles.glassDome}>
            {/* Gauge Face */}
            <div className={styles.gaugeFace}>
              {/* Tick Marks */}
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className={styles.tickMark}
                  style={{
                    transform: `rotate(${minAngle + (i * angleRange) / 10}deg)`,
                  }}
                />
              ))}

              {/* Zone Overlays */}
              <div className={styles.zoneGreen} />
              <div className={styles.zoneAmber} />
              <div className={styles.zoneRed} />

              {/* Ghost Needle */}
              {showGhost && (
                <div
                  className={styles.needleGhost}
                  style={{ transform: `rotate(${ghostNeedleAngle}deg)` }}
                >
                  <div className={styles.needleArrow} />
                </div>
              )}

              {/* Main Needle */}
              <div className={styles.needle} style={{ transform: `rotate(${needleAngle}deg)` }}>
                <div className={styles.needleArrow} />
                <div className={styles.needleBalance} />
              </div>

              {/* Center Rivet */}
              <div className={styles.centerRivet}>
                <div className={styles.screwSlot} />
              </div>

              {/* Value Display */}
              <div className={styles.valueDisplay}>
                <span className={styles.valueNumber}>{displayValue}</span>
                <span className={styles.valueMax}>/{maxValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brass Nameplate */}
        <div className={styles.nameplate}>
          <span className={styles.nameplateLabel}>{label}</span>
          <span className={styles.nameplateUnit}>{unit}</span>
        </div>
      </div>

      {/* Trend Tooltip */}
      {showTrend && trend && (
        <div className={styles.trendTooltip}>
          <span className={styles.trendIcon}>
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
          </span>
          <span className={styles.trendChange}>
            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
            {Math.abs(trend.change)}
          </span>
        </div>
      )}

      {/* Screen Reader */}
      <div className="sr-only">
        Current: {value}. Maximum: {maxValue}. Percentage: {percentage}%.
        {trend && ` Trend: ${trend.direction} ${trend.change} from previous.`}
      </div>
    </div>
  );
};
