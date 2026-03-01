import { useAppContext } from '@context/AppContext';
import styles from './DepotDistribution.module.css';

export const DepotDistribution = () => {
  const { state } = useAppContext();
  const { depots } = state;

  return (
    <section className={styles.depotDistribution}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.brassRivet}></div>
        <h2 className={styles.sectionTitle}>DEPOT DISTRIBUTION</h2>
      </div>

      {/* Depot Table */}
      <table className={styles.depotTable}>
        <thead>
          <tr>
            <th>Depot Name</th>
            <th>Vehicles</th>
            <th>Drivers</th>
          </tr>
        </thead>
        <tbody>
          {depots.map((depot) => (
            <tr key={depot.id}>
              <td className={styles.depotName}>{depot.name}</td>
              <td className={styles.depotValue}>{depot.vehicles}</td>
              <td className={styles.depotValue}>{depot.drivers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
