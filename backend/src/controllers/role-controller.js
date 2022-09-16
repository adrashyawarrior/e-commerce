const Role = require("../models/Role");


async function index(req, res) {
    try {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const total = await Role.find().countDocuments();
        const roles = await Role.find().skip((page - 1) * perPage).limit(perPage);
        const data = {
            total: total,
            perPage: perPage,
            page: page,
            roles: roles
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function store(req, res) {
    try {
        const role = await Role.create(req.body);
        const data = {
            success: true,
            message: "Role created.",
            data: role
        }
        res.send(data);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Role not created",
            data: error
        })
    }
}


module.exports = {
    index, store
}