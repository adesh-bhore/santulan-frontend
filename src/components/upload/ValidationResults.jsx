import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './ValidationResults.module.css';

export const ValidationResults = ({ results }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { success, errors = [], warnings = [], summary } = results;

  return (
    <div className={styles.validationResults}>
      <h3 className={styles.resultsTitle}>VALIDATION RESULTS</h3>

      <div className={styles.resultsSummary}>
        {success && errors.length === 0 && (
          <div className={`${styles.resultItem} ${styles.success}`}>
            <CheckCircle className={styles.resultIcon} size={16} />
            <span>All files validated successfully</span>
          </div>
        )}

        {summary && (
          <>
            <div className={`${styles.resultItem} ${styles.success}`}>
              <CheckCircle className={styles.resultIcon} size={16} />
              <span>No duplicate entries found</span>
            </div>
            <div className={`${styles.resultItem} ${styles.success}`}>
              <CheckCircle className={styles.resultIcon} size={16} />
              <span>All foreign key references valid</span>
            </div>
          </>
        )}

        {warnings.length > 0 && (
          <div className={`${styles.resultItem} ${styles.warning}`}>
            <AlertTriangle className={styles.resultIcon} size={16} />
            <span>{warnings.length} warnings (review recommended)</span>
          </div>
        )}

        {errors.length > 0 && (
          <div className={`${styles.resultItem} ${styles.error}`}>
            <XCircle className={styles.resultIcon} size={16} />
            <span>{errors.length} errors found (must be fixed)</span>
          </div>
        )}
      </div>

      {summary && (
        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Files Processed:</span>
            <span className={styles.statValue}>{summary.filesProcessed}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Records:</span>
            <span className={styles.statValue}>{summary.totalRecords}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Duplicates:</span>
            <span className={styles.statValue}>{summary.duplicates}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Invalid References:</span>
            <span className={styles.statValue}>{summary.invalidReferences}</span>
          </div>
        </div>
      )}

      {(warnings.length > 0 || errors.length > 0) && (
        <>
          <button
            className={styles.detailsButton}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'HIDE' : 'VIEW'} DETAILED VALIDATION REPORT
          </button>

          {showDetails && (
            <div className={styles.detailsPanel}>
              {errors.length > 0 && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsHeading}>Errors</h4>
                  {errors.map((error, index) => (
                    <div key={index} className={`${styles.detailItem} ${styles.error}`}>
                      <XCircle className={styles.detailIcon} size={14} />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {warnings.length > 0 && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsHeading}>Warnings</h4>
                  {warnings.map((warning, index) => (
                    <div key={index} className={`${styles.detailItem} ${styles.warning}`}>
                      <AlertTriangle className={styles.detailIcon} size={14} />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
