const express = require('express')
const shopProductController = require('../shop-controllers/product-controller')

const router = express.Router();

router.get('', shopProductController.index);

module.exports = router;