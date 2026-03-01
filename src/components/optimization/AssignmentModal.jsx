import { X, Bus, Users, MapPin, Clock } from 'lucide-react';
import styles from './AssignmentModal.module.css';

export const AssignmentModal = ({ isOpen, onClose, type, title, planDetails }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    if (!planDetails) {
      return <div className={styles.loadingMessage}>Loading assignment data...</div>;
    }

    switch (type) {
      case 'vehicles':
        const vehicleAssignments = planDetails.vehicle_assignments || [];
        return (
          <div className={styles.tableContainer}>
            <div className={styles.summaryStats}>
              <div className={styles.statItem}>
                <strong>{vehicleAssignments.length}</strong> vehicles assigned
              </div>
              <div className={styles.statItem}>
                <strong>{vehicleAssignments.reduce((sum, v) => sum + v.total_trips, 0)}</strong> total trips
              </div>
              <div className={styles.statItem}>
                <strong>{vehicleAssignments.reduce((sum, v) => sum + v.total_deadhead_km, 0).toFixed(1)} km</strong> total deadhead
              </div>
            </div>
            <table className={styles.assignmentTable}>
              <thead>
                <tr>
                  <th><Bus size={16} /> Vehicle ID</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th><MapPin size={16} /> Depot</th>
                  <th>Trips Assigned</th>
                  <th>First Trip</th>
                  <th>Last Trip</th>
                  <th>Deadhead (km)</th>
                </tr>
              </thead>
              <tbody>
                {vehicleAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={styles.noData}>No vehicle assignments available</td>
                  </tr>
                ) : (
                  vehicleAssignments.map((assignment, index) => {
                    const firstTrip = assignment.trips[0];
                    const lastTrip = assignment.trips[assignment.trips.length - 1];
                    return (
                      <tr key={index}>
                        <td className={styles.vehicleId}>{assignment.vehicle_id}</td>
                        <td>{assignment.vehicle_type}</td>
                        <td>{assignment.capacity}</td>
                        <td>{assignment.depot}</td>
                        <td><strong>{assignment.total_trips}</strong></td>
                        <td>{firstTrip ? `${firstTrip.start_time} (${firstTrip.route_name})` : 'N/A'}</td>
                        <td>{lastTrip ? `${lastTrip.end_time} (${lastTrip.route_name})` : 'N/A'}</td>
                        <td>{assignment.total_deadhead_km.toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        );

      case 'drivers':
        const driverAssignments = planDetails.driver_assignments || [];
        return (
          <div className={styles.tableContainer}>
            <div className={styles.summaryStats}>
              <div className={styles.statItem}>
                <strong>{driverAssignments.length}</strong> drivers assigned
              </div>
              <div className={styles.statItem}>
                <strong>{driverAssignments.reduce((sum, d) => sum + d.trips.length, 0)}</strong> total trips
              </div>
              <div className={styles.statItem}>
                <strong>{(driverAssignments.reduce((sum, d) => sum + d.total_duty_hours, 0) / driverAssignments.length).toFixed(1)} hrs</strong> avg duty
              </div>
            </div>
            <table className={styles.assignmentTable}>
              <thead>
                <tr>
                  <th><Users size={16} /> Driver ID</th>
                  <th>Name</th>
                  <th><MapPin size={16} /> Depot</th>
                  <th>Trips</th>
                  <th><Clock size={16} /> Shift Start</th>
                  <th><Clock size={16} /> Shift End</th>
                  <th>Duty Hours</th>
                  <th>Break (min)</th>
                  <th>First Route</th>
                  <th>Last Route</th>
                </tr>
              </thead>
              <tbody>
                {driverAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="10" className={styles.noData}>No driver assignments available</td>
                  </tr>
                ) : (
                  driverAssignments.map((assignment, index) => {
                    const firstTrip = assignment.trips[0];
                    const lastTrip = assignment.trips[assignment.trips.length - 1];
                    return (
                      <tr key={index}>
                        <td className={styles.driverId}>{assignment.driver_id}</td>
                        <td>{assignment.driver_name}</td>
                        <td>{assignment.depot}</td>
                        <td><strong>{assignment.trips.length}</strong></td>
                        <td>{assignment.shift_start || 'N/A'}</td>
                        <td>{assignment.shift_end || 'N/A'}</td>
                        <td>{assignment.total_duty_hours.toFixed(1)}</td>
                        <td>{assignment.break_minutes}</td>
                        <td>{firstTrip ? firstTrip.route_name : 'N/A'}</td>
                        <td>{lastTrip ? lastTrip.route_name : 'N/A'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        );

      case 'routes':
        // Group trips by route from vehicle assignments
        const routeMap = new Map();
        (planDetails.vehicle_assignments || []).forEach(va => {
          va.trips.forEach(trip => {
            if (!routeMap.has(trip.route_id)) {
              routeMap.set(trip.route_id, {
                route_id: trip.route_id,
                route_name: trip.route_name,
                trips: 0,
                vehicles: new Set(),
                drivers: new Set()
              });
            }
            const route = routeMap.get(trip.route_id);
            route.trips++;
            route.vehicles.add(va.vehicle_id);
          });
        });
        
        (planDetails.driver_assignments || []).forEach(da => {
          da.trips.forEach(trip => {
            if (routeMap.has(trip.route_id)) {
              routeMap.get(trip.route_id).drivers.add(da.driver_id);
            }
          });
        });

        const routeAssignments = Array.from(routeMap.values()).map(r => ({
          ...r,
          vehicles: r.vehicles.size,
          drivers: r.drivers.size,
          coverage: '100%'
        }));

        return (
          <div className={styles.tableContainer}>
            <table className={styles.assignmentTable}>
              <thead>
                <tr>
                  <th>Route ID</th>
                  <th>Route Name</th>
                  <th><Bus size={16} /> Vehicles</th>
                  <th><Users size={16} /> Drivers</th>
                  <th>Trips</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {routeAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className={styles.noData}>No route data available</td>
                  </tr>
                ) : (
                  routeAssignments.map((assignment, index) => (
                    <tr key={index}>
                      <td className={styles.routeId}>{assignment.route_id}</td>
                      <td>{assignment.route_name}</td>
                      <td>{assignment.vehicles}</td>
                      <td>{assignment.drivers}</td>
                      <td>{assignment.trips}</td>
                      <td><span className={styles.coverageBadge}>{assignment.coverage}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'constraints':
        const metrics = planDetails.metrics || {};
        const mockConstraints = [
          { constraint: 'All Trips Covered', required: `${metrics.trips_total}`, achieved: `${metrics.trips_covered}`, status: metrics.trips_covered === metrics.trips_total ? 'Satisfied' : 'Partial' },
          { constraint: 'Fleet Size', required: 'Minimized', achieved: `${metrics.fleet_size} vehicles`, status: 'Satisfied' },
          { constraint: 'Deadhead Distance', required: 'Minimized', achieved: `${metrics.total_deadhead_km?.toFixed(1)} km`, status: 'Satisfied' },
          { constraint: 'CO₂ Emissions', required: 'Minimized', achieved: `${metrics.estimated_emissions_kg?.toFixed(1)} kg`, status: 'Satisfied' },
          { constraint: 'Duty Variance', required: 'Minimized', achieved: `${metrics.duty_variance_minutes?.toFixed(1)} min`, status: 'Satisfied' },
          { constraint: 'Solver Time', required: '≤ 120s', achieved: `${metrics.solver_time_seconds?.toFixed(1)}s`, status: metrics.solver_time_seconds <= 120 ? 'Satisfied' : 'Exceeded' },
        ];

        return (
          <div className={styles.tableContainer}>
            <table className={styles.assignmentTable}>
              <thead>
                <tr>
                  <th>Constraint</th>
                  <th>Required</th>
                  <th>Achieved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockConstraints.map((constraint, index) => (
                  <tr key={index}>
                    <td className={styles.constraintName}>{constraint.constraint}</td>
                    <td>{constraint.required}</td>
                    <td>{constraint.achieved}</td>
                    <td><span className={styles.statusBadge}>{constraint.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return <div>No data available</div>;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          {renderContent()}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.closeBtn} onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
