const Customer = require("../models/customer");
const Product = require("../models/product");
const { successReponse, errorResponse } = require('./error-controller')

async function addProduct(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const customer = await Customer.findById(res.locals.AuthUser._id);
            const item = await Product.findById(req.body.item_id);
            const cartItems = customer.cart.items;
            const i = cartItems.findIndex(item1 => item1._id == item._id);
            if (i > -1) {
                cartItems[i].quantity += 1;
            } else {
                cartItems.push({ ...item, quantity: 1 });
            }
            const itemsTotalAmount = customer.cart.itemsTotalAmount + item.price;
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
        }
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
