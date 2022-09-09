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
            <div className="col-span-4">

            </div>
        </div>
    </div>)
}

export default Cart;