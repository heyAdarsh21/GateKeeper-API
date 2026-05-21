'use strict';

const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');

const validatePaginationParams = (req, res, next) => {
  const { limit, offset } = req.query;

  if (limit !== undefined && (isNaN(Number(limit)) || Number(limit) < 0)) {
    return next(new AppError('Query param "limit" must be a non-negative integer', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.INVALID_QUERY_PARAM));
  }

  if (offset !== undefined && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return next(new AppError('Query param "offset" must be a non-negative integer', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.INVALID_QUERY_PARAM));
  }

  next();
};

module.exports = { validatePaginationParams };
