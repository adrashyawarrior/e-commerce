const Product = require('../models/product')

async function index(req, res) {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.send(error);
    }
}

async function create(req, res) {
    try {
        const product = await Product.create(req.body);
        const data = {
            success: true,
            data: product,
            message: 'Product created succesfully.'
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
    index, create
};