import { useState } from 'react';
import { Building, AlertTriangle, CheckCircle } from 'lucide-react';
import styles from './DepotStatusCards.module.css';

export const DepotStatusCards = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleAction = (depotId, action) => {
    console.log(`Depot ${depotId} action: ${action}`);
  };

  if (!data) {
    return (
      <section className={styles.depotsStatusSection}>
        <h2 className={styles.sectionTitle}>DEPOT-WISE OPERATIONAL STATUS</h2>
        <div className={styles.loadingState}>No data available</div>
      </section>
    );
  }

  const depotsData = data.depots || [];

  // Filter depots by search term
  const filteredDepots = depotsData.filter(depot =>
    depot.depot_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    depot.depot_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only first 4 depots unless "Show All" is clicked
  const displayDepots = showAll ? filteredDepots : filteredDepots.slice(0, 4);
  const hasMore = filteredDepots.length > 4;

  // Calculate summary stats
  const totalVehicles = depotsData.reduce((sum, d) => sum + d.vehicles_active, 0);
  const totalDrivers = depotsData.reduce((sum, d) => sum + d.drivers_on_duty, 0);
  const avgFuel = depotsData.length > 0 
    ? Math.round(depotsData.reduce((sum, d) => sum + d.fuel_level, 0) / depotsData.length)
    : 0;
  const warningDepots = depotsData.filter(d => d.status === 'warning').length;

  return (
    <section className={styles.depotsStatusSection}>
      <h2 className={styles.sectionTitle}>
        DEPOT-WISE OPERATIONAL STATUS
      </h2>

      {/* Search Bar - moved below title */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search depots by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button 
            className={styles.clearSearch}
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className={styles.resultsInfo}>
          Found {filteredDepots.length} depot{filteredDepots.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </div>
      )}

      {/* Depot Cards Grid */}
      {displayDepots.length === 0 ? (
        <div className={styles.emptyState}>
          <Building size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p>No depots found</p>
          <p className={styles.emptyMessage}>
            No depots matching "{searchTerm}"
          </p>
        </div>
      ) : (
        <div className={styles.depotCardsGrid}>
          {displayDepots.map((depot) => (
            <div 
              key={depot.depot_id} 
              className={styles.depotCard}
              data-status={depot.status}
            >
              {/* Depot Header */}
              <div className={styles.depotHeader}>
                <div className={styles.depotName}>
                  <Building className={styles.depotIcon} size={18} />
                  {depot.depot_name.toUpperCase()}
                </div>
                <div className={styles.depotStatusIndicator}>
                  <div className={styles.statusLampIndicator}></div>
                  <span>STATUS</span>
                </div>
              </div>

              {/* Depot Content */}
              <div className={styles.depotContent}>
                {/* Metrics Row */}
                <div className={styles.depotMetricsRow}>
                  <div className={styles.depotMetric}>
                    <span className={styles.depotMetricLabel}>Buses:</span>
                    <span className={styles.depotMetricValue}>
                      {depot.vehicles_active}/{depot.vehicles_total}
                    </span>
                  </div>
                  <div className={styles.depotMetric}>
                    <span className={styles.depotMetricLabel}>Drivers:</span>
                    <span className={styles.depotMetricValue}>
                      {depot.drivers_on_duty}/{depot.drivers_total}
                    </span>
                  </div>
                  <div className={styles.depotMetric}>
                    <span className={styles.depotMetricLabel}>Fuel:</span>
                    <span className={`${styles.depotMetricValue} ${depot.fuel_level < 20 ? styles.depotMetricWarning : ''}`}>
                      {depot.fuel_level}%
                    </span>
                  </div>
                </div>

                {/* Routes Info */}
                <div className={styles.depotRoutesInfo}>
                  Routes: {depot.trips_covered}/{depot.trips_total}
                  {depot.active_plan && ` | Plan v${depot.active_plan.version}`}
                </div>

                {/* Alert Message or Status */}
                {depot.status === 'warning' ? (
                  <div className={styles.depotAlertMessage}>
                    <span className={styles.depotAlertIcon}>
                      <AlertTriangle size={14} />
                    </span>
                    Low fuel level - Refueling recommended
                  </div>
                ) : (
                  <div className={`${styles.depotAlertMessage} ${styles.success}`}>
                    <span className={styles.depotAlertIcon}>
                      <CheckCircle size={14} />
                    </span>
                    All systems nominal
                  </div>
                )}

                {/* Last Activity */}
                <div className={styles.depotLastActivity}>
                  Location: {depot.location}
                </div>

                {/* Actions */}
                <div className={styles.depotActions}>
                  <button 
                    className={styles.depotActionBtn}
                    onClick={() => handleAction(depot.depot_id, 'details')}
                  >
                    DETAILS
                  </button>
                  <button 
                    className={styles.depotActionBtn}
                    onClick={() => handleAction(depot.depot_id, 'dispatch')}
                  >
                    DISPATCH
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {hasMore && !showAll && (
        <div className={styles.showMoreContainer}>
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAll(true)}
          >
            Show All {filteredDepots.length} Depots ↓
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
