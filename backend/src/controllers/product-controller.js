const Product = require('../models/product')

async function index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const skip = (currentPage - 1) * perPage;
        const total = await Product.find().countDocuments();
        const products = await Product.find().skip(skip).limit(perPage);
        res.send({
            products: products,
            total: total,
            currentPage: currentPage,
            perPage: perPage
        });
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
            image: req.file !== undefined ? 'uploads/' + req.file.filename : 'public/images/default-product.png'
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

async function edit(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (error) {
        res.send(error);
    }
}

async function update(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        req.body.name ? product.name = req.body.name : null;
        req.body.price ? product.price = req.body.price : null;
        req.body.stock ? product.stock = req.body.stock : null;
        req.file !== undefined ? product.image = 'uploads/' + req.file.filename : null;
        await product.save();
        const data = {
            success: true,
            data: product,
            message: 'Product updated succesfully.'
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
    index, create, destroy, edit, update
};