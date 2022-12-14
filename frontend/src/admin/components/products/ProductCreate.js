import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

import ProductService from '../../../services/ProductService';

const ProductCreate = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        ProductService.createProduct().then((response) => {
            setCategories(response.categories.map(function (category) {
                return {
                    value: category._id,
                    label: category.name
                }
            }));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        setSelectedCategories(selectedOptions.map(function (option) {
            return option.value;
        }));
    }, [selectedOptions]);

    const submit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('image', image);
        formData.append('categories', selectedCategories);
        await ProductService.storeProduct(formData);
        navigate('/account/products');
    }



    return (
        <div className='m-8 p-16 rounded-xl bg-gray-100'>
            <h1 className='pb-4 mb-4 border-b-2 text-3xl bold'>Add New Product</h1>
            <form>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Robert Junior" required=""
                        value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                    <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required=""
                        value={price} onChange={(e) => { setPrice(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stock</label>
                    <input type="number" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required=""
                        value={stock} onChange={(e) => { setStock(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image</label>
                    <Select
                        defaultValue={selectedCategories}
                        onChange={setSelectedOptions}
                        options={categories}
                        isMulti
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image</label>
                    <input type="file" name='image' id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Robert Junior" required=""
                        onChange={(e) => { setImage(e.target.files[0]) }}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submit}
                >Submit</button>
            </form>

        </div>
    )
}

export default ProductCreate