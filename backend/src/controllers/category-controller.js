const Category = require('../models/category')

async function index(req, res) {
    try {
        if (res.locals.AuthUser.role != 'Admin') {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const currentPage = req.query.page || 1;
            const perPage = req.query.perPage || 10;
            const total = await Category.find().countDocuments();
            const skip = (currentPage - 1) * perPage;
            const categories = await Category.find().skip(skip).limit(perPage).populate("parentCategory", "name");
            const data = {
                categories: categories,
                total: total,
                currentPage: currentPage,
                perPage: perPage
            }
            res.send(data);
        }
    } catch (error) {
        res.send(error);
    }
}

async function create(req, res) {
    try {
        const categories = await Category.find({});
        const data = {
            categories: categories,
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function store(req, res) {
    try {
        let category = await Category.create(req.body);
        const data = {
            success: true,
            data: category,
            message: 'Category Created Successfully.'
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
        const category = await Category.findByIdAndDelete(req.params.id);
        const data = {
            success: true,
            data: category,
            message: 'Category deleted succesfully.'
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
        const category = await Category.findById(req.params.id);
        const data = {
            category: category
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function update(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        req.body.name ? category.name = req.body.name : null;
        req.body.products ? category.products = req.body.products : null;
        await category.save();
        const data = {
            success: true,
            data: category,
            message: 'Category updated succesfully.'
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
    store,
    edit,
    update,
    destroy
}