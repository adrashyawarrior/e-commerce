require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

module.exports = {
    login
}