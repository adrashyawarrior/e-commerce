import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryService from '../../../services/CategoryService';

const CategoryCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        CategoryService.createCategory().then((response) => {
            setProducts(response.products);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            products: products
        };
        const category = await CategoryService.storeCategory(data);
        console.log(category);
        navigate('/account/categories');
    }

    return (
        <div className='m-8 p-16 rounded-xl bg-gray-100'>
            <h1 className='pb-4 mb-4 border-b-2 text-3xl bold'>Add New Category</h1>
            <form>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Electronics" required=""
                        value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submit}
                >Submit</button>
            </form>

        </div>
    )
}

export default CategoryCreate