const Joi = require('joi');
const { sendError } = require('../utils/responseHandler');

// Schema for task creation (POST)
const createTaskSchema = Joi.object({
  title: Joi.string().trim().max(255).required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required'
  }),
  description: Joi.string().trim().min(20).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters long',
    'any.required': 'Description is required'
  }),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').default('Pending').messages({
    'any.only': 'Status must be one of: Pending, In Progress, Completed'
  })
});

// Schema for updating status (PUT)
const updateStatusSchema = Joi.object({
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').required().messages({
    'string.empty': 'Status is required',
    'any.only': 'Status must be one of: Pending, In Progress, Completed',
    'any.required': 'Status is required'
  })
});

/**
 * Validate task creation request body.
 */
const validateCreateTask = (req, res, next) => {
  const { error, value } = createTaskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(d => d.message).join(', ');
    return sendError(res, errorMessages, 400);
  }
  req.body = value;
  next();
};

/**
 * Validate status update request body.
 */
const validateUpdateStatus = (req, res, next) => {
  const { error, value } = updateStatusSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(d => d.message).join(', ');
    return sendError(res, errorMessages, 400);
  }
  req.body = value;
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateStatus
};
