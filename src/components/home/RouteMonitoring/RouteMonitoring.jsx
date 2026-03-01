import { useState } from 'react';
import { AlertCircle, AlertTriangle, BarChart3, RefreshCw, X, FileText } from 'lucide-react';
import { useApiData } from '@hooks/useApiData';
import api from '@services/api';
import styles from './RouteMonitoring.module.css';

export const RouteMonitoring = () => {
  const [filter, setFilter] = useState('priority'); // Default to priority routes
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  // Fetch routes with auto-refresh every 30 seconds
  const { data, loading, error, isRefreshing } = useApiData(
    api.getRoutes,
    { refreshInterval: 30000 }
  );

  const routes = data?.routes || [];

  // Filter logic
  let filteredRoutes = routes.filter(route => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        route.id.toString().includes(search) ||
        route.name.toLowerCase().includes(search)
      );
    }
    
    // Status filter
    if (filter === 'delayed') return route.status === 'delayed';
    if (filter === 'priority') return route.delay > 0 || route.status === 'delayed';
    return true;
  });

  // Limit display to top 10 unless "Show All" is clicked
  const displayRoutes = showAll ? filteredRoutes : filteredRoutes.slice(0, 10);
  const hasMore = filteredRoutes.length > 10;

  const getDelayLevel = (delay) => {
    if (delay === 0) return '0';
    if (delay < 10) return 'minor';
    return 'major';
  };

  // Loading state
  if (loading && !data) {
    return (
      <section className={styles.routeMonitoringSection}>
        <h2 className={styles.sectionTitle}>
          LIVE ROUTE PERFORMANCE MONITORING
        </h2>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading route data...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className={styles.routeMonitoringSection}>
        <h2 className={styles.sectionTitle}>
          LIVE ROUTE PERFORMANCE MONITORING
        </h2>
        <div className={styles.errorState}>
          <AlertTriangle size={24} style={{ marginBottom: '8px' }} />
          <p>Failed to load route data</p>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (filteredRoutes.length === 0) {
    return (
      <section className={styles.routeMonitoringSection}>
        <h2 className={styles.sectionTitle}>
          LIVE ROUTE PERFORMANCE MONITORING
          {isRefreshing && <RefreshCw className={styles.refreshIndicator} size={16} />}
        </h2>
        
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search routes by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              className={styles.clearSearch}
              onClick={() => setSearchTerm('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.emptyState}>
          <FileText size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p>No routes found</p>
          <p className={styles.emptyMessage}>
            {searchTerm && `No routes matching "${searchTerm}"`}
            {!searchTerm && filter === 'delayed' && 'No delayed routes at this time'}
            {!searchTerm && filter === 'priority' && 'No priority routes requiring attention'}
            {!searchTerm && filter === 'all' && 'No route data available'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.routeMonitoringSection}>
      <h2 className={styles.sectionTitle}>
        LIVE ROUTE PERFORMANCE MONITORING
        {isRefreshing && <RefreshCw className={styles.refreshIndicator} size={16} />}
      </h2>

      {/* Summary Stats */}
      <div className={styles.routeSummary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{routes.length}</span>
          <span className={styles.summaryLabel}>Total Routes</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue} style={{ color: 'var(--signal-green)' }}>
            {routes.filter(r => r.status === 'active' && r.delay === 0).length}
          </span>
          <span className={styles.summaryLabel}>On Time</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue} style={{ color: 'var(--signal-red)' }}>
            {routes.filter(r => r.status === 'delayed').length}
          </span>
          <span className={styles.summaryLabel}>Delayed</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue} style={{ color: 'var(--brass-accent)' }}>
            {routes.filter(r => r.delay > 0 && r.delay < 10).length}
          </span>
          <span className={styles.summaryLabel}>Minor Delays</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search routes by ID or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button 
            className={styles.clearSearch}
            onClick={() => setSearchTerm('')}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className={styles.routeFilterButtons}>
        <button 
          className={`${styles.routeFilterBtn} ${filter === 'priority' ? styles.active : ''}`}
          onClick={() => { setFilter('priority'); setShowAll(false); }}
        >
          <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
          PRIORITY ({routes.filter(r => r.delay > 0 || r.status === 'delayed').length})
        </button>
        <button 
          className={`${styles.routeFilterBtn} ${filter === 'delayed' ? styles.active : ''}`}
          onClick={() => { setFilter('delayed'); setShowAll(false); }}
        >
          <AlertTriangle size={14} style={{ display: 'inline', marginRight: '4px' }} />
          DELAYED ONLY ({routes.filter(r => r.status === 'delayed').length})
        </button>
        <button 
          className={`${styles.routeFilterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => { setFilter('all'); setShowAll(false); }}
        >
          <BarChart3 size={14} style={{ display: 'inline', marginRight: '4px' }} />
          ALL ROUTES ({routes.length})
        </button>
      </div>

      {/* Results Info */}
      <div className={styles.resultsInfo}>
        Showing {displayRoutes.length} of {filteredRoutes.length} routes
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.routeTable}>
          <thead>
            <tr>
              <th>RTE</th>
              <th>ROUTE NAME</th>
              <th>STATUS</th>
              <th>DELAY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {displayRoutes.map((route) => (
              <tr key={route.id} data-status={route.status}>
                <td className={styles.routeId}>{route.id}</td>
                <td>
                  <div className={styles.routeInfo}>
                    <div className={styles.routeName}>{route.name}</div>
                    <div className={styles.routeNextBus}>
                      Next: {route.nextBus} @ {route.nextTime} | {route.tripsCompleted}/{route.tripsTotal} trips
                    </div>
                  </div>
                </td>
                <td className={styles.routeStatus}>
                  <span className={styles.statusBadge} data-status={route.status}>
                    {route.status === 'active' && '⦿ ACTIVE'}
                    {route.status === 'delayed' && (
                      <>
                        <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        DELAY
                      </>
                    )}
                  </span>
                </td>
                <td className={styles.routeDelay} data-delay={getDelayLevel(route.delay)}>
                  {route.delay > 0 ? `+${route.delay}m` : '0m'}
                </td>
                <td className={styles.routeAction}>
                  <button className={`${styles.routeActionBtn} ${route.status === 'delayed' ? styles.alert : ''}`}>
                    {route.status === 'delayed' ? 'ALERT' : 'VIEW'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {hasMore && !showAll && (
        <div className={styles.showMoreContainer}>
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAll(true)}
          >
            Show All {filteredRoutes.length} Routes ↓
          </button>
        </div>
      )}

      {showAll && (
        <div className={styles.showMoreContainer}>
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAll(false)}
          >
            Show Less ↑
          </button>
        </div>
      )}
    </section>
  );
};
