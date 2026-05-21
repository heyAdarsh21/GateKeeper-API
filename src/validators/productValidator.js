'use strict';

const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');
const { isNonEmptyString } = require('./common');
const { isValidHttpUrl } = require('../utils/urlValidator');
const config = require('../config');

const validateCreateProduct = (req, res, next) => {
  const { name, sku, image_urls, video_urls } = req.body;

  if (!isNonEmptyString(name)) {
    return next(new AppError('Field "name" is required and must be a non-empty string', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.MISSING_REQUIRED_FIELD));
  }

  if (!isNonEmptyString(sku)) {
    return next(new AppError('Field "sku" is required and must be a non-empty string', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.MISSING_REQUIRED_FIELD));
  }

  const errors = [];

  if (image_urls !== undefined) {
    if (!Array.isArray(image_urls)) {
      return next(new AppError('Field "image_urls" must be an array', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
    }
    if (image_urls.length > config.validation.maxUrlsPerRequest) {
      return next(new AppError(`Field "image_urls" exceeds maximum of ${config.validation.maxUrlsPerRequest} URLs per request`, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
    }
    image_urls.forEach((url, i) => {
      if (!isValidHttpUrl(url)) {
        errors.push(`image_urls[${i}]: invalid URL`);
      }
    });
  }

  if (video_urls !== undefined) {
    if (!Array.isArray(video_urls)) {
      return next(new AppError('Field "video_urls" must be an array', HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
    }
    if (video_urls.length > config.validation.maxUrlsPerRequest) {
      return next(new AppError(`Field "video_urls" exceeds maximum of ${config.validation.maxUrlsPerRequest} URLs per request`, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
    }
    video_urls.forEach((url, i) => {
      if (!isValidHttpUrl(url)) {
        errors.push(`video_urls[${i}]: invalid URL`);
      }
    });
  }

  if (errors.length > 0) {
    return next(new AppError(`Invalid URLs: ${errors.join('; ')}`, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.INVALID_URL));
  }

  req.validatedBody = {
    name: name.trim(),
    sku: sku.trim(),
    image_urls: image_urls || [],
    video_urls: video_urls || [],
  };

  next();
};

module.exports = { validateCreateProduct };
