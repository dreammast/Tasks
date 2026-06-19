/**
 * Send a success response.
 * @param {object} res Express response object
 * @param {any} data Response data payload
 * @param {string} [message] Optional success message
 * @param {number} [statusCode=200] HTTP status code
 */
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Send an error response.
 * @param {object} res Express response object
 * @param {string} message Error description message
 * @param {number} [statusCode=500] HTTP status code
 */
const sendError = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  sendSuccess,
  sendError
};
