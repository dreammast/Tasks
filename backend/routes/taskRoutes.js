const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateCreateTask, validateUpdateStatus } = require('../middleware/validateTask');

// GET all tasks (supports query filters)
router.get('/', taskController.getTasks);

// POST create a task
router.post('/', validateCreateTask, taskController.createTask);

// PUT update status of a task
router.put('/:id', validateUpdateStatus, taskController.updateTaskStatus);

// DELETE remove a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
