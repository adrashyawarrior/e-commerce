import React from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import ShopProductService from '../../services/ShopProductService'
import Pagination from '../../shop/layouts/Pagination'

const Home = () => {
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(15);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        ShopProductService.getProducts(`?perPage=${perPage}&page=${currentPage}`).then((response) => {
            setProducts(response.products);
            setTotal(response.total);
            setCurrentPage(response.currentPage);
            setPerPage(response.perPage);
        }).catch((error) => {
            console.log(error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, perPage]);

    function handlePagination(data) {
        setCurrentPage(data.currentPage);
        setPerPage(data.perPage);
    }

    return (
        <div className='bg-gray-300 p-4'>
            <div className='grid grid-cols-12 w-full'>
                <div className='col-span-2'>
                    <div className='grid grid-cols-1 m-8 min-h-[30em]'>
                        <aside className="w-64" aria-label="Sidebar">
                            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                                <span className='text-lg px-3'>Categories</span>
                                <ul className="space-y-2 mt-4">
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">All</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Men's Wear</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Women's Wear</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Kids' Wear</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Electronics</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Grossary</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Mobiles</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-lime-500 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Laptops</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
                <div className='col-span-10'>
                    <div className='grid grid-cols-5 gap-4 m-8'>
                        {products.map((product, i) => {
                            return (<ProductCard key={'product-' + i} product={product} />)
                        })}
                    </div>
                    <div className='grid grid-cols-4'>
                        <div></div>
                        <div>
                            <Pagination
                                perPage={perPage}
                                currentPage={currentPage}
                                total={total}
                                onPaginationChange={handlePagination}
                                name="Products"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home