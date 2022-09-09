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


Customer.methods.addItemToCart = async function (product_id) {
    const cartItems = this.cart.items;
    const i = cartItems.findIndex(item => item.product._id == product_id);
    if (i > -1) {
        cartItems[i].quantity += 1;
    } else {
        cartItems.push({ product: product_id, quantity: 1 });
    }
    const cart = {
        items: cartItems,
        itemsTotalAmount: 0,
        discountPercentage: 0,
        netAmount: 0,
        taxPercentage: 0,
        deliveryCharge: 0,
        payableAmount: 0
    };
    this.cart = cart;
    await this.save();
    return true;
}

Customer.methods.removeItemFromCart = async function (product_id) {
    const cartItems = this.cart.items;
    const i = cartItems.findIndex(item => item.product._id == product_id);
    console.log(cartItems);
    if (i > -1) {
        cartItems.splice(i, 1);
        const cart = {
            items: cartItems,
            itemsTotalAmount: 0,
            discountPercentage: 0,
            netAmount: 0,
            taxPercentage: 0,
            deliveryCharge: 0,
            payableAmount: 0
        };
        this.cart = cart;
        await this.save();
    }
    return true;
}

module.exports = mongoose.model('Customer', Customer);