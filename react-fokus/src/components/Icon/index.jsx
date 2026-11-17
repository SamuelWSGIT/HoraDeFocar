import styles from './Icon.module.css';

const iconTypes = {
  add: styles.add,
  check: styles.check,
  close: styles.close,
  delete: styles.delete,
  edit: styles.edit,
  more: styles.more,
  pause: styles.pause,
  play: styles.play,
  save: styles.save,
};

const iconSizes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Icon({ name, size = 'md' }) {
  return (
    <span
      className={`${styles.icon} ${iconTypes[name] ?? ''} ${iconSizes[size] ?? ''}`}
      aria-hidden="true"
    />
  );
}
