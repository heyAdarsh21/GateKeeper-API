'use strict';

const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');

const validateRateLimitRequest = (req, res, next) => {
  const { user_id, payload } = req.body;

  if (user_id === undefined || user_id === null) {
    return next(new AppError('Field "user_id" is required', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.MISSING_REQUIRED_FIELD));
  }

  if (typeof user_id !== 'string' || user_id.trim().length === 0) {
    return next(new AppError('Field "user_id" must be a non-empty string', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
  }

  if (payload === undefined) {
    return next(new AppError('Field "payload" is required', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.MISSING_REQUIRED_FIELD));
  }

  // payload can be any valid JSON value (object, array, string, number, boolean, null)
  // If we reached this point, express.json() already parsed it successfully

  // Normalize trimmed user_id onto req for downstream use
  req.validatedBody = {
    userId: user_id.trim(),
    payload,
  };

  next();
};

module.exports = { validateRateLimitRequest };
