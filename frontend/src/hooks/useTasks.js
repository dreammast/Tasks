import { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import taskService from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Search State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch tasks from API
  const fetchTasks = useCallback(async (searchQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all tasks matching the search query (status filter will be done client-side for smoother transition & dynamic stats update)
      const response = await taskService.getTasks({ search: searchQuery });
      if (response.success) {
        setTasks(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to fetch tasks';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on initial load or search query changes
  useEffect(() => {
    // Implement debounce if real-time filtering requires it,
    // or call fetchTasks directly
    const delayDebounceFn = setTimeout(() => {
      fetchTasks(search);
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [search, fetchTasks]);

  // Compute stats dynamically from the current task list matching search
  const stats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc.total += 1;
        if (task.status === 'Pending') acc.pending += 1;
        else if (task.status === 'In Progress') acc.inProgress += 1;
        else if (task.status === 'Completed') acc.completed += 1;
        return acc;
      },
      { total: 0, pending: 0, inProgress: 0, completed: 0 }
    );
  }, [tasks]);

  // Filter tasks client-side for immediate UI response
  const filteredTasks = useMemo(() => {
    if (statusFilter === 'All') return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  // Create task action
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await taskService.createTask(taskData);
      if (response.success) {
        toast.success('Task created successfully!');
        // Refresh tasks
        await fetchTasks(search);
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Failed to create task');
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to create task';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update task status action
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const response = await taskService.updateTaskStatus(id, newStatus);
      if (response.success) {
        toast.success(`Task status updated to ${newStatus}`);
        // Optimistically update status in UI list
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to update task status');
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to update task status';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    }
  };

  // Delete task action
  const deleteTask = async (id) => {
    try {
      const response = await taskService.deleteTask(id);
      if (response.success) {
        toast.success('Task deleted successfully!');
        // Optimistically remove from UI list
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to delete task');
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to delete task';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    }
  };

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    stats,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask
  };
};
