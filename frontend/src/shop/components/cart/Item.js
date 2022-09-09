import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, index, image, name, price, quantity }) => {
    return (
        <div class="grid grid-cols-12 justify-between px-4 py-2 leading-normal items-center bg-gray-100 rounded-lg border shadow-md  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-5/6 mx-2 my-2">
            <div className="">{index || 'NA'}</div>
            <div className="col-span-2">
                <img className="rounded-t-lg w-6 h-6" src={'http://localhost:4000/' + image} alt="" />
            </div>
            <div className="col-span-3">{name || 'NA'}</div>
            <div className="">₹ {price || 'NA'}</div>
            <div className="col-span-2">
                <button type="button" class="text-red-400 hover:text-red-600 font-medium rounded-lg text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
                </button>
                <span className="px-4">{quantity || 'NA'}</span>
                <button type="button" class="text-green-400 hover:text-green-600 font-medium rounded-lg text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                </button>
            </div>
            <div className="">₹ {parseFloat(price) * parseInt(quantity)}</div>
            <div className="">
                <Link to="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-300 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </Link>
            </div>
        </div>
    )

}

export default Item;