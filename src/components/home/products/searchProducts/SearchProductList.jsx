import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../constants/Route';
import FilterBar from './FilterBar';
import Product from '../../../common/allProducts/Product';
import { useState, useContext, useEffect } from 'react';
import { NavbarContext } from '../../../../context/NavbarContext';

const SearchProductList = ({products}) => {
    console.log(products);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(10);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleFilter = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    }

    const handleProductClick = (productId) => {
        navigate(ROUTES.PAGE_SINGLE_PRODUCT.replace(':id', productId), 
            { state: { product: products.find(product => product.id === productId) } }
        );
    };

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    const { refreshCart } = useContext(NavbarContext);

    return (
        <div className='grid grid-cols-12 gap-1'>
            <div className="col-start-2 col-span-10">
                <FilterBar 
                    products={products} 
                    onFilter={handleFilter}
                />

                <div className="flex w-full mt-5 flex-wrap">
                    {filteredProducts.length === 0 ? (
                        <div className='w-full flex justify-center'>
                            <img src="../../assets/images/NotFound.png" alt="no-product" className='w-1/3' />
                        </div>
                    ) : (
                        filteredProducts.slice(0, visibleCount).map((product, index) => (
                            <div key={index} className='w-1/5 p-1' onClick={() => handleProductClick(product.id)}> 
                                <Product product={product} refreshCart={refreshCart}/>
                            </div>                        
                        ))
                    )}
                </div>

                <div className='flex justify-center pb-10'>
                    {visibleCount < products.length && (
                        <button onClick={handleLoadMore} className='mt-4 p-2 px-2 bg-blue-500 text-white rounded-full text-center'>
                            Xem thêm {products.length - visibleCount} sản phẩm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchProductList;