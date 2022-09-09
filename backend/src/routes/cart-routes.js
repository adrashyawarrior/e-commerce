const express = require('express')

const CartController = require('../controllers/cart-controller')

const router = express.Router();

router.get('', CartController.getCart);
router.put('/addproduct', CartController.addProduct);
router.put('/removeproduct', CartController.removeProduct);

module.exports = router;