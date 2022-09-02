require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Oops! Please Login first.');
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, user) => {
        if (error) return res.status(403).send('Oops! Unathenticated Access.');
        req.user = user;
        res.locals.AuthUser = await User.findOne({ email: user.email });
        next();
    });
}

module.exports = { authenticateToken }