'use strict';

const rateLimitStore = require('../storage/rateLimitStore');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');

const processRequest = (userId, payload) => {
  const result = rateLimitStore.tryRequest(userId);

  if (!result.allowed) {
    throw new AppError(
      'Rate limit exceeded. Maximum 5 requests per 60-second rolling window.',
      HTTP_STATUS.TOO_MANY_REQUESTS,
      ERROR_CODES.RATE_LIMIT_EXCEEDED
    );
  }

  return {
    user_id: userId,
    accepted: true,
    accepted_count_in_window: result.currentCount,
    rejected_total: result.rejectedTotal,
  };
};

const getStats = () => {
  const users = rateLimitStore.getStats();
  return { users };
};

module.exports = { processRequest, getStats };
