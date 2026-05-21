'use strict';

const rateLimitService = require('../services/rateLimitService');
const { sendSuccess } = require('../utils/response');
const HTTP_STATUS = require('../constants/httpStatus');

const handleRequest = (req, res, next) => {
  try {
    const { userId, payload } = req.validatedBody;
    const result = rateLimitService.processRequest(userId, payload);
    sendSuccess(res, HTTP_STATUS.OK, result);
  } catch (err) {
    next(err);
  }
};

const handleStats = (req, res) => {
  const stats = rateLimitService.getStats();
  sendSuccess(res, HTTP_STATUS.OK, stats);
};

module.exports = { handleRequest, handleStats };
