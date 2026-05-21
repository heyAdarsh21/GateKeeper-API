'use strict';

const { Router } = require('express');
const rateLimitRoutes = require('./rateLimitRoutes');
const productRoutes = require('./productRoutes');

const router = Router();

router.use('/', rateLimitRoutes);
router.use('/products', productRoutes);

module.exports = router;
