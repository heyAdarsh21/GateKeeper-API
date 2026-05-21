'use strict';

const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Malformed JSON in request body', ERROR_CODES.INVALID_JSON);
  }

  if (err.isOperational) {
    return sendError(res, err.statusCode, err.message, err.errorCode);
  }

  console.error('[UnhandledError]', err);
  return sendError(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    'An unexpected error occurred',
    ERROR_CODES.INTERNAL_ERROR
  );
};

module.exports = errorHandler;
