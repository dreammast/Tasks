const supabase = require('../config/supabase');

/**
 * Fetch tasks based on filter criteria.
 * @param {object} filters Filter options
 * @param {string} [filters.status] Status filter (Pending, In Progress, Completed)
 * @param {string} [filters.search] Search query for title or description
 */
const getAllTasks = async (filters = {}) => {
  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    const searchPattern = `%${filters.search.trim()}%`;
    query = query.or(`title.ilike.${searchPattern},description.ilike.${searchPattern}`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database error fetching tasks: ${error.message}`);
  }

  return data;
};

/**
 * Get a single task by ID.
 * @param {string} id Task UUID
 */
const getTaskById = async (id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Database error fetching task by id: ${error.message}`);
  }

  return data;
};

/**
 * Create a new task.
 * @param {object} taskData Task fields
 */
const createTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || 'Pending'
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Database error creating task: ${error.message}`);
  }

  return data;
};

/**
 * Update task status.
 * @param {string} id Task UUID
 * @param {string} status New status
 */
const updateTaskStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Database error updating task: ${error.message}`);
  }

  return data;
};

/**
 * Delete a task.
 * @param {string} id Task UUID
 */
const deleteTask = async (id) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Database error deleting task: ${error.message}`);
  }

  return data;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask
};
