const { sendError } = require('../utils/responseHandler');

/**
 * Global error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'An unexpected error occurred on the server.';

  return sendError(res, message, statusCode);
};

module.exports = errorHandler;
