'use strict';

const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');
const { sendError } = require('../utils/response');

const notFoundHandler = (req, res) => {
  sendError(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route ${req.method} ${req.originalUrl} not found`,
    ERROR_CODES.RESOURCE_NOT_FOUND
  );
};

module.exports = notFoundHandler;
