import styles from './Banner.module.css';

export function Banner({ title, highlight, imageUrl, imageAlt = '' }) {
  return (
    <section aria-label="Banner" className={styles.banner}>
      <h2 className={styles.title}>
        <span className={styles.text}>{title}</span>
        <br />
        <strong className={styles.highlight}>{highlight}</strong>
      </h2>
      <img className={styles.image} src={imageUrl} alt={imageAlt} />
    </section>
  );
}
