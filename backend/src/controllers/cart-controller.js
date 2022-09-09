const Customer = require("../models/customer");

async function getCart(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const customer = await Customer.findById(res.locals.AuthUser._id);
            const data = {
                cart: customer.cart
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

async function addProduct(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const customer = await Customer.findById(res.locals.AuthUser._id);
            await customer.addItemToCart(req.body.itemId);
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

async function removeProduct(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const customer = await Customer.findById(res.locals.AuthUser._id);
            await customer.removeItemFromCart(req.body.itemId, req.body.removeAll);
            const data = {
                success: true,
                message: 'Product removed from cart successfully.',
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
    getCart,
    addProduct,
    removeProduct
}
