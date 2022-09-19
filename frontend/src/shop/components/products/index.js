import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ShopProductService from '../../../services/ShopProductService'
import Pagination from '../../layouts/Pagination'
import ProductCard from './ProductCard'
import Search from './Search'
import { Link } from 'react-router-dom'

const sortOptions = [
    { name: 'Newest', value: '_id' },
    { name: 'Name', value: 'name' },
    { name: 'Best Rating', value: 'rating' },
    { name: 'Price', value: 'price' },
]

const sortDirections = [
    { name: 'Ascending', value: 'asc' },
    { name: 'Descending', value: 'desc' }
]

const perPageOptions = [
    { name: '8', value: 8 },
    { name: '12', value: 12 },
    { name: '16', value: 16 },
    { name: '20', value: 20 },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const [total, setTotal] = useState(0);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [categories, setCategories] = useState();
    const [sortBy, setSortBy] = useState("_id");
    const [sortDirection, setSortDirection] = useState("desc");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        ShopProductService.getFilters().then((response) => {
            setCategories(response.categories);
        }).catch((error) => {
            console.log(error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
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

    useEffect(() => {
        ShopProductService.getProducts(`?perPage=${perPage}&page=${currentPage}&sortBy=${sortBy}&sortDirection=${sortDirection}&categories=${selectedCategories.join(',')}`).then((response) => {
            setProducts(response.products);
            setTotal(response.total);
            setCurrentPage(response.currentPage);
            setPerPage(response.perPage);
        }).catch((error) => {
            console.log(error);
        });
        // console.log(selectedCategories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories, sortBy, sortDirection, searchTerm]);

    function handlePagination(data) {
        setCurrentPage(data.currentPage);
        setPerPage(data.perPage);
    }

    function handleCategorySelect(categoryId) {
        if (!selectedCategories.includes(categoryId)) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter(function (value) {
                return value !== categoryId;
            }))
        }
    }

    function handlePerPageSelect(value) {
        setPerPage(value);
        setCurrentPage(1);
        return true;
    }

    function handleSearch(value) {
        setSearchTerm(value);
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">

                                        <Disclosure as="div" className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900"> Category </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {categories ? categories.map((category, categoryId) => (
                                                                <div key={category._id} className="flex items-center">
                                                                    <input
                                                                        id={`filter-category-${categoryId}`}
                                                                        name={`${category.id}[]`}
                                                                        defaultValue={category.value}
                                                                        type="checkbox"
                                                                        defaultChecked=""
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-category-${categoryId}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {category.name}
                                                                    </label>
                                                                </div>
                                                            )) : null}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">

                        <Search />


                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left mx-4">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort By
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    <a
                                                        href="#"
                                                        onClick={() => { setSortBy(option.value) }}
                                                        className={classNames(
                                                            (sortBy === option.value) ? 'text-gray-800' : 'text-gray-500',
                                                            (sortBy === option.value) ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <Menu as="div" className="relative inline-block text-left mx-4">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort Direction
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortDirections.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    <a
                                                        href="#"
                                                        onClick={() => { setSortDirection(option.value) }}
                                                        className={classNames(
                                                            (sortDirection === option.value) ? 'text-gray-800' : 'text-gray-500',
                                                            (sortDirection === option.value) ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>


                            <Menu as="div" className="relative inline-block text-left mx-4">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Per Page
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {perPageOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    <a
                                                        href="#"
                                                        onClick={() => { handlePerPageSelect(option.value) }}
                                                        className={classNames(
                                                            (perPage === option.value.toString()) ? 'text-gray-800' : 'text-gray-500',
                                                            (perPage === option.value.toString()) ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">

                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900"> Category </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {categories ? categories.map((category, categoryId) => (
                                                        <div key={category._id} className="flex items-center">
                                                            <input
                                                                id={`filter-category-${categoryId}`}
                                                                name={`${category._id}[]`}
                                                                defaultValue={category._id}
                                                                type="checkbox"
                                                                defaultChecked=""
                                                                onClick={() => { handleCategorySelect(category._id) }}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-category-${categoryId}`}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    )) : null}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Replace with your content */}
                                <div className="h-96 rounded-lg lg:h-full" >
                                    <div className='col-span-10'>
                                        {total > 0 ?
                                            <div className='grid grid-cols-4 gap-4 py-8 pr-8 pl-16'>
                                                {products.map((product, i) => {
                                                    return (<ProductCard key={'product-' + i} product={product} />)
                                                })}
                                            </div>
                                            : <div className='p-4'> Sorry No Products Found ! </div>
                                        }
                                        <div className='grid grid-cols-4'>
                                            <div></div>
                                            <div>
                                                {
                                                    total > 0 ?
                                                        <Pagination
                                                            perPage={perPage}
                                                            currentPage={currentPage}
                                                            total={total}
                                                            onPaginationChange={handlePagination}
                                                            name="Products"
                                                        /> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
