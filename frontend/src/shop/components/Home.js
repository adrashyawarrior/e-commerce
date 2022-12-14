import React from 'react'
import ProductCard from './ProductCard'
import ShopProductService from '../../services/ShopProductService'
import Loadmore from '../layouts/Loadmore'

const Home = () => {
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(5);
    const [total, setTotal] = React.useState(0);
    const [refetch, setRefetch] = React.useState('initial');

    React.useEffect(() => {
        ShopProductService.getProducts(`?perPage=${perPage}&page=${currentPage}`).then((response) => {
            setProducts([...products, ...response.products]);
            setTotal(response.total);
            setCurrentPage(response.currentPage);
            setPerPage(response.perPage);
        }).catch((error) => {
            console.log(error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch]);

    function handlePagination(data) {
        setCurrentPage(data.currentPage);
        setPerPage(data.perPage);
        setRefetch(new Date());
    }

    return (
        <div className='bg-gray-300 p-4 grid grid-rows-1'>
            <div className='grid grid-cols-12 w-full'>
                <div className='col-span-12'>
                    <div className='grid grid-cols-5 gap-4 py-8 pr-8 pl-16'>
                        {products.map((product, i) => {
                            return (<ProductCard key={'product-' + i} product={product} />)
                        })}
                    </div>
                    <div className='grid grid-cols-4'>
                        <div></div>
                        <div>
                            <Loadmore
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