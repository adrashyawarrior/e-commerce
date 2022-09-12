require('dotenv').config()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Customer = require('../models/customer');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_KEY);
}

async function refreshToken(req, res) {
    try {
        if (req.body.refreshToken == null) return res.status(401).send({ success: false });
        const user = await User.findOne({ refreshToken: req.body.refreshToken });
        if (!user) return res.status(401).send({ success: false, message: "Please provide refresh token." });
        jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
            if (err) res.status(403).send({ success: false, message: "Refresh token is expired." });
            const accessToken = generateAccessToken({ email: user.email });
            res.send({ accessToken: accessToken });
        });
    } catch (error) {
        res.send({ success: false, message: "Failed" })
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user && user.password == req.body.password) {
            const accessToken = generateAccessToken({ email: user.email });
            const refreshToken = generateRefreshToken({ email: user.email });
            user.refreshToken = refreshToken;
            await user.save();
            res.send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                message: 'You have loggedin Successfully.'
            });
        } else {
            res.send({
                success: false,
                message: 'Oops! Wrong Email or Password.'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            data: error,
            message: 'Oops! Wrong Email or Password.'
        })
    }
}


async function customerLogin(req, res) {
    try {
        const customer = await Customer.findOne({
            email: req.body.email
        });
        if (customer && customer.password == req.body.password) {
            const accessToken = jwt.sign({ email: customer.email }, process.env.ACCESS_TOKEN_KEY);
            res.send({
                success: true,
                data: {
                    name: customer.name,
                    email: customer.email,
                    accessToken: accessToken,
                    cart: customer.cart
                },
                message: 'You have loggedin Successfully.'
            });
        } else {
            res.send({
                success: false,
                message: 'Oops! Wrong Email or Password.'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            data: error,
            message: 'Oops! Wrong Email or Password.'
        })
    }
}

async function customerReginstration(req, res) {
    try {
        const customer = await Customer.create(req.body);
        res.send({
            success: true,
            message: 'You have registered successfully.',
            data: customer
        });
    } catch (error) {
        res.send({
            success: false,
            data: error,
            message: 'Oops! Please fill information correctly.'
        })
    }
}


async function logout(req, res) {
    try {
        if (req.body.refreshToken == null) return res.status(401).send({ success: false });
        const user = await User.findOne({ refreshToken: req.body.refreshToken });
        if (!user) return res.status(401).send({ success: false, message: "Please provide refresh token." });
        user.refreshToken = null;
        await user.save();
        res.send({ success: true, message: "Logout successfully." });
    } catch (error) {
        res.send({
            success: false,
            message: 'something went wrong.',
            data: error
        })
    }
}

module.exports = {
    login,
    customerLogin,
    customerReginstration,
    refreshToken,
    logout
}