import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Rating from '../Rating'
import CartService from '../../../services/CartService'
import { cartActions } from '../../../store/cart'


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.authStore.authUser);

    async function addProductHandler() {
        if (authUser && authUser.type === 'Customer') {
            const response = await CartService.addProduct({ itemId: product._id })
            if (response.success) {
                dispatch(cartActions.updateCart(response.data.cart));
            }
        }
    }

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to="#">
                <img className="p-4 rounded-t-lg w-36 h-36" src={'http://localhost:4000/' + product.image} alt="" />
            </Link>
            <div className="px-5 pb-5">
                <Link to="#">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                </Link>
                <Rating rating={product.ratingAvg || 0} />
                <div className="flex justify-between items-center">
                    <span className="text-md font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                    <Link to="#" onClick={() => addProductHandler()} className="text-white bg-blue-700 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
                </div>
            </div>
        </div>

    )
}

export default ProductCard