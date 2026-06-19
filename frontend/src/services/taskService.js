import api from './api';

const taskService = {
  /**
   * Fetch all tasks with optional filters
   * @param {object} params Filter params
   * @param {string} [params.status] Filter status
   * @param {string} [params.search] Search keyword
   */
  getTasks: (params = {}) => {
    return api.get('/api/tasks', { params });
  },

  /**
   * Create a new task
   * @param {object} taskData Task fields
   * @param {string} taskData.title
   * @param {string} taskData.description
   * @param {string} [taskData.status]
   */
  createTask: (taskData) => {
    return api.post('/api/tasks', taskData);
  },

  /**
   * Update a task's status
   * @param {string} id Task ID
   * @param {string} status New status value
   */
  updateTaskStatus: (id, status) => {
    return api.put(`/api/tasks/${id}`, { status });
  },

  /**
   * Delete a task
   * @param {string} id Task ID
   */
  deleteTask: (id) => {
    return api.delete(`/api/tasks/${id}`);
  }
};

export default taskService;
