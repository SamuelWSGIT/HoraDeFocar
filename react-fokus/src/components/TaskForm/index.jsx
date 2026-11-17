import { Icon } from '../Icon';
import styles from './TaskForm.module.css';

export function TaskForm({ editing = false, onSubmit, onCancel, onDelete }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="task-input">
        {editing ? 'Editando tarefa' : 'Nova missão'}
      </label>
      <textarea
        className={styles.textarea}
        id="task-input"
        name="task"
        required
        placeholder="Qual é o próximo protocolo?"
      />
      <div className={styles.footer}>
        {editing && <button className={styles.button} type="button" onClick={onDelete}><Icon name="delete" size="sm" />Deletar</button>}
        <span className={styles.spacer} />
        <button className={styles.button} type="button" onClick={onCancel}><Icon name="close" size="sm" />Abortar</button>
        <button className={`${styles.button} ${styles.confirm}`} type="submit"><Icon name="save" size="sm" />Confirmar</button>
      </div>
    </form>
  );
}
