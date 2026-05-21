'use strict';

const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');
const { isValidHttpUrl } = require('../utils/urlValidator');
const config = require('../config');

const validateAppendMedia = (req, res, next) => {
  const { image_urls, video_urls } = req.body;

  const hasImages = Array.isArray(image_urls) && image_urls.length > 0;
  const hasVideos = Array.isArray(video_urls) && video_urls.length > 0;

  if (!hasImages && !hasVideos) {
    return next(new AppError(
      'At least one non-empty media array ("image_urls" or "video_urls") is required',
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.MEDIA_REQUIRED
    ));
  }

  const errors = [];

  if (hasImages) {
    if (image_urls.length > config.validation.maxUrlsPerRequest) {
      return next(new AppError(`Field "image_urls" exceeds maximum of ${config.validation.maxUrlsPerRequest} URLs per request`, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR));
    }
    image_urls.forEach((url, i) => {
      if (!isValidHttpUrl(url)) {
        errors.push(`image_urls[${i}]: invalid URL`);
      }
    });
  }

  if (hasVideos) {
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
    image_urls: hasImages ? image_urls : [],
    video_urls: hasVideos ? video_urls : [],
  };

  next();
};

module.exports = { validateAppendMedia };
