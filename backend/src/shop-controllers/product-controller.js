const Product = require('../models/product')
const Category = require('../models/category')

async function index(req, res) {
    try {
        const sortBy = req.query.sortBy || '_id';
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const skip = (currentPage - 1) * perPage;

        const categoryIds = req.query.categories ? req.query.categories.split(",") : [];

        let categoryFilter = {};
        if (categoryIds.length > 0) {
            categoryFilter = { category: { $in: categoryIds } };
        }

        const total = await Product.find(categoryFilter).countDocuments();

        const products = await Product.find(categoryFilter)
            .populate('category', 'name')
            .sort({ [sortBy]: sortDirection }).skip(skip).limit(perPage);
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

async function filters(req, res) {
    try {
        const categories = await Category.find().select("name");
        const data = {
            categories: categories
        }
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}


module.exports = {
    index,
    filters
};