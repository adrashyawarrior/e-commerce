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

        const input = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: 'uploads/' + req.file.originalname
        };
        const product = await Product.create(input);
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

async function destroy(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        const data = {
            success: true,
            data: product,
            message: 'Product deleted succesfully.'
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
    index, create, destroy
};