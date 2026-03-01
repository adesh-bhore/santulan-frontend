import { Building2, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from './RegistryStatusDashboard.module.css';

export const RegistryStatusDashboard = ({ registryData }) => {
  const dataTypes = [
    {
      id: 'routes',
      label: 'ROUTES',
      count: registryData?.routes?.count || 125,
      status: 'valid',
      updated: '28-Jan-2026'
    },
    {
      id: 'vehicles',
      label: 'VEHICLES',
      count: registryData?.vehicles?.count || 127,
      status: 'valid',
      updated: '28-Jan-2026'
    },
    {
      id: 'drivers',
      label: 'DRIVERS',
      count: registryData?.drivers?.count || 145,
      status: 'warning',
      updated: '15-Jan-2026',
      warning: '3 expiry'
    },
    {
      id: 'depots',
      label: 'DEPOTS',
      count: registryData?.depots?.count || 4,
      status: 'valid',
      updated: '01-Jan-26'
    }
  ];

  const attentionItems = [
    '3 driver licenses expiring within 30 days',
    'Route 401 timetable needs seasonal update',
    'Vehicle MH-12-6789 registration renewal due 15-Feb'
  ];

  return (
    <div className={styles.registryStatusDashboard}>
      <div className={styles.registryStatusHeader}>
        <Building2 className={styles.registryStatusIcon} size={20} />
        CURRENT REGISTRY STATUS & DATA HEALTH
      </div>

      <div className={styles.dataTypeGrid}>
        {dataTypes.map(type => (
          <div 
            key={type.id}
            className={styles.dataTypeCard}
            data-status={type.status}
          >
            <div className={styles.dataTypeLabel}>{type.label}</div>
            <div className={styles.dataTypeCount}>{type.count}</div>
            <div className={styles.dataTypeUnit}>entries</div>
            <div className={styles.dataTypeStatus}>
              {type.status === 'valid' ? (
                <><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> Valid</>
              ) : (
                <><AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} /> {type.warning}</>
              )}
            </div>
            <div className={styles.dataTypeUpdated}>
              Updated: {type.updated}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.timetableSummaryCard}>
        <Clock className={styles.timetableIcon} size={24} />
        <div className={styles.timetableContent}>
          <div className={styles.timetableTitle}>TIMETABLE REGISTRY</div>
          <div className={styles.timetableStats}>
            <div className={styles.timetableStat}>
              <span className={styles.timetableStatValue}>450</span> scheduled trips
            </div>
            <div className={styles.timetableStat}>
              <span className={styles.timetableStatValue}>98%</span> coverage
            </div>
            <div className={styles.timetableStat}>
              Last: <span className={styles.timetableStatValue}>28-Jan-2026</span>
            </div>
          </div>
          <div className={styles.timetableStats}>
            <span><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> All routes covered</span>
            <span><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> No conflicts</span>
            <span><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> Optimized</span>
          </div>
        </div>
      </div>

      {attentionItems.length > 0 && (
        <div className={styles.attentionRequired}>
          <div className={styles.attentionTitle}>ATTENTION REQUIRED:</div>
          <ul className={styles.attentionList}>
            {attentionItems.map((item, index) => (
              <li key={index} className={styles.attentionItem}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.registryActions}>
        <button className={styles.registryActionBtn}>
          VIEW COMPLETE REGISTRY
        </button>
        <button className={styles.registryActionBtn}>
          DOWNLOAD CURRENT DATA
        </button>
        <button className={styles.registryActionBtn}>
          REPORTS
        </button>
      </div>
    </div>
  );
};
