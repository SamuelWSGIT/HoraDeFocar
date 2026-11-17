import { Icon } from '../Icon';
import styles from './TaskMenu.module.css';

export function TaskMenu({ onClearCompleted, onClearAll }) {
  return (
    <details className={styles.menu}>
      <summary className={styles.trigger} aria-label="Opções da lista de tarefas">
        <Icon name="more" size="lg" />
      </summary>
      <ul className={styles.list} role="menu">
        <li className={styles.item} role="none">
          <button className={styles.button} type="button" onClick={onClearCompleted} role="menuitem">
            <Icon name="check" />
            Purgar missões concluídas
          </button>
        </li>
        <li className={styles.item} role="none">
          <button className={styles.button} type="button" onClick={onClearAll} role="menuitem">
            <Icon name="delete" />
            Purgar todas as missões
          </button>
        </li>
      </ul>
    </details>
  );
}
