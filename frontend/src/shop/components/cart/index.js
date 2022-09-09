import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector((state) => state.cartStore);

    return (<div className="grid grid-rows-1">
        <div className="grid grid-cols-12">
            <div className="col-span-8 px-8 pb-8 pt-4">
                <div className="text-center text-xl font-bold p-4">Products In Your Cart</div>
                {cart.items.map((item, i) => {
                    return (<Item key={'item-' + i}
                        id={item._id}
                        index={i + 1}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                    />)
                })}
            </div>
            <div className="col-span-4 px-8 pb-8 pt-4">
                <div className="text-center text-xl font-bold p-4">Checkout</div>
                <div className="bg-gray-100 p-8 shadow-md grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 text-right">Products Total</div>
                        <div className="text-center">:</div>
                        <div className="col-span-3">Rs. 12000</div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 text-right">Discount</div>
                        <div className="text-center">:</div>
                        <div className="col-span-3">Rs. 12000</div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 text-right">Tax</div>
                        <div className="text-center">:</div>
                        <div className="col-span-3">Rs. 12000</div>
                    </div>
                    <div className="grid grid-cols-12 border-t-2 pt-1 mt-1 border-gray-400">
                        <div className="col-span-8 text-right">Payable Amount</div>
                        <div className="text-center">:</div>
                        <div className="col-span-3">Rs. 12000</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Cart;