const mongoose = require('mongoose')

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    subCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }],
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Category', Category);