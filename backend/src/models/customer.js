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
        items: [],
        itemsTotalAmount: {
            type: Number,
            default: 0
        },
        discountPercentage: {
            type: Number,
            default: 0
        },
        netAmount: {
            type: Number,
            default: 0
        },
        taxPercentage: {
            type: Number,
            default: 0
        },
        deliveryCharge: {
            type: Number,
            default: 0
        },
        payableAmount: {
            type: Number,
            default: 0
        }

    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', Customer);