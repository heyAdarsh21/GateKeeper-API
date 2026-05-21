'use strict';

const { Router } = require('express');
const { createProduct, listProducts, getProduct, appendMedia } = require('../controllers/productController');
const { validateCreateProduct } = require('../validators/productValidator');
const { validateAppendMedia } = require('../validators/mediaValidator');
const { validatePaginationParams } = require('../validators/paginationValidator');

const router = Router();

router.post('/', validateCreateProduct, createProduct);
router.get('/', validatePaginationParams, listProducts);
router.get('/:id', getProduct);
router.post('/:id/media', validateAppendMedia, appendMedia);

module.exports = router;
