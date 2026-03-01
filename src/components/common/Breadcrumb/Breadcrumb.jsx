import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

export const Breadcrumb = ({ path }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <Link to="/" className={styles.breadcrumbLink}>
            Hub
          </Link>
        </li>
        <li className={styles.breadcrumbSeparator} aria-hidden="true">
          →
        </li>
        <li className={styles.breadcrumbItem}>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {path}
          </span>
        </li>
      </ol>
    </nav>
  );
};
