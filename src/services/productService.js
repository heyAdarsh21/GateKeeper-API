'use strict';

const productStore = require('../storage/productStore');
const { createProduct } = require('../models/product');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const ERROR_CODES = require('../constants/errorCodes');
const { parsePaginationParams, buildPaginationMeta } = require('../utils/pagination');

const create = (data) => {
  if (productStore.hasSku(data.sku)) {
    throw new AppError(
      `Product with SKU "${data.sku}" already exists`,
      HTTP_STATUS.CONFLICT,
      ERROR_CODES.DUPLICATE_SKU
    );
  }

  const product = createProduct(data);
  productStore.create(product);
  return product;
};

const list = (query) => {
  const { limit, offset } = parsePaginationParams(query);
  const { items, total } = productStore.list(limit, offset);
  const pagination = buildPaginationMeta(limit, offset, total);
  return { items, pagination };
};

const getById = (id) => {
  const product = productStore.getFullProduct(id);
  if (!product) {
    throw new AppError(
      `Product with ID "${id}" not found`,
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND
    );
  }
  return product;
};

const appendMedia = (id, imageUrls, videoUrls) => {
  if (!productStore.exists(id)) {
    throw new AppError(
      `Product with ID "${id}" not found`,
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND
    );
  }

  productStore.appendMedia(id, imageUrls, videoUrls);
  return productStore.getFullProduct(id);
};

module.exports = { create, list, getById, appendMedia };
