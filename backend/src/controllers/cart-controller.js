const Customer = require("../models/customer");
const { successReponse, errorResponse } = require('./error-controller')

async function addProduct(req, res) {
    try {
        const customer = await Customer.findById(req.params.id);
        const cartItems = customer.cart.items;
        const i = cartItems.findIndex(item => item._id == req.body.item._id);
        if (i > -1) {
            cartItems[i].quantity += 1;
        } else {
            cartItems.push({ ...req.body.item, quantity: 1 });
        }
        const itemsTotalAmount = customer.cart.itemsTotalAmount + req.body.item.price;
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
        customer.cart = cart;
        await customer.save();
        const data = {
            success: true,
            message: 'Product added to cart successfully.',
            data: {
                cart: customer.cart
            }
        };
        res.send(data);
    } catch (error) {
        res.send({
            success: false,
            message: "Something went wrong.",
            data: error
        });
    }
}

module.exports = {
    addProduct
}
