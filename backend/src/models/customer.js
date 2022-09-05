const mongoose = require('mongoose');

const Customer = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    cart: {
        products: [],
        quantity: {
            type: Number,
            default: 0,
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', Customer);