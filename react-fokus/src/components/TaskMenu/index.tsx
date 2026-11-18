import { useActionState, useRef } from 'react';
import { Icon } from '../Icon';
import styles from './TaskMenu.module.css';

interface TaskMenuProps {
  onClearCompleted?: () => Promise<void>;
  onClearAll?: () => Promise<void>;
}

interface MenuActionState {
  action: 'clearCompleted' | 'clearAll' | null;
}

export function TaskMenu({ onClearCompleted, onClearAll }: TaskMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [, menuAction, isPending] = useActionState<MenuActionState, FormData>(async (_: MenuActionState, formData: FormData): Promise<MenuActionState> => {
    const actionValue = formData.get('action');
    const action: MenuActionState['action'] =
      actionValue === 'clearCompleted' || actionValue === 'clearAll'
        ? actionValue
        : null;

    try {
      if (action === 'clearCompleted') {
        await onClearCompleted?.();
      } else if (action === 'clearAll') {
        await onClearAll?.();
      }
    } finally {
      if (menuRef.current) {
        menuRef.current.open = false;
      }
    }

    return { action };
  }, { action: null });

  return (
    <details ref={menuRef} className={styles.menu}>
      <summary className={styles.trigger} aria-label="Op&ccedil;&otilde;es da lista de tarefas">
        <Icon name="more" size="lg" />
      </summary>
      <form action={menuAction} className={styles.form}>
        <ul className={styles.list} role="menu">
          <li className={styles.item} role="none">
            <button
              className={styles.button}
              disabled={isPending}
              name="action"
              role="menuitem"
              type="submit"
              value="clearCompleted"
            >
              <Icon name="check" />
              Purgar miss&otilde;es conclu&iacute;das
            </button>
          </li>
          <li className={styles.item} role="none">
            <button
              className={styles.button}
              disabled={isPending}
              name="action"
              role="menuitem"
              type="submit"
              value="clearAll"
            >
              <Icon name="delete" />
              Purgar todas as miss&otilde;es
            </button>
          </li>
        </ul>
      </form>
    </details>
  );
}
