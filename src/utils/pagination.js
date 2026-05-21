'use strict';

const config = require('../config');

const parsePaginationParams = (query) => {
  let limit = parseInt(query.limit, 10);
  let offset = parseInt(query.offset, 10);

  if (isNaN(limit) || limit < 1) limit = config.pagination.defaultLimit;
  if (limit > config.pagination.maxLimit) limit = config.pagination.maxLimit;
  if (isNaN(offset) || offset < 0) offset = 0;

  return { limit, offset };
};

const buildPaginationMeta = (limit, offset, total) => ({
  limit,
  offset,
  total,
});

module.exports = { parsePaginationParams, buildPaginationMeta };
