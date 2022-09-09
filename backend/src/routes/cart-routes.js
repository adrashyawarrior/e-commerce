const express = require('express')

const CartController = require('../controllers/cart-controller')

const router = express.Router();

router.put('/addproduct', CartController.addProduct);

module.exports = router;