'use strict';

const productService = require('../services/productService');
const { sendSuccess } = require('../utils/response');
const HTTP_STATUS = require('../constants/httpStatus');

const createProduct = (req, res, next) => {
  try {
    const product = productService.create(req.validatedBody);
    sendSuccess(res, HTTP_STATUS.CREATED, product);
  } catch (err) {
    next(err);
  }
};

const listProducts = (req, res, next) => {
  try {
    const result = productService.list(req.query);
    sendSuccess(res, HTTP_STATUS.OK, result);
  } catch (err) {
    next(err);
  }
};

const getProduct = (req, res, next) => {
  try {
    const product = productService.getById(req.params.id);
    sendSuccess(res, HTTP_STATUS.OK, product);
  } catch (err) {
    next(err);
  }
};

const appendMedia = (req, res, next) => {
  try {
    const product = productService.appendMedia(
      req.params.id,
      req.validatedBody.image_urls,
      req.validatedBody.video_urls
    );
    sendSuccess(res, HTTP_STATUS.OK, product);
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, listProducts, getProduct, appendMedia };
