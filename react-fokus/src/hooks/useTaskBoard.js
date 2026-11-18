import { useCallback, useState } from 'react';
import { useTasks } from './useTasks';

export function useTaskBoard() {
  const {
    addTask,
    clearAll,
    clearCompleted,
    editTask,
    error,
    isLoading,
    removeTask,
    tasks,
    toggleTask,
  } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [description, setDescription] = useState('');

  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setDescription('');
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((task) => {
    setEditingTask(task);
    setDescription(task.description);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingTask(null);
    setDescription('');
    setIsFormOpen(false);
  }, []);

  const submitTask = useCallback(async () => {
    const cleanDescription = description.trim();
    if (!cleanDescription) return;

    if (editingTask) {
      await editTask(editingTask, cleanDescription);
    } else {
      await addTask(cleanDescription);
    }

    closeForm();
  }, [addTask, closeForm, description, editTask, editingTask]);

  const deleteEditingTask = useCallback(async () => {
    if (!editingTask) return;

    await removeTask(editingTask);
    closeForm();
  }, [closeForm, editingTask, removeTask]);

  return {
    clearAll,
    clearCompleted,
    closeForm,
    deleteEditingTask,
    description,
    editingTask,
    error,
    isFormOpen,
    isLoading,
    openCreateForm,
    openEditForm,
    setDescription,
    submitTask,
    tasks,
    toggleTask,
  };
}
