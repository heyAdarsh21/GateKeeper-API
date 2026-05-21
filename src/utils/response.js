'use strict';

const sendSuccess = (res, statusCode, data) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

const sendError = (res, statusCode, message, errorCode) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
    },
  });
};

module.exports = { sendSuccess, sendError };
