require('dotenv').config()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Customer = require('../models/customer')

async function login(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user && user.password == req.body.password) {
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_KEY);
            res.send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
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
            message: 'Oops! Wrong Email or Password.'
        })
    }
}


module.exports = {
    login,
    customerLogin,
    customerReginstration
}