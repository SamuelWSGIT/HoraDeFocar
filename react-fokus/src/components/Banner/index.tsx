import styles from "./Banner.module.css";

interface BannerProps {
  title: string;
  highlight: string;
  imageUrl: string;
  imageAlt?: string;
  mode?: string;
}

const DEFAULT_MODE = "1";

export function Banner({
  title,
  highlight,
  imageUrl,
  imageAlt = "",
  mode = DEFAULT_MODE,
}: BannerProps) {
  const modeClassName = styles[`mode${mode}`] ?? "";
  const bannerClassName = [styles.banner, modeClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-label="Banner" className={bannerClassName} data-mode={mode}>
      <div className={styles.media}>
        <img className={styles.image} src={imageUrl} alt={imageAlt} />
        <h2 className={styles.title}>
          <span className={styles.text}>{title}</span>
          <strong className={styles.highlight}>{highlight}</strong>
        </h2>
      </div>
    </section>
  );
}
