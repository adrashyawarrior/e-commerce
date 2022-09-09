const Customer = require("../models/customer");

async function getCart(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            const customer = await Customer.findById(res.locals.AuthUser._id);
            const cart = await customer.cart.populate('items.product');
            const data = {
                cart: {
                    items: cart.items.map(item => {
                        return {
                            _id: item.product._id,
                            name: item.product.name,
                            price: item.product.price,
                            image: item.product.image,
                            quantity: item.quantity
                        }
                    }),
                    itemsTotalAmount: cart.itemsTotalAmount,
                    discountPercentage: cart.discountPercentage,
                    netAmount: cart.netAmount,
                    taxPercentage: cart.taxPercentage,
                    deliveryCharge: cart.deliveryCharge,
                    payableAmount: cart.payableAmount
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

async function addProduct(req, res) {
    try {
        if (!res.locals.AuthUser || res.locals.AuthUser.constructor.modelName !== "Customer") {
            res.status(401).send("Opps! Unauthorized Access.");
        } else {
            let customer = await Customer.findById(res.locals.AuthUser._id);
            await customer.addItemToCart(req.body.itemId);
            const cart = await customer.cart.populate('items.product');
            const data = {
                success: true,
                message: 'Product added to cart successfully.',
                data: {
                    cart: {
                        items: cart.items.map(item => {
                            return {
                                _id: item.product._id,
                                name: item.product.name,
                                price: item.product.price,
                                image: item.product.image,
                                quantity: item.quantity
                            }
                        }),
                        itemsTotalAmount: cart.itemsTotalAmount,
                        discountPercentage: cart.discountPercentage,
                        netAmount: cart.netAmount,
                        taxPercentage: cart.taxPercentage,
                        deliveryCharge: cart.deliveryCharge,
                        payableAmount: cart.payableAmount
                    }
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
            const cart = await customer.cart.populate('items.product');

            const data = {
                success: true,
                message: 'Product removed from cart successfully.',
                data: {
                    cart: {
                        items: cart.items.map(item => {
                            return {
                                _id: item.product._id,
                                name: item.product.name,
                                price: item.product.price,
                                image: item.product.image,
                                quantity: item.quantity
                            }
                        }),
                        itemsTotalAmount: cart.itemsTotalAmount,
                        discountPercentage: cart.discountPercentage,
                        netAmount: cart.netAmount,
                        taxPercentage: cart.taxPercentage,
                        deliveryCharge: cart.deliveryCharge,
                        payableAmount: cart.payableAmount
                    }
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
