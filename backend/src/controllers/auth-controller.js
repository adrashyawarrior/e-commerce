const User = require('../models/user')

async function login(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user && user.password == req.body.password) {
            res.send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
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