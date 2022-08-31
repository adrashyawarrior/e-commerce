const express = require('express')

const productController = require('../controllers/product-controller')

const router = express.Router();

router.get('', productController.index);
router.post('', productController.create);

module.exports = router;