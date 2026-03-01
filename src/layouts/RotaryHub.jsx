import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@context/AppContext';
import { BusDisplay } from '../components/hub/BusDisplay';
import { CardinalGauge } from '../components/hub/CardinalGauge';
import { InformationPavilion } from '../components/hub/InformationPavilion';
import api from '../services/api';
import styles from './RotaryHub.module.css';

export const RotaryHub = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { activePlan } = state;
  
  const [gaugeData, setGaugeData] = useState({
    north: { label: 'FLEET IN SERVICE', unit: 'VEHICLES', value: 0, maxValue: 0, previousValue: 0, trend: { direction: 'stable', change: 0 } },
    east: { label: 'DRIVERS ON DUTY', unit: 'DRIVERS', value: 0, maxValue: 0, previousValue: 0, trend: { direction: 'stable', change: 0 } },
    south: { label: 'TRIPS COVERED', unit: 'TRIPS', value: 0, maxValue: 0, previousValue: 0, trend: { direction: 'stable', change: 0 } },
    west: { label: 'ON-TIME PERFORMANCE', unit: 'PERCENT', value: 0, maxValue: 100, previousValue: 0, trend: { direction: 'stable', change: 0 } }
  });
  const [loading, setLoading] = useState(true);

  // Load gauge data from backend
  useEffect(() => {
    loadGaugeData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadGaugeData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadGaugeData = async () => {
    try {
      const response = await api.getDashboardGauges();
      if (response.success && response.gauges) {
        setGaugeData(response.gauges);
      }
    } catch (error) {
      console.error('Failed to load gauge data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    // Handle quick actions from BusDisplay
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className={styles.rotaryHub}>
      {/* Bus Display - Center Top */}
      <div className={styles.commandClockContainer}>
        <BusDisplay
          planVersion={activePlan.version}
          planStatus={activePlan.status}
          activatedAt={activePlan.activatedAt}
          onQuickAction={handleQuickAction}
        />
      </div>

      {/* Cardinal Gauges */}
      <div className={styles.gaugesContainer}>
        <CardinalGauge {...gaugeData.north} direction="north" />
        <CardinalGauge {...gaugeData.east} direction="east" />
        <CardinalGauge {...gaugeData.south} direction="south" />
        <CardinalGauge {...gaugeData.west} direction="west" />
      </div>

      {/* Information Pavilion - Rotating Cards */}
      <div className={styles.pavilionContainer}>
        <InformationPavilion onNavigate={handleNavigate} />
      </div>

      {/* Decorative Concentric Ring */}
      <div className={styles.concentricRing} />

      {/* Background Decorations */}
      <div className={styles.backgroundPattern} />
    </div>
  );
};
