'use strict';

const { Router } = require('express');
const { handleRequest, handleStats } = require('../controllers/rateLimitController');
const { validateRateLimitRequest } = require('../validators/rateLimitValidator');

const router = Router();

router.post('/request', validateRateLimitRequest, handleRequest);
router.get('/stats', handleStats);

module.exports = router;
