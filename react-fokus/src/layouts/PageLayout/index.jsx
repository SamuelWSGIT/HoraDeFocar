import styles from './PageLayout.module.css';

export function PageLayout({ children }) {
  return <div className={styles.pageLayout}>{children}</div>;
}
