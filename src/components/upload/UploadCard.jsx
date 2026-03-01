import { useRef, useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, XCircle, Eye, Trash2, Loader } from 'lucide-react';
import styles from './UploadCard.module.css';

export const UploadCard = ({ fileType, upload, isUploading, onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file) => {
    // Validate file type - only CSV allowed for backend
    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    onFileSelect(file);
  };

  const handleButtonClick = () => {
    if (isUploading) return; // Prevent clicking while uploading
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isUploading) return; // Prevent dropping while uploading
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleRemove = () => {
    if (isUploading) return; // Prevent removing while uploading
    onFileSelect(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={styles.uploadFileCard}
      data-state={isUploading ? 'uploading' : upload ? 'uploaded' : 'empty'}
    >
      <div className={styles.uploadCardHeader}>
        <div className={styles.uploadCardTitle}>
          <span className={styles.uploadCardIcon}>{fileType.icon}</span>
          {fileType.label}
        </div>
        <div className={styles.uploadCardBadge}>REQUIRED</div>
      </div>

      <div className={styles.uploadCardContent}>
        {isUploading ? (
          <div className={styles.uploadingState}>
            <Loader className={styles.uploadingSpinner} size={36} />
            <div className={styles.uploadingText}>UPLOADING TO SERVER...</div>
            <div className={styles.uploadingSubtext}>Validating and processing data</div>
          </div>
        ) : !upload ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className={styles.fileInputHidden}
            />
            
            <div 
              className={`${styles.fileDropZone} ${isDragging ? styles.dragover : ''}`}
              onClick={handleButtonClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FileText className={styles.dropZoneIcon} size={36} />
              <div className={styles.dropZoneText}>DRAG & DROP FILE HERE</div>
              <div className={styles.dropZoneSubtext}>or click to browse</div>
              <div className={styles.dropZoneSpecs}>
                Accepted: .csv (max 5MB)
                <br />
                <a href="#" className={styles.downloadTemplateLink}>
                  Download Sample {fileType.filename}
                </a>
              </div>
            </div>

            <div className={styles.currentRegistryInfo}>
              Current Registry: {fileType.currentCount || 0} entries (Updated: {fileType.lastUpdate || 'N/A'})
            </div>

            <div className={styles.uploadCardActions}>
              <button className={`${styles.uploadCardBtn} ${styles.secondary}`}>
                PREVIEW CURRENT
              </button>
              <button className={`${styles.uploadCardBtn} ${styles.secondary}`}>
                DOWNLOAD TEMPLATE
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.uploadedFileDisplay}>
              {upload.status === 'error' ? (
                <XCircle className={styles.uploadedFileIcon} size={24} style={{ color: '#d32f2f' }} />
              ) : (
                <CheckCircle className={styles.uploadedFileIcon} size={24} />
              )}
              <div className={styles.uploadedFileInfo}>
                <div className={styles.uploadedFileName}>{upload.file.name}</div>
                <div className={styles.uploadedFileMeta}>
                  <span>{formatFileSize(upload.file.size)}</span>
                  {upload.status === 'uploaded' && <span>{upload.rowCount || 0} rows</span>}
                  <span>Uploaded: {upload.uploadedAgo || 'just now'}</span>
                </div>
              </div>
              <div className={styles.uploadedFileActions}>
                <button className={styles.fileActionBtn} title="View">
                  <Eye size={14} />
                </button>
                <button 
                  className={`${styles.fileActionBtn} ${styles.remove}`}
                  onClick={handleRemove}
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {upload.validation && (
              <div className={styles.validationPreviewBox}>
                <div className={styles.validationPreviewHeader}>
                  INSTANT VALIDATION PREVIEW
                </div>
                <div className={styles.validationItems}>
                  {upload.validation.items?.map((item, index) => (
                    <div 
                      key={index}
                      className={styles.validationItem}
                      data-type={item.type}
                    >
                      <span className={styles.validationIcon}>
                        {item.type === 'success' && <CheckCircle size={12} />}
                        {item.type === 'warning' && <AlertTriangle size={12} />}
                        {item.type === 'error' && <XCircle size={12} />}
                      </span>
                      <span className={styles.validationText}>{item.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upload.conflicts && upload.conflicts.length > 0 && (
              <div className={styles.conflictResolutionBox}>
                <div className={styles.conflictHeader}>
                  SMART CONFLICT DETECTION
                </div>
                <div className={styles.conflictItems}>
                  {upload.conflicts.slice(0, 2).map((conflict, index) => (
                    <div key={index} className={styles.conflictItem}>
                      <div className={styles.conflictItemHeader}>
                        {conflict.title}
                      </div>
                      <div className={styles.conflictComparison}>
                        <div className={styles.conflictValueBox}>
                          <div className={styles.conflictLabel}>CURRENT</div>
                          <div className={styles.conflictValue}>{conflict.current}</div>
                        </div>
                        <div className={styles.conflictArrow}>→</div>
                        <div className={styles.conflictValueBox}>
                          <div className={styles.conflictLabel}>NEW FILE</div>
                          <div className={styles.conflictValue}>{conflict.new}</div>
                        </div>
                      </div>
                      <div className={styles.conflictResolutionOptions}>
                        <label className={`${styles.conflictOption} ${styles.selected}`}>
                          <input type="radio" name={`conflict-${index}`} defaultChecked />
                          <span className={styles.conflictOptionLabel}>Keep New</span>
                        </label>
                        <label className={styles.conflictOption}>
                          <input type="radio" name={`conflict-${index}`} />
                          <span className={styles.conflictOptionLabel}>Keep Current</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  {upload.conflicts.length > 2 && (
                    <div className={styles.moreConflicts}>
                      +{upload.conflicts.length - 2} more conflicts [SHOW ALL]
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.uploadCardActions}>
              <button className={`${styles.uploadCardBtn} ${styles.primary}`}>
                FIX ISSUES AUTOMATICALLY
              </button>
              <button className={`${styles.uploadCardBtn} ${styles.secondary}`}>
                VIEW DETAILED REPORT
              </button>
              <button className={`${styles.uploadCardBtn} ${styles.secondary}`}>
                REPLACE CURRENT ▼
              </button>
              <button className={`${styles.uploadCardBtn} ${styles.secondary}`}>
                MERGE WITH CURRENT ▼
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
