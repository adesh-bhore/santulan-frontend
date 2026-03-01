import { BarChart3, Bus, Users, DollarSign } from 'lucide-react';
import styles from './InstantReports.module.css';

export const InstantReports = () => {
  const reports = [
    { id: 1, label: 'Daily Operations', icon: <BarChart3 size={16} /> },
    { id: 2, label: 'Fleet Status', icon: <Bus size={16} /> },
    { id: 3, label: 'Driver Hours', icon: <Users size={16} /> },
    { id: 4, label: 'Cost Report', icon: <DollarSign size={16} /> }
  ];

  const handleReportClick = (reportLabel) => {
    console.log(`Generating ${reportLabel} report...`);
    // Report generation logic will be implemented later
  };

  return (
    <div className={styles.panelCard}>
      <div className={styles.panelCardHeader}>INSTANT REPORTS</div>
      <div className={styles.instantReports}>
        {reports.map((report) => (
          <button
            key={report.id}
            className={styles.instantReportBtn}
            onClick={() => handleReportClick(report.label)}
          >
            <span className={styles.reportIcon}>{report.icon}</span>
            {report.label}
          </button>
        ))}
      </div>
      <div className={styles.panelViewAllBtn}>
        [Custom Report]
      </div>
    </div>
  );
};
