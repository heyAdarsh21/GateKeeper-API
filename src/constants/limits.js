'use strict';

const config = require('../config');

const LIMITS = Object.freeze({
  RATE_LIMIT_WINDOW_MS: config.rateLimit.windowMs,
  RATE_LIMIT_MAX_REQUESTS: config.rateLimit.maxRequests,
  DEFAULT_PAGE_LIMIT: config.pagination.defaultLimit,
  MAX_PAGE_LIMIT: config.pagination.maxLimit,
  MAX_URLS_PER_REQUEST: config.validation.maxUrlsPerRequest,
  MAX_URL_LENGTH: config.validation.maxUrlLength,
});

module.exports = LIMITS;
