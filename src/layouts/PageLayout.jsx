import { useNavigate } from 'react-router-dom';
import { ReturnHubButton } from '../components/common/ReturnHubButton';
import { Breadcrumb } from '../components/common/Breadcrumb';
import styles from './PageLayout.module.css';

export const PageLayout = ({ title, subtitle, breadcrumbPath, children }) => {
  const navigate = useNavigate();

  const handleReturnToHub = () => {
    navigate('/');
  };

  return (
    <div className={styles.pageLayout}>
      {/* Return to Hub Button */}
      <ReturnHubButton onClick={handleReturnToHub} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb path={breadcrumbPath} />

      {/* Page Header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </header>

      {/* Scrollable Content Area */}
      <main className={styles.pageContent}>
        {children}
      </main>
    </div>
  );
};
