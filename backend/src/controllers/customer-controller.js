const Customer = require('../models/customer')

async function index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const total = await Customer.find().countDocuments();
        const skip = (currentPage - 1) * perPage;
        const customers = await Customer.find().skip(skip).limit(perPage);
        const data = {
            customers: customers,
            total: total,
            currentPage: currentPage,
            perPage: perPage
        }
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}


module.exports = {
    index
}