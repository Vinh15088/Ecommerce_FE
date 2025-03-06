import React, { useEffect, useRef, useState } from 'react';
import SideMenu from '../common/SideMenu';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ProductService from '../../../service/ProductApiService';
import ProductTable from './ProductTable';

function Product(props) {
    const contentRef = useRef();
    const sidebarRef = useRef();

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(0);

    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [sortField] = useState('id');
    const [orderBy] = useState('asc')
    const [keyWord, setKeyWord] = useState('');
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [minPrice] = useState(null);
    const [maxPrice] = useState(null);


    useEffect(() => {
        fetchProducts();
    }, [pageNumber, keyWord, category, brand]);

    const fetchProducts = async () => {
        try {
            const data = await ProductService.getPageProduct(pageSize, pageNumber, sortField, orderBy, keyWord, category, brand, minPrice, maxPrice);

            setProducts(data.content);
            setPageInfo(data.pageInfo);

            console.log(data);
        } catch(error) {
            console.error("Error fetching users: ", error);
        }
    }

    const refreshData = () => {
        fetchProducts(pageInfo.page);
    }

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    }

    const handleSearch = (newKeyWord) => {
        setKeyWord(newKeyWord);
        setPageNumber(1);

        fetchProducts();
    }

    const handleChangeCategory = (newCategory) => {
        setCategory(newCategory);
        setPageNumber(1);
        fetchProducts();
    }

    const handleChangeBrand = (newBrand) => {
        setBrand(newBrand);
        setPageNumber(1);
        fetchProducts();
    }

    useEffect(() => {
        if(isSideMenuOpen) {
            setSidebarWidth(sidebarRef.current.offsetWidth);
        } else {
            setSidebarWidth(0);
        }
    }, [isSideMenuOpen]);

    return (
        <div className='grid grid-cols-6 md:grid-cols-10 xl:grid-cols-12 gap-0 h-full'>
            {/* sidebar */}
            {isSideMenuOpen && (
                <div ref={sidebarRef} className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2'>
                    <SideMenu />
                </div>
            )}
            
            {/* dashboard */}
            <div className={`col-span-5 
                ${isSideMenuOpen ? 
                'md:col-span-9 lg:col-span-8 xl:col-span-10' : 
                'md:col-span-10 xl:col-span-12'} 
                h-full`}>
                <div className='relative min-h-screen flex flex-col'>   
                    <div>
                        <Navbar toggleSideMenu={toggleSideMenu} />                        
                    </div>               
                   
                    <div className='overflow-y-auto h-screen flex flex-col' ref={contentRef}>
                        {/* content */}
                        <div className="flex-grow overflow-y-auto p-5 bg-slate-100" style={{ marginTop: 72, paddingBottom: '12rem' }}>
                            <ProductTable 
                                products={products} 
                                pageInfo={pageInfo} 
                                onPageChange={handlePageChange} 
                                onSearch={handleSearch} 
                                refreshData={refreshData}
                                sidebarWidth={sidebarWidth}
                                onChangeCategory={handleChangeCategory}
                                onChangeBrand={handleChangeBrand}
                            />
                        </div>

                        {/* footer */}
                        <Footer />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product;