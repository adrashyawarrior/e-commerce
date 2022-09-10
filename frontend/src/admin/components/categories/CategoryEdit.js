import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryService from '../../../services/CategoryService';

const CategoryEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.editCategory(id).then((response) => {
            setName(response.category.name);
            setParentCategory(response.category.parentCategory);
            setCategories(response.categories);
        }).catch((error) => {
            console.log(error);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        await CategoryService.updateCategory(id, {
            name: name,
            parentCategory: parentCategory
        });
        navigate('/account/categories');
    }

    return (
        <div className='m-8 p-16 rounded-xl bg-gray-100'>
            <h1 className='pb-4 mb-4 border-b-2 text-3xl bold'> Update Category </h1>
            <form>
            <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category Name *</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Electronics" required="required"
                        value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Parent Category</label>
                    <select id="parentCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""
                        value={parentCategory} onChange={(e) => { setParentCategory(e.target.value) }}
                    >
                        <option value="">-- No Parent --</option>
                        {
                            categories.map((item) => {
                                return (
                                    <option key={"category-" + item._id} value={item._id}> {item.name} </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submit}
                >Submit</button>
            </form>

        </div>
    )
}

export default CategoryEdit