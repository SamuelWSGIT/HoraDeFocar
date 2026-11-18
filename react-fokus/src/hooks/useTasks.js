import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      setTasks(await getTasks());
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível carregar as missões.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    getTasks()
      .then((loadedTasks) => {
        if (isActive) setTasks(loadedTasks);
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message || 'Não foi possível carregar as missões.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const addTask = useCallback(async (description) => {
    await createTask(description);
    await loadTasks();
  }, [loadTasks]);

  const editTask = useCallback(async (task, description) => {
    await updateTask(task.id, { ...task, description });
    await loadTasks();
  }, [loadTasks]);

  const toggleTask = useCallback(async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
    await loadTasks();
  }, [loadTasks]);

  const removeTask = useCallback(async (task) => {
    await deleteTask(task.id);
    await loadTasks();
  }, [loadTasks]);

  const clearCompleted = useCallback(async () => {
    await Promise.all(tasks.filter((task) => task.completed).map((task) => deleteTask(task.id)));
    await loadTasks();
  }, [loadTasks, tasks]);

  const clearAll = useCallback(async () => {
    await Promise.all(tasks.map((task) => deleteTask(task.id)));
    await loadTasks();
  }, [loadTasks, tasks]);

  return {
    addTask,
    clearAll,
    clearCompleted,
    editTask,
    error,
    isLoading,
    removeTask,
    tasks,
    toggleTask,
  };
}
