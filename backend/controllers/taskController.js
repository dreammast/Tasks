const taskService = require('../services/taskService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

/**
 * GET /api/tasks
 * Retrieve tasks with optional filters
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const tasks = await taskService.getAllTasks({ status, search });
    return sendSuccess(res, tasks, 'Tasks retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/tasks
 * Create a new task
 */
const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    return sendSuccess(res, newTask, 'Task created successfully', 201);
  } catch (error) {
    return next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Update task status
 */
const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if task exists first
    const existingTask = await taskService.getTaskById(id);
    if (!existingTask) {
      return sendError(res, `Task with ID ${id} not found`, 404);
    }

    const updatedTask = await taskService.updateTaskStatus(id, status);
    return sendSuccess(res, updatedTask, 'Task status updated successfully');
  } catch (error) {
    return next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if task exists first
    const existingTask = await taskService.getTaskById(id);
    if (!existingTask) {
      return sendError(res, `Task with ID ${id} not found`, 404);
    }

    await taskService.deleteTask(id);
    return sendSuccess(res, null, 'Task deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};
