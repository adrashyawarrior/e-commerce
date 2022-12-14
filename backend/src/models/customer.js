const mongoose = require('mongoose');
const Product = require('./product');

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
        items: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 0
            }
        }],
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




Customer.methods.addItemToCart = async function (productId) {
    const cartItems = this.cart.items;
    const i = cartItems.findIndex(item => item.product._id == productId);
    if (i > -1) {
        cartItems[i].quantity += 1;
    } else {
        cartItems.push({ product: productId, quantity: 1 });
    }

    const item = await Product.findById(productId);
    const itemsTotalAmount = this.cart.itemsTotalAmount + item.price;
    const netAmount = itemsTotalAmount;
    const payableAmount = netAmount;

    const cart = {
        items: cartItems,
        itemsTotalAmount: itemsTotalAmount,
        discountPercentage: 0,
        netAmount: netAmount,
        taxPercentage: 0,
        deliveryCharge: 0,
        payableAmount: payableAmount
    };
    this.cart = cart;
    await this.save();
    return true;
}

Customer.methods.removeItemFromCart = async function (productId, removeAll = false) {
    const cartItems = this.cart.items;
    const i = cartItems.findIndex(item => item.product._id == productId);
    if (i > -1) {
        if (cartItems[i].quantity <= 1 || removeAll) {
            cartItems.splice(i, 1);
        } else {
            cartItems[i].quantity -= 1;
        }

        const item = await Product.findById(productId);
        const itemsTotalAmount = this.cart.itemsTotalAmount - item.price;
        const netAmount = itemsTotalAmount;
        const payableAmount = netAmount;

        const cart = {
            items: cartItems,
            itemsTotalAmount: itemsTotalAmount,
            discountPercentage: 0,
            netAmount: netAmount,
            taxPercentage: 0,
            deliveryCharge: 0,
            payableAmount: payableAmount
        };
        this.cart = cart;
        await this.save();
    }
    return true;
}


module.exports = mongoose.model('Customer', Customer);