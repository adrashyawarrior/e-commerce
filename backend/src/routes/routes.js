const express = require('express')

const authRoutes = require('./auth-routes')
const errorRoutes = require('./error-routes')
const homeRoutes = require('./home-routes')
const userRoutes = require('./user-routes')
const productRoutes = require('./product-routes')
const categoryRoutes = require('./category-routes')
const { authenticateToken } = require('../middlewares/auth-middleware')

// shop
const shopProductRoutes = require('../routes/shop-product-routes')

const router = express.Router();

router.use(express.json());



router.use('/categories', categoryRoutes);
router.use('/products', shopProductRoutes);
router.use('/users', authenticateToken, userRoutes);
router.use('/account/products', authenticateToken, productRoutes);
router.use('', authRoutes);
router.use('', authenticateToken, homeRoutes);
router.use('*', errorRoutes);

module.exports = router;