import { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import styles from './OptimizationConfig.module.css';

export const OptimizationConfig = ({ config, onChange, onStart, isDataReady = true }) => {
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const objectives = [
    {
      id: 'balanced',
      title: 'BALANCED APPROACH',
      features: [
        'Min vehicles',
        'Balanced hrs',
        'Good coverage'
      ],
      description: '✓ RECOMMENDED',
      recommended: true
    },
    {
      id: 'cost',
      title: 'MINIMIZE COST',
      features: [
        'Lowest fuel',
        'Fewer buses',
        'Cost priority'
      ],
      description: 'Budget Focus'
    },
    {
      id: 'coverage',
      title: 'MAXIMIZE COVERAGE',
      features: [
        'All trips',
        'Max backup',
        'Extra cap'
      ],
      description: 'Peak Hours'
    }
  ];

  const handleObjectiveChange = (objectiveId) => {
    onChange({ objective: objectiveId });
  };

  const handleInputChange = (field, value) => {
    // Validate input
    const errors = { ...validationErrors };
    
    if (field === 'maxHours') {
      if (value < 6 || value > 10) {
        errors.maxHours = 'Max hours must be between 6 and 10';
      } else {
        delete errors.maxHours;
      }
    }
    
    if (field === 'breakDuration') {
      if (value < 15 || value > 60) {
        errors.breakDuration = 'Break duration must be between 15 and 60 minutes';
      } else {
        delete errors.breakDuration;
      }
    }
    
    setValidationErrors(errors);
    onChange({ [field]: value });
  };

  const handleReset = () => {
    onChange({
      objective: 'balanced',
      maxHours: 8.0,
      breakDuration: 30,
      maxContinuousDriving: 4.0,
      allowOvertime: false,
      forceAllVehicles: false,
      allowDeadhead: true,
      maxDeadheadDistance: 25,
      depotReturnMandatory: true,
      mustCoverAllRoutes: true,
      allowRouteSkipping: false,
      peakHourPriority: true
    });
  };

  return (
    <div className={styles.engineConfigurationPanel}>
      <div className={styles.configSectionTitle}>
        <Settings size={24} />
        OPTIMIZATION ENGINE CONFIGURATION
      </div>

      {/* Objective Selection */}
      <div className={styles.objectiveSelectionBox}>
        <div className={styles.objectiveBoxTitle}>
          OPTIMIZATION OBJECTIVE (Select Primary Goal)
        </div>
        <div className={styles.objectiveCardsGrid}>
          {objectives.map(obj => (
            <div
              key={obj.id}
              className={`${styles.objectiveCard} ${
                config.objective === obj.id ? styles.selected : ''
              } ${obj.recommended ? styles.recommended : ''}`}
              onClick={() => handleObjectiveChange(obj.id)}
            >
              <div className={styles.objectiveCardHeader}>
                <div className={styles.objectiveRadio}></div>
                <div className={styles.objectiveCardTitle}>{obj.title}</div>
              </div>
              <div className={styles.objectiveFeatures}>
                {obj.features.map((feature, index) => (
                  <div key={index} className={styles.objectiveFeature}>
                    {feature}
                  </div>
                ))}
              </div>
              <div className={styles.objectiveDescription}>
                {obj.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constraints Panel */}
      <div className={styles.constraintsPanel}>
        <div className={styles.constraintsTitle}>
          CONSTRAINTS & PARAMETERS
        </div>

        {/* Driver Duty Constraints */}
        <div className={styles.constraintGroup}>
          <div className={styles.constraintGroupTitle}>Driver Duty Constraints:</div>
          <div className={styles.constraintItems}>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Max Hours per Shift:</div>
              <div className={styles.constraintInput}>
                <input
                  type="number"
                  min="6"
                  max="10"
                  step="0.5"
                  value={config.maxHours}
                  onChange={(e) => handleInputChange('maxHours', parseFloat(e.target.value))}
                  className={validationErrors.maxHours ? styles.inputError : ''}
                />
                <span className={styles.constraintUnit}>hours</span>
              </div>
              {validationErrors.maxHours && (
                <div className={styles.validationError}>{validationErrors.maxHours}</div>
              )}
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Mandatory Break Duration:</div>
              <div className={styles.constraintInput}>
                <input
                  type="number"
                  min="15"
                  max="60"
                  step="5"
                  value={config.breakDuration}
                  onChange={(e) => handleInputChange('breakDuration', parseInt(e.target.value))}
                  className={validationErrors.breakDuration ? styles.inputError : ''}
                />
                <span className={styles.constraintUnit}>minutes</span>
              </div>
              {validationErrors.breakDuration && (
                <div className={styles.validationError}>{validationErrors.breakDuration}</div>
              )}
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Max Continuous Driving:</div>
              <div className={styles.constraintInput}>
                <input
                  type="number"
                  min="2"
                  max="6"
                  step="0.5"
                  value={config.maxContinuousDriving}
                  onChange={(e) => handleInputChange('maxContinuousDriving', parseFloat(e.target.value))}
                />
                <span className={styles.constraintUnit}>hours</span>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Allow Overtime:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.allowOvertime}
                  onChange={(e) => handleInputChange('allowOvertime', e.target.checked)}
                />
                <label>Yes (max 1 hour)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Constraints */}
        <div className={styles.constraintGroup}>
          <div className={styles.constraintGroupTitle}>Vehicle Constraints:</div>
          <div className={styles.constraintItems}>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Force All Vehicles Used:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.forceAllVehicles}
                  onChange={(e) => handleInputChange('forceAllVehicles', e.target.checked)}
                />
                <label>Yes</label>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Allow Deadhead Moves:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.allowDeadhead}
                  onChange={(e) => handleInputChange('allowDeadhead', e.target.checked)}
                />
                <label>Yes (empty repositioning)</label>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Max Deadhead Distance:</div>
              <div className={styles.constraintInput}>
                <input
                  type="number"
                  min="5"
                  max="50"
                  step="5"
                  value={config.maxDeadheadDistance}
                  onChange={(e) => handleInputChange('maxDeadheadDistance', parseInt(e.target.value))}
                />
                <span className={styles.constraintUnit}>km</span>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Depot Return Mandatory:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.depotReturnMandatory}
                  onChange={(e) => handleInputChange('depotReturnMandatory', e.target.checked)}
                />
                <label>Yes (end of day)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Route Coverage */}
        <div className={styles.constraintGroup}>
          <div className={styles.constraintGroupTitle}>Route Coverage:</div>
          <div className={styles.constraintItems}>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Must Cover All Routes:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.mustCoverAllRoutes}
                  onChange={(e) => handleInputChange('mustCoverAllRoutes', e.target.checked)}
                />
                <label>Yes (450 trips)</label>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Allow Route Skipping:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.allowRouteSkipping}
                  onChange={(e) => handleInputChange('allowRouteSkipping', e.target.checked)}
                />
                <label>Only if infeasible</label>
              </div>
            </div>
            <div className={styles.constraintItem}>
              <div className={styles.constraintLabel}>Peak Hour Priority:</div>
              <div className={styles.constraintInput}>
                <input
                  type="checkbox"
                  checked={config.peakHourPriority}
                  onChange={(e) => handleInputChange('peakHourPriority', e.target.checked)}
                />
                <label>Yes (6-9 AM, 5-8 PM)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Constraint Actions */}
        <div className={styles.constraintActions}>
          <button className={styles.constraintActionBtn} onClick={handleReset}>
            RESET TO DEFAULTS
          </button>
          <button className={styles.constraintActionBtn}>
            LOAD SAVED PRESET
          </button>
        </div>
      </div>

      {/* Advanced Options Accordion */}
      <div className={styles.advancedOptionsAccordion}>
        <div
          className={styles.accordionHeader}
          data-expanded={isAdvancedExpanded}
          onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
        >
          <span>ADVANCED OPTIONS (Optional)</span>
          <span className={styles.accordionIcon}>⊞</span>
        </div>
        <div className={styles.accordionContent}>
          <div className={styles.accordionInner}>
            <p>Advanced optimization settings will be available in future updates.</p>
          </div>
        </div>
      </div>

      {/* Estimation Display */}
      <div className={styles.estimationDisplay}>
        <div className={styles.estimationItem}>
          <div className={styles.estimationLabel}>ESTIMATED RUN TIME:</div>
          <div className={styles.estimationValue}>2-4 minutes</div>
        </div>
        <div className={styles.estimationItem}>
          <div className={styles.estimationLabel}>EXPECTED IMPROVEMENT:</div>
          <div className={styles.estimationValue}>5-12%</div>
        </div>
      </div>

      {/* Configuration Actions */}
      <div className={styles.configMainActions}>
        <button
          className={`${styles.configActionBtn} ${styles.primary}`}
          onClick={onStart}
          disabled={!isDataReady || Object.keys(validationErrors).length > 0}
        >
          START OPTIMIZATION ENGINE
        </button>
        <button className={`${styles.configActionBtn} ${styles.secondary}`}>
          <Save size={16} />
          SAVE CONFIGURATION
        </button>
        <button className={`${styles.configActionBtn} ${styles.secondary}`}>
          <X size={16} />
          CANCEL
        </button>
      </div>
    </div>
  );
};
