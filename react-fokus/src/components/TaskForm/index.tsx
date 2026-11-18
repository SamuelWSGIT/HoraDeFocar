import { useActionState } from 'react';
import type { ChangeEvent } from 'react';
import { Icon } from '../Icon';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  description: string;
  editing?: boolean;
  onChange: (value: string) => void;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  onDelete?: () => void | Promise<void>;
}

export function TaskForm({
  description,
  editing = false,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}: TaskFormProps) {
  const [, formAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData): Promise<string> => {
    const action = String(formData.get('action') ?? 'save');

    if (action === 'cancel') {
      onCancel?.();
    } else if (action === 'delete') {
      await onDelete?.();
    } else {
      await onSubmit?.();
    }

    return action;
    }, null);

  return (
    <form action={formAction} className={styles.form}>
      <label className={styles.label} htmlFor="task-input">
        {editing ? 'Editando tarefa' : 'Nova miss\u00e3o'}
      </label>
      <textarea
        className={styles.textarea}
        id="task-input"
        name="task"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        placeholder="Qual &eacute; o pr&oacute;ximo protocolo?"
        required
        value={description}
      />
      <div className={styles.footer}>
        {editing && (
          <button
            className={styles.button}
            disabled={isPending}
            formNoValidate
            name="action"
            type="submit"
            value="delete"
          >
            <Icon name="delete" size="sm" />
            Deletar
          </button>
        )}
        <span className={styles.spacer} />
        <button
          className={styles.button}
          disabled={isPending}
          formNoValidate
          name="action"
          type="submit"
          value="cancel"
        >
          <Icon name="close" size="sm" />
          Abortar
        </button>
        <button
          className={`${styles.button} ${styles.confirm}`}
          disabled={isPending}
          name="action"
          type="submit"
          value="save"
        >
          <Icon name="save" size="sm" />
          Confirmar
        </button>
      </div>
    </form>
  );
}
