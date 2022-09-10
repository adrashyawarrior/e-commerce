const fs = require('fs');
const Category = require('../models/category');

const Product = require('../models/product')

async function index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const skip = (currentPage - 1) * perPage;
        const total = await Product.find().countDocuments();
        const products = await Product.find().sort({ _id: -1 }).skip(skip).limit(perPage);
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

async function store(req, res) {
    try {
        const input = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: req.file !== undefined ? 'uploads/' + req.file.filename : 'public/images/default-product.png',
            category: req.body.category
        };
        const product = await Product.create(input);
        await Category.updateMany({ '_id': product.categories }, { $push: { products: product._id } });
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
        const categories = await Category.find().select("name");
        const data = {
            product: product,
            categories: categories
        };
        res.send(data);
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
        req.body.category ? product.category = req.body.category : null;
        if (req.file !== undefined) {
            const oldImage = product.image;
            if (oldImage !== 'public/images/default-product.png') {
                fs.unlinkSync(oldImage);
            }
            product.image = 'uploads/' + req.file.filename;
        }
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

async function create(req, res) {
    try {
        const categories = await Category.find({}).select('name _id');
        const data = {
            categories: categories
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}


module.exports = {
    index, store, destroy, edit, update, create
};