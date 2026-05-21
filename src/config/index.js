'use strict';

require('dotenv').config();

const config = Object.freeze({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rateLimit: Object.freeze({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 5,
  }),
  pagination: Object.freeze({
    defaultLimit: parseInt(process.env.DEFAULT_PAGE_LIMIT, 10) || 20,
    maxLimit: parseInt(process.env.MAX_PAGE_LIMIT, 10) || 100,
  }),
  validation: Object.freeze({
    maxUrlsPerRequest: parseInt(process.env.MAX_URLS_PER_REQUEST, 10) || 20,
    maxUrlLength: parseInt(process.env.MAX_URL_LENGTH, 10) || 2048,
  }),
});

module.exports = config;
