const mongoose = require('mongoose')

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Category', Category);