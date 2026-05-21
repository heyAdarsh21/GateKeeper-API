'use strict';

const { v4: uuidv4 } = require('uuid');

const createProduct = ({ name, sku, image_urls = [], video_urls = [] }) => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name,
    sku,
    image_urls,
    video_urls,
    created_at: now,
  };
};

const toMetadataView = (product) => ({
  id: product.id,
  name: product.name,
  sku: product.sku,
  created_at: product.created_at,
});

module.exports = { createProduct, toMetadataView };
