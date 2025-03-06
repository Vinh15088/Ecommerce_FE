import React, { useEffect, useRef, useState } from 'react';
import SideMenu from '../common/SideMenu';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import CategoryTable from './CategoryTable';
import CategoryService from '../../../service/CategoryApiService';

function Category(props) {
    const contentRef = useRef();

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

    const [categories, setCategories] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const [sortField] = useState('id');
    const [keyWord, setKeyWord] = useState('');


    useEffect(() => {
        fetchCategories();
    }, [pageNumber, keyWord]);

    const fetchCategories = async () => {
        try {
            const data = await CategoryService.getCategoryPage(pageNumber, pageSize, sortField, keyWord);

            setCategories(data.content);
            setPageInfo(data.pageInfo);
        } catch(error) {
            console.error("Error fetching users: ", error);
        }
    }

    const refreshData = () => {
        fetchCategories(pageInfo.page);
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
    }

    return (
        <div className='grid grid-cols-6 md:grid-cols-10 xl:grid-cols-12 gap-0 h-full'>
            {/* sidebar */}
            {isSideMenuOpen && (
                <div className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2'>
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
                            <CategoryTable categories={categories} pageInfo={pageInfo} onPageChange={handlePageChange} onSearch={handleSearch} refreshData={refreshData}/>
                        </div>

                        {/* footer */}
                        <Footer />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Category;