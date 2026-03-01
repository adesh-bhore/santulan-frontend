import { useState, useEffect } from 'react';
import { Settings, Clock, AlertCircle, X } from 'lucide-react';
import { TSNVisualizationModal } from './TSNVisualizationModal';
import styles from './OptimizationProgress.module.css';

export const OptimizationProgress = ({ onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [stageProgress, setStageProgress] = useState({
    nodes: 0,
    edges: 0,
    trips: 0,
    solver: 0
  });
  const [showTSNModal, setShowTSNModal] = useState(false);
  const [warningMessages, setWarningMessages] = useState([]);

  console.log('OptimizationProgress - showTSNModal:', showTSNModal, 'currentStage:', currentStage, 'progress:', progress);

  const stages = [
    { id: 1, name: 'DATA LOAD', status: 'complete', time: '00:00:05' },
    { id: 2, name: 'TSN BUILD', status: 'in_progress', time: '00:00:40...' },
    { id: 3, name: 'OPTIMIZATION', status: 'pending', time: 'Est. up to 10 min' }
  ];

  const totalEstimatedTime = 600; // Up to 10 minutes for large depots

  // Simulate progress - slower for longer optimization
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          // Stay at 99% until backend completes
          return 99;
        }
        // Slow progress: reach 99% in about 8 minutes (480 seconds)
        // This gives buffer for the 10-minute backend timeout
        return prev + 1;
      });
    }, 4850); // ~99 steps * 4850ms = ~480 seconds to reach 99%

    return () => clearInterval(progressInterval);
  }, []);

  // Update elapsed time and show warnings after 120 seconds
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        
        // Show warning messages every 15 seconds after 120 seconds
        if (newTime > 120 && (newTime - 120) % 15 === 0) {
          const minutesElapsed = Math.floor(newTime / 60);
          const warningMsg = `Still processing... ${minutesElapsed} minutes elapsed. Large depots may take up to 10 minutes.`;
          setWarningMessages(prevMsgs => [...prevMsgs, { time: newTime, message: warningMsg }]);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Update stage based on progress and elapsed time
  useEffect(() => {
    if (elapsedTime < 5) {
      // Stage 1: DATA LOAD (0-5 seconds)
      setCurrentStage(1);
      setShowTSNModal(false);
    } else if (elapsedTime < 45) {
      // Stage 2: TSN BUILD (5-45 seconds = 40 seconds)
      if (currentStage !== 2) {
        setCurrentStage(2);
        // Show TSN modal when entering stage 2
        setShowTSNModal(true);
        console.log('TSN Modal should now be visible');
      }
      // Simulate TSN build progress
      const stage2Progress = Math.min(100, ((elapsedTime - 5) / 40) * 100);
      setStageProgress({
        nodes: Math.min(100, Math.floor(stage2Progress)),
        edges: Math.min(100, Math.floor(stage2Progress * 0.95)),
        trips: Math.min(100, Math.floor(stage2Progress)),
        solver: Math.min(75, Math.floor(stage2Progress * 0.75))
      });
    } else {
      // Stage 3: OPTIMIZATION (45+ seconds, can take up to 10 minutes)
      if (currentStage !== 3) {
        setCurrentStage(3);
        // Hide TSN modal when moving to stage 3
        setShowTSNModal(false);
      }
      // Update solver progress slowly
      const stage3Progress = Math.min(99, 75 + ((elapsedTime - 45) / 555) * 24); // Reach 99% at 600s
      setStageProgress(prev => ({
        ...prev,
        solver: Math.floor(stage3Progress)
      }));
    }
  }, [elapsedTime, currentStage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, totalEstimatedTime - elapsedTime);

  const handleCloseTSNModal = () => {
    setShowTSNModal(false);
  };

  return (
    <>
      {/* TSN 3D Visualization Modal */}
      <TSNVisualizationModal 
        isOpen={showTSNModal} 
        onClose={handleCloseTSNModal}
      />

      <div className={styles.optimizationProgressPanel}>
      <div className={styles.progressHeader}>
        <Settings className={styles.headerIcon} size={24} />
        <span>CALCULATION ENGINE RUNNING</span>
      </div>

      {/* Main Progress Bar */}
      <div className={styles.mainProgressContainer}>
        <div className={styles.progressStatus}>
          ENGINE STATUS: PROCESSING TIME-SPACE NETWORK
        </div>
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressShimmer}></div>
            </div>
          </div>
          <div className={styles.progressPercentage}>{progress}%</div>
        </div>
        <div className={styles.progressTiming}>
          <div className={styles.timingItem}>
            <Clock size={14} />
            <span>Elapsed: {formatTime(elapsedTime)}</span>
          </div>
          <div className={styles.timingSeparator}>│</div>
          <div className={styles.timingItem}>
            <span>Remaining: {formatTime(remainingTime)}</span>
          </div>
          <div className={styles.timingSeparator}>│</div>
          <div className={styles.timingItem}>
            <span>Total: ~{formatTime(totalEstimatedTime)}</span>
          </div>
        </div>
      </div>

      {/* Stage Indicators */}
      <div className={styles.stagesGrid}>
        {stages.map(stage => (
          <div 
            key={stage.id}
            className={`${styles.stageCard} ${styles[stage.status]}`}
            data-active={currentStage === stage.id}
          >
            <div className={styles.stageIcon}>
              {stage.status === 'complete' && '✓'}
              {stage.status === 'in_progress' && '⚙'}
              {stage.status === 'pending' && '○'}
            </div>
            <div className={styles.stageName}>STAGE {stage.id}</div>
            <div className={styles.stageTitle}>{stage.name}</div>
            <div className={styles.stageStatus}>
              {stage.status === 'complete' && 'Complete'}
              {stage.status === 'in_progress' && 'In Progress'}
              {stage.status === 'pending' && 'Pending'}
            </div>
            <div className={styles.stageTime}>{stage.time}</div>
          </div>
        ))}
      </div>

      {/* Current Operation Details */}
      {currentStage === 2 && (
        <div className={styles.operationDetails}>
          <div className={styles.operationTitle}>CURRENT OPERATION:</div>
          <div className={styles.operationDescription}>
            Building time-space network graph...
          </div>
          
          <div className={styles.operationMetrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Nodes Created:</span>
              <span className={styles.metricValue}>
                {Math.floor(stageProgress.nodes * 50)} / ~5,000
              </span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Edges Generated:</span>
              <span className={styles.metricValue}>
                {Math.floor(stageProgress.edges * 200)} / ~20,000
              </span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Trip Coverage:</span>
              <span className={styles.metricValue}>
                {stageProgress.trips}% (450/450 trips)
              </span>
            </div>
          </div>

          {/* Mini Gauges */}
          <div className={styles.miniGauges}>
            {[
              { label: 'NODES', value: stageProgress.nodes },
              { label: 'EDGES', value: stageProgress.edges },
              { label: 'TRIPS', value: stageProgress.trips },
              { label: 'SOLVER', value: stageProgress.solver }
            ].map(gauge => (
              <div key={gauge.label} className={styles.miniGauge}>
                <div className={styles.gaugeCircle}>
                  <svg viewBox="0 0 36 36" className={styles.gaugeSvg}>
                    <path
                      className={styles.gaugeBackground}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles.gaugeFill}
                      strokeDasharray={`${gauge.value}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className={styles.gaugeValue}>{gauge.value}%</div>
                </div>
                <div className={styles.gaugeLabel}>{gauge.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage 3: Optimization Details */}
      {currentStage === 3 && (
        <div className={styles.operationDetails}>
          <div className={styles.operationTitle}>CURRENT OPERATION:</div>
          <div className={styles.operationDescription}>
            Running OR-Tools CP-SAT solver... This may take several minutes for large depots.
          </div>
          
          <div className={styles.operationMetrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Solver Progress:</span>
              <span className={styles.metricValue}>
                {stageProgress.solver}%
              </span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Status:</span>
              <span className={styles.metricValue}>
                {stageProgress.solver < 99 ? 'SEARCHING FOR OPTIMAL SOLUTION' : 'FINALIZING...'}
              </span>
            </div>
          </div>

          {/* Single Solver Gauge */}
          <div className={styles.miniGauges} style={{ justifyContent: 'center' }}>
            <div className={styles.miniGauge}>
              <div className={styles.gaugeCircle} style={{ width: '120px', height: '120px' }}>
                <svg viewBox="0 0 36 36" className={styles.gaugeSvg}>
                  <path
                    className={styles.gaugeBackground}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={styles.gaugeFill}
                    strokeDasharray={`${stageProgress.solver}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className={styles.gaugeValue} style={{ fontSize: '20px' }}>{stageProgress.solver}%</div>
              </div>
              <div className={styles.gaugeLabel}>SOLVER PROGRESS</div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Messages */}
      <div className={styles.warningMessage}>
        <AlertCircle size={16} />
        <span>DO NOT CLOSE WINDOW - Optimization in progress</span>
      </div>

      {/* Progress Warning Messages (after 120 seconds) */}
      {warningMessages.length > 0 && (
        <div className={styles.progressWarnings}>
          <div className={styles.warningsTitle}>PROGRESS UPDATES:</div>
          {warningMessages.slice(-3).map((msg, idx) => (
            <div key={idx} className={styles.warningItem}>
              <Clock size={14} />
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.progressActions}>
        <button 
          className={`${styles.progressActionBtn} ${styles.secondary}`}
          onClick={() => setShowTSNModal(true)}
        >
          TEST TSN MODAL
        </button>
        <button className={`${styles.progressActionBtn} ${styles.secondary}`}>
          VIEW DETAILED LOG
        </button>
        <button 
          className={`${styles.progressActionBtn} ${styles.danger}`}
          onClick={onCancel}
        >
          <X size={16} />
          CANCEL OPTIMIZATION
        </button>
      </div>
    </div>
    </>
  );
};
