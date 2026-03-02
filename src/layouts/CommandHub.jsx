import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@context/AppContext';
import { BusDisplay } from '../components/hub/BusDisplay';
import { Activity, TrendingUp, Database, FileText } from 'lucide-react';
import Lottie from 'lottie-react';
import busAnimation from '../assets/buses.json';
import api from '../services/api';
import styles from './CommandHub.module.css';

export const CommandHub = () => {
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
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadGaugeData();
    const interval = setInterval(loadGaugeData, 30000);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const loadGaugeData = async () => {
    try {
      setError(null);
      const response = await api.getDashboardGauges();
      console.log('CommandHub: Gauge data received:', response);
      if (response.success && response.gauges) {
        setGaugeData(response.gauges);
      }
    } catch (err) {
      console.error('Failed to load gauge data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const navigationCards = [
    {
      id: 'dashboard',
      title: 'Command Center',
      description: 'Real-time fleet operations overview',
      icon: Activity,
      route: '/home'
    },
    {
      id: 'optimize',
      title: 'Optimization Engine',
      description: 'AI-powered resource allocation',
      icon: TrendingUp,
      route: '/optimize'
    },
    {
      id: 'data',
      title: 'Data Management',
      description: 'Upload and manage system data',
      icon: Database,
      route: '/data'
    },
    {
      id: 'reports',
      title: 'Analytics & Reports',
      description: 'Generate operational insights',
      icon: FileText,
      route: '/reports'
    }
  ];

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
      year: 'numeric',
      weekday: 'long'
    }).toUpperCase();
  };

  const getTrendIcon = (direction) => {
    if (direction === 'up') return '↑';
    if (direction === 'down') return '↓';
    return '→';
  };

  return (
    <div className={styles.commandHub}>
      {/* Header Bar */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Lottie 
                animationData={busAnimation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className={styles.logoText}>
              <div className={styles.logoTitle}>SANTULAN</div>
              <div className={styles.logoSubtitle}>PMPML Command Center</div>
            </div>
          </div>

          
          <div className={styles.timeDisplay}>
            <div className={styles.time}>{formatTime(currentTime)}</div>
            <div className={styles.date}>{formatDate(currentTime)}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {loading ? (
          <div className={styles.loadingState}>Loading operational metrics...</div>
        ) : error ? (
          <div className={styles.errorState}>
            <div>⚠ Error loading data: {error}</div>
            <button className={styles.retryButton} onClick={loadGaugeData}>
              Retry Connection
            </button>
          </div>
        ) : (
          <>
          {/* Bus Display in Center */}
          <div className={styles.busDisplayContainer}>
            <BusDisplay
              planVersion={activePlan.version || 'N/A'}
              planStatus={activePlan.status || 'STANDBY'}
              activatedAt={activePlan.activatedAt ? new Date(activePlan.activatedAt).toLocaleDateString('en-IN') : null}
              onQuickAction={(action) => console.log('Quick action:', action)}
            />
          </div>
          
            

            {/* Navigation Cards */}
            <div className={styles.navigationGrid}>
              {navigationCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    className={styles.navCard}
                    onClick={() => navigate(card.route)}
                  >
                    <div className={styles.navCardIcon}>
                      <Icon size={28} strokeWidth={2.5} />
                    </div>
                    <div className={styles.navCardContent}>
                      <h3 className={styles.navCardTitle}>{card.title}</h3>
                      <p className={styles.navCardDescription}>{card.description}</p>
                    </div>
                    <div className={styles.navCardArrow}>→</div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span>© 2024 PMPML TransitPulse</span>
          <span className={styles.footerDivider}>|</span>
          <span>AI-Powered Optimization System</span>
          <span className={styles.footerDivider}>|</span>
          <span>Version 1.0.0</span>
        </div>
      </footer>
    </div>
  );
};
