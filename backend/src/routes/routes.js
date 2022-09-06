const express = require('express')

const authRoutes = require('./auth-routes')
const errorRoutes = require('./error-routes')
const homeRoutes = require('./home-routes')
const userRoutes = require('./user-routes')
const productRoutes = require('./product-routes')
const categoryRoutes = require('./category-routes')
const { authenticateToken } = require('../middlewares/auth-middleware')
const shopProductRoutes = require('../routes/shop-product-routes')
const customerRoutes = require('./customer-routes')
const cartRoutes = require('./cart-routes')

const router = express.Router();

router.use(express.json());

// shop
router.use('/products', shopProductRoutes);
router.use('/cart', cartRoutes);

// account
router.use('', authRoutes);
router.use('', authenticateToken, homeRoutes);
router.use('/account/categories', categoryRoutes);
router.use('/users', authenticateToken, userRoutes);
router.use('/account/customers', authenticateToken, customerRoutes);
router.use('/account/products', authenticateToken, productRoutes);

// errors
router.use('*', errorRoutes);

module.exports = router;