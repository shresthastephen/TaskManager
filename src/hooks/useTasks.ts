import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Task, TaskFilter, TaskSort } from '../services/types';
import { mockApi } from '../lib/mock';
import { useDebounce } from './useDebounce';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<TaskSort>({ field: 'dueDate', direction: 'asc' });

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch tasks 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await mockApi.getTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filter !== 'all') {
      result = result.filter(task => task.status === filter);
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sort.field === 'dueDate') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sort.field === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter, debouncedSearch, sort]);

  const createTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await mockApi.createTask(task);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    try {
      const updatedTask = await mockApi.updateTask(id, updates);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await mockApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  }, []);

  const toggleSort = useCallback((field: TaskSort['field']) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sort,
    toggleSort,
    createTask,
    updateTask,
    deleteTask,
  };
}
