'use strict';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

module.exports = { isNonEmptyString, isObject };
