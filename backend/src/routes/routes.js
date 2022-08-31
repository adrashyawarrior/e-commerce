require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const authRoutes = require('./auth-routes')
const errorRoutes = require('./error-routes')
const userRoutes = require('./user-routes')
const productRoutes = require('./product-routes')

const router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Oops! Please Login first.');
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
        if (error) return res.status(403).send('Oops! Unathenticated Access.');
        req.user = user;
        next();
    });
}

router.use(express.json());

router.use('', authRoutes);
router.use('/users', authenticateToken, userRoutes);
router.use('/products', productRoutes);
router.use('*', errorRoutes);

module.exports = router;