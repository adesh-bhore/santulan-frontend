import { FileText, Download, FileSpreadsheet, Clock, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import styles from './RecentReports.module.css';

export const RecentReports = ({ reports, loading, onRefresh }) => {
  const handleDownload = async (report, file) => {
    try {
      // Extract report ID from download URL
      const reportId = file.download_url.split('/').pop();
      
      // In production, this would download the actual file
      // For now, show a message since backend returns 501
      alert(`Download functionality coming soon!\n\nReport: ${file.filename}\nFormat: ${file.format}\nSize: ${formatBytes(file.size_bytes)}`);
      
      // Uncomment when backend implements file download:
      // const blob = await api.downloadReport(reportId);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = file.filename;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      alert(`Failed to download report: ${err.message}`);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getReportTypeName = (reportType) => {
    const names = {
      'daily_operations': 'Daily Operations',
      'monthly_fleet': 'Monthly Fleet',
      'driver_duty': 'Driver Duty',
      'route_performance': 'Route Performance',
      'fuel_consumption': 'Fuel Consumption',
      'plan_history': 'Plan History'
    };
    return names[reportType] || reportType;
  };

  if (loading && (!reports || reports.length === 0)) {
    return (
      <div className={styles.recentReportsPanel}>
        <div className={styles.panelHeader}>
          <Clock size={24} />
          <span>RECENT REPORTS</span>
        </div>
        <div className={styles.loadingState}>
          <RefreshCw size={48} className={styles.spinner} />
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className={styles.recentReportsPanel}>
        <div className={styles.panelHeader}>
          <Clock size={24} />
          <span>RECENT REPORTS</span>
          {onRefresh && (
            <button 
              className={styles.refreshBtn}
              onClick={onRefresh}
              disabled={loading}
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
        <div className={styles.emptyState}>
          <FileText size={48} />
          <p>No reports generated yet</p>
          <span>Generate your first report using the form above</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.recentReportsPanel}>
      <div className={styles.panelHeader}>
        <Clock size={24} />
        <span>RECENT REPORTS</span>
        <span className={styles.reportCount}>({reports.length} reports)</span>
        {onRefresh && (
          <button 
            className={styles.refreshBtn}
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? styles.spinning : ''} />
          </button>
        )}
      </div>

      <div className={styles.reportsList}>
        {reports.map(report => (
          <div key={report.report_id} className={styles.reportItem}>
            <div className={styles.reportIcon}>
              <FileText size={32} />
            </div>
            <div className={styles.reportInfo}>
              <div className={styles.reportName}>{report.report_name}</div>
              <div className={styles.reportType}>{getReportTypeName(report.report_type)}</div>
              <div className={styles.reportMeta}>
                <span>{formatDate(report.generated_at)}</span>
                <span className={styles.metaSeparator}>│</span>
                <span>{report.start_date} to {report.end_date}</span>
                {report.depot_id && (
                  <>
                    <span className={styles.metaSeparator}>│</span>
                    <span>{report.depot_id}</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.reportFiles}>
              {report.files.map((file, idx) => (
                <button
                  key={idx}
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(report, file)}
                >
                  {file.format === 'pdf' ? (
                    <FileText size={18} />
                  ) : (
                    <FileSpreadsheet size={18} />
                  )}
                  <span>{file.format.toUpperCase()}</span>
                  <Download size={16} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
