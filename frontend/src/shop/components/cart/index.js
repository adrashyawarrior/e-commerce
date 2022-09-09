import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector((state) => state.cartStore);

    return (<div>

        {cart.items.map((item, i) => {
            return (<Item key={'item-' + i} 
            id={item._id}
            index={i+1}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
             />)
        })}
        
    </div>)
}

export default Cart;