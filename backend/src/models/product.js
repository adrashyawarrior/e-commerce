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
    ratings: [{
        stars: {
            type: Number,
            default: 5
        },
        customer: {
            type: mongoose.Types.ObjectId,
            ref: 'Customer'
        }
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true,
});

Product.virtual('ratingAvg').get(function () {
    const total = this.ratings.length;
    const sum = total > 0 ? this.ratings.reduce((temp, item) => temp + item.stars) : 0;
    return total > 0 ? (sum / total).toFixed(1) : 0;
});

module.exports = mongoose.model('Product', Product);
