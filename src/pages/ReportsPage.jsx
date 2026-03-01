import { useState, useEffect } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { ReportGenerator } from '../components/reports/ReportGenerator';
import { RecentReports } from '../components/reports/RecentReports';
import api from '../services/api';
import styles from './ReportsPage.module.css';

export const ReportsPage = () => {
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load recent reports on mount
  useEffect(() => {
    loadRecentReports();
  }, []);

  const loadRecentReports = async () => {
    try {
      setLoading(true);
      const response = await api.getReportsList({ limit: 20, offset: 0 });
      if (response.success) {
        setRecentReports(response.reports || []);
      }
    } catch (err) {
      console.error('Failed to load recent reports:', err);
      setError('Failed to load recent reports');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (reportConfig) => {
    try {
      setLoading(true);
      setError(null);

      // Map frontend config to backend request format
      const request = {
        report_type: mapReportType(reportConfig.reportType),
        start_date: reportConfig.dateFrom,
        end_date: reportConfig.dateTo,
        depot_id: reportConfig.depotId || null,
        format: reportConfig.format,
        include_charts: reportConfig.includeCharts !== false,
        include_summary: reportConfig.includeSummary !== false
      };

      const response = await api.generateReport(request);
      
      if (response.success) {
        // Reload reports list to show the new report
        await loadRecentReports();
        
        // Show success message
        alert(`Report "${response.report_id}" generated successfully!`);
      }
    } catch (err) {
      console.error('Failed to generate report:', err);
      setError(err.message || 'Failed to generate report');
      alert(`Error: ${err.message || 'Failed to generate report'}`);
    } finally {
      setLoading(false);
    }
  };

  // Map frontend report type names to backend enum values
  const mapReportType = (frontendType) => {
    const mapping = {
      'Daily Operations Summary': 'daily_operations',
      'Monthly Fleet Report': 'monthly_fleet',
      'Driver Duty Report': 'driver_duty',
      'Route Performance': 'route_performance',
      'Fuel Consumption Report': 'fuel_consumption',
      'Plan History Report': 'plan_history'
    };
    return mapping[frontendType] || 'daily_operations';
  };

  return (
    <PageLayout
      title="Report Generation Center"
      subtitle="Generate and Download Operational Reports"
      breadcrumbPath="Reports"
    >
      <div className={styles.reportsPage}>
        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}

        {/* Report Generator */}
        <ReportGenerator 
          onGenerate={handleGenerateReport}
          loading={loading}
        />

        {/* Recent Reports List */}
        <RecentReports 
          reports={recentReports}
          loading={loading}
          onRefresh={loadRecentReports}
        />
      </div>
    </PageLayout>
  );
};
