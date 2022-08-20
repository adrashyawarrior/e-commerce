const User = require('../models/user')

async function index(req, res) {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.send(error);
    }
}

async function create(req, res) {
    try {
        let user = await User.create(req.body);
        const data = {
            success: true,
            data: user,
            message: 'User Created Successfully.'
        };
        res.send(data);
    } catch (error) {
        const data = {
            success: false,
            data: error,
            message: 'Something Went Wrong.'
        };
        res.send(data);
    }
}

module.exports = {
    index,
    create
}