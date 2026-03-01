import { useState } from 'react';
import { FolderOpen, Map, Bus, User, Building, Clock, FileText, MapPin } from 'lucide-react';
import { PageLayout } from '../layouts/PageLayout';
import { RegistryStatusDashboard } from '../components/upload/RegistryStatusDashboard';
import { UploadCard } from '../components/upload/UploadCard';
import { ValidationResults } from '../components/upload/ValidationResults';
import { api } from '../services/api';
import styles from './DataUploadPage.module.css';

const FILE_TYPES = [
  { 
    id: 'depots', 
    label: 'FILE 1: DEPOT REGISTRY (depots.csv)', 
    filename: 'Depots.csv', 
    icon: <Building size={16} />,
    currentCount: 4,
    lastUpdate: '01-Jan-26'
  },
  { 
    id: 'routes', 
    label: 'FILE 2: ROUTE REGISTRY (routes.csv)', 
    filename: 'Routes.csv', 
    icon: <Map size={16} />,
    currentCount: 125,
    lastUpdate: '28-Jan-2026'
  },
  { 
    id: 'stops', 
    label: 'FILE 3: STOP REGISTRY (stops.csv)', 
    filename: 'Stops.csv', 
    icon: <MapPin size={16} />,
    currentCount: 450,
    lastUpdate: '28-Jan-2026'
  },
  { 
    id: 'vehicles', 
    label: 'FILE 4: VEHICLE REGISTRY (vehicles.csv)', 
    filename: 'Vehicles.csv', 
    icon: <Bus size={16} />,
    currentCount: 127,
    lastUpdate: '28-Jan-2026'
  },
  { 
    id: 'drivers', 
    label: 'FILE 5: DRIVER REGISTRY (drivers.csv)', 
    filename: 'Drivers.csv', 
    icon: <User size={16} />,
    currentCount: 145,
    lastUpdate: '15-Jan-2026'
  },
  { 
    id: 'timetable', 
    label: 'FILE 6: TIMETABLE REGISTRY (timetable.csv)', 
    filename: 'Timetable.csv', 
    icon: <Clock size={16} />,
    currentCount: 450,
    lastUpdate: '28-Jan-2026'
  },
];

export const DataUploadPage = () => {
  const [uploads, setUploads] = useState({});
  const [validationResults, setValidationResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({});

  const handleFileSelect = async (fileType, file) => {
    if (!file) {
      // Remove file
      const newUploads = { ...uploads };
      delete newUploads[fileType];
      setUploads(newUploads);
      return;
    }

    // Set uploading state
    setUploadingFiles(prev => ({ ...prev, [fileType]: true }));

    try {
      // Upload to backend
      const result = await api.uploadData(fileType, file);
      
      // Build validation items from backend response
      const validationItems = [];
      
      // Success message
      validationItems.push({
        type: 'success',
        message: `${result.records_inserted} records uploaded successfully`
      });
      
      // Add warnings if any
      if (result.warnings && result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          validationItems.push({
            type: 'warning',
            message: warning
          });
        });
      }
      
      // Add errors if any (shouldn't happen on success, but just in case)
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(error => {
          validationItems.push({
            type: 'error',
            message: error
          });
        });
      }

      // Update uploads state with successful upload
      setUploads(prev => ({
        ...prev,
        [fileType]: {
          file,
          status: 'uploaded',
          timestamp: new Date().toISOString(),
          uploadedAgo: 'just now',
          rowCount: result.records_inserted,
          validation: {
            items: validationItems
          },
          conflicts: [],
          backendResult: result
        }
      }));

    } catch (error) {
      console.error('Upload error:', error);
      
      // Build error validation items
      const validationItems = [
        {
          type: 'error',
          message: error.message || 'Upload failed'
        }
      ];
      
      // Add specific errors if available
      if (error.errors && error.errors.length > 0) {
        error.errors.forEach(err => {
          validationItems.push({
            type: 'error',
            message: err
          });
        });
      }
      
      // Add warnings if available
      if (error.warnings && error.warnings.length > 0) {
        error.warnings.forEach(warning => {
          validationItems.push({
            type: 'warning',
            message: warning
          });
        });
      }

      // Update uploads state with failed upload
      setUploads(prev => ({
        ...prev,
        [fileType]: {
          file,
          status: 'error',
          timestamp: new Date().toISOString(),
          uploadedAgo: 'just now',
          rowCount: 0,
          validation: {
            items: validationItems
          },
          conflicts: [],
          error: error.message
        }
      }));
    } finally {
      setUploadingFiles(prev => {
        const newState = { ...prev };
        delete newState[fileType];
        return newState;
      });
    }
  };

  const handleValidate = async () => {
    // Validation happens automatically on upload now
    // This can be used for a final check or summary
    setIsProcessing(true);
    
    setTimeout(() => {
      const allErrors = [];
      const allWarnings = [];
      let totalRecords = 0;
      
      Object.values(uploads).forEach(upload => {
        if (upload.backendResult) {
          totalRecords += upload.backendResult.records_inserted;
          if (upload.backendResult.errors) {
            allErrors.push(...upload.backendResult.errors);
          }
          if (upload.backendResult.warnings) {
            allWarnings.push(...upload.backendResult.warnings);
          }
        }
      });
      
      setValidationResults({
        success: allErrors.length === 0,
        errors: allErrors,
        warnings: allWarnings,
        summary: {
          filesProcessed: Object.keys(uploads).length,
          totalRecords: totalRecords,
          duplicates: 0,
          invalidReferences: 0,
        }
      });
      setIsProcessing(false);
    }, 500);
  };

  const handleProceed = () => {
    console.log('All files uploaded successfully!');
    // Navigate to optimization or show success message
    alert('All data uploaded successfully! You can now proceed to optimization.');
  };

  const allFilesUploaded = FILE_TYPES.every(type => uploads[type.id] && uploads[type.id].status === 'uploaded');
  const hasErrors = Object.values(uploads).some(u => u.status === 'error');
  const uploadedCount = Object.keys(uploads).filter(key => uploads[key].status === 'uploaded').length;
  const totalRecords = Object.values(uploads).reduce((sum, u) => sum + (u.rowCount || 0), 0);
  const totalConflicts = 0; // Backend handles conflicts automatically
  const isUploading = Object.keys(uploadingFiles).length > 0;

  return (
    <PageLayout
      title="Data Registry Management Center"
      subtitle="Archive, validate, and manage official PMPML fleet records"
      breadcrumbPath="Data Upload"
    >
      {/* <RegistryStatusDashboard /> */}

      <div className={styles.fileUploadArchive}>
        <h2 className={styles.archiveSectionTitle}>
          <FolderOpen size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          FLEET RECORDS ARCHIVE - UPLOAD NEW REGISTRY FILES
        </h2>

        <div className={styles.uploadCardsGrid}>
          {FILE_TYPES.map(fileType => (
            <UploadCard
              key={fileType.id}
              fileType={fileType}
              upload={uploads[fileType.id]}
              isUploading={uploadingFiles[fileType.id]}
              onFileSelect={(file) => handleFileSelect(fileType.id, file)}
            />
          ))}
        </div>

        {uploadedCount > 0 && (
          <div className={styles.uploadSummaryPanel}>
            <div className={styles.summaryPanelHeader}>
              <FileText size={18} style={{ display: 'inline', marginRight: '8px' }} />
              UPLOAD SUMMARY & VALIDATION RESULTS
            </div>

            <div className={styles.summaryStatsGrid}>
              <div className={styles.summaryStat}>
                <span className={styles.summaryStatLabel}>Files Ready:</span>
                <span className={styles.summaryStatValue}>{uploadedCount} of {FILE_TYPES.length}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryStatLabel}>Total New Records:</span>
                <span className={styles.summaryStatValue}>{totalRecords}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryStatLabel}>Conflicts to Resolve:</span>
                <span className={styles.summaryStatValue} data-status="warning">{totalConflicts}</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryStatLabel}>Validation Warnings:</span>
                <span className={styles.summaryStatValue} data-status="warning">
                  {validationResults ? validationResults.warnings.length : 0}
                </span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryStatLabel}>Validation Errors:</span>
                <span className={styles.summaryStatValue}>0</span>
              </div>
            </div>

            <div className={styles.summaryPanelActions}>
              <button
                className={`${styles.summaryActionBtn} ${styles.primary}`}
                onClick={handleProceed}
                disabled={!allFilesUploaded || hasErrors || isUploading}
              >
                {isUploading ? 'UPLOADING...' : 'ALL FILES UPLOADED - PROCEED'}
              </button>
              <button 
                className={styles.summaryActionBtn}
                disabled={isUploading}
              >
                SAVE AS DRAFT
              </button>
              <button 
                className={`${styles.summaryActionBtn} ${styles.cancel}`}
                disabled={isUploading}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>

      {validationResults && (
        <ValidationResults results={validationResults} />
      )}
    </PageLayout>
  );
};
