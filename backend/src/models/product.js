const mongoose = require('mongoose')

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: String,
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', Product);
