const User = require('../models/user')

async function index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const total = await User.find().countDocuments();
        const skip = (currentPage - 1) * perPage;
        const users = await User.find().skip(skip).limit(perPage);
        const data = {
            users: users,
            total: total,
            currentPage: currentPage,
            perPage: perPage
        }
        res.send(data);
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


async function destroy(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const data = {
            success: true,
            data: user,
            message: 'User deleted succesfully.'
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

async function edit(req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
}

async function update(req, res) {
    try {
        const user = await User.findById(req.params.id);
        req.body.name ? user.name = req.body.name : null;
        req.body.password ? user.password = req.body.password : null;
        req.body.email ? user.email = req.body.email : null;
        req.body.status ? user.status = req.body.status : null;
        await user.save();
        const data = {
            success: true,
            data: user,
            message: 'User updated succesfully.'
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
    create,
    edit,
    update,
    destroy
}