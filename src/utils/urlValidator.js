'use strict';

const config = require('../config');

const isValidHttpUrl = (str) => {
  if (typeof str !== 'string') return false;
  if (str.length > config.validation.maxUrlLength) return false;
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

module.exports = { isValidHttpUrl };
