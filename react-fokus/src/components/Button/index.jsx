import { Icon } from '../Icon';
import styles from './Button.module.css';

export function Button({ children, icon, type = 'button', onClick }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {icon && <Icon name={icon} size="sm" />}
      {children}
    </button>
  );
}
