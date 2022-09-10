import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartService from "../../../services/CartService";
import { cartActions } from "../../../store/cart";

const Item = ({ id, index, image, name, price, quantity }) => {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.authStore.authUser);

    async function addProductHandler() {
        if (authUser && authUser.type === 'Customer') {
            const response = await CartService.addProduct({ itemId: id })
            if (response.success) {
                dispatch(cartActions.updateCart(response.data.cart));
            }
        }
    }

    async function removeProductHandler(removeAll = false) {
        if (authUser && authUser.type === 'Customer' && (removeAll || quantity > 1)) {
            const response = await CartService.removeProduct({
                itemId: id,
                removeAll: removeAll
            })
            if (response.success) {
                dispatch(cartActions.updateCart(response.data.cart));
            }
        }
    }


    return (
        <div className="grid grid-cols-12 justify-between px-4 py-2 leading-normal items-center bg-gray-100 rounded-lg border shadow-md w-full mx-2 my-2">
            <div className="">{index || 'NA'}</div>
            <div className="col-span-2">
                <img className="rounded-t-lg w-6 h-6" src={'http://localhost:4000/' + image} alt="" />
            </div>
            <div className="col-span-4">{name || 'NA'}</div>
            <div className="">₹ {price || 'NA'}</div>
            <div className="col-span-2">
                <button onClick={() => { removeProductHandler() }} type="button" className="text-red-400 hover:text-red-600 font-medium rounded-lg text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
                </button>
                <span className="px-4">{quantity || 'NA'}</span>
                <button onClick={() => { addProductHandler() }} type="button" className="text-green-400 hover:text-green-600 font-medium rounded-lg text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                </button>
            </div>
            <div className="font-bold">₹ {parseFloat(price) * parseInt(quantity)}</div>
            <div className="">
                <Link to="#" onClick={() => { removeProductHandler(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-300 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </Link>
            </div>
        </div>
    )

}

export default Item;