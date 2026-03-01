import { useState, useEffect } from 'react';
import { FileText, Calendar, CheckSquare, FileSpreadsheet, Loader } from 'lucide-react';
import api from '../../services/api';
import styles from './ReportGenerator.module.css';

export const ReportGenerator = ({ onGenerate, loading }) => {
  const [config, setConfig] = useState({
    reportType: 'Daily Operations Summary',
    dateFrom: new Date().toISOString().split('T')[0],
    dateTo: new Date().toISOString().split('T')[0],
    depotId: '',
    includeCharts: true,
    includeSummary: true,
    format: 'pdf'
  });
  const [depots, setDepots] = useState([]);

  // Load depots on mount
  useEffect(() => {
    loadDepots();
  }, []);

  const loadDepots = async () => {
    try {
      const response = await api.getDepots();
      if (response.success && response.depots) {
        setDepots(response.depots);
      }
    } catch (err) {
      console.error('Failed to load depots:', err);
    }
  };

  const reportTypes = [
    'Daily Operations Summary',
    'Monthly Fleet Report',
    'Driver Duty Report',
    'Route Performance',
    'Fuel Consumption Report',
    'Plan History Report'
  ];

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate date range
    if (new Date(config.dateFrom) > new Date(config.dateTo)) {
      alert('Start date must be before or equal to end date');
      return;
    }
    
    onGenerate(config);
  };

  return (
    <div className={styles.reportGeneratorPanel}>
      <div className={styles.panelHeader}>
        <FileText size={24} />
        <span>GENERATE NEW REPORT</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.reportForm}>
        {/* Report Type */}
        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            <FileText size={16} />
            REPORT TYPE
          </label>
          <select
            className={styles.formSelect}
            value={config.reportType}
            onChange={(e) => handleChange('reportType', e.target.value)}
            disabled={loading}
          >
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Depot Selection */}
        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            <FileText size={16} />
            DEPOT (Optional)
          </label>
          <select
            className={styles.formSelect}
            value={config.depotId}
            onChange={(e) => handleChange('depotId', e.target.value)}
            disabled={loading}
          >
            <option value="">All Depots</option>
            {depots.map(depot => (
              <option key={depot.depot_id} value={depot.depot_id}>
                {depot.depot_name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            <Calendar size={16} />
            DATE RANGE
          </label>
          <div className={styles.dateRangeInputs}>
            <div className={styles.dateInput}>
              <label className={styles.dateLabel}>From:</label>
              <input
                type="date"
                className={styles.formDatePicker}
                value={config.dateFrom}
                onChange={(e) => handleChange('dateFrom', e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.dateInput}>
              <label className={styles.dateLabel}>To:</label>
              <input
                type="date"
                className={styles.formDatePicker}
                value={config.dateTo}
                onChange={(e) => handleChange('dateTo', e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Include Options */}
        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            <CheckSquare size={16} />
            INCLUDE IN REPORT
          </label>
          <div className={styles.checkboxGrid}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={config.includeCharts}
                onChange={(e) => handleChange('includeCharts', e.target.checked)}
                disabled={loading}
              />
              <span>Charts & Visualizations</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={config.includeSummary}
                onChange={(e) => handleChange('includeSummary', e.target.checked)}
                disabled={loading}
              />
              <span>Executive Summary</span>
            </label>
          </div>
        </div>

        {/* Format Selection */}
        <div className={styles.formSection}>
          <label className={styles.formLabel}>
            <FileSpreadsheet size={16} />
            OUTPUT FORMAT
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={config.format === 'pdf'}
                onChange={(e) => handleChange('format', e.target.value)}
                disabled={loading}
              />
              <span>PDF Document</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="format"
                value="excel"
                checked={config.format === 'excel'}
                onChange={(e) => handleChange('format', e.target.value)}
                disabled={loading}
              />
              <span>Excel Spreadsheet</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="format"
                value="both"
                checked={config.format === 'both'}
                onChange={(e) => handleChange('format', e.target.value)}
                disabled={loading}
              />
              <span>Both (PDF + Excel)</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button 
          type="submit" 
          className={styles.generateBtn}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader size={20} className={styles.spinner} />
              GENERATING...
            </>
          ) : (
            <>
              <FileText size={20} />
              GENERATE REPORT
            </>
          )}
        </button>
      </form>
    </div>
  );
};
