import React, { useEffect, useRef, useState } from 'react';
import SideMenu from '../common/SideMenu';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import OrderService from '../../../service/OrderApiService';
import OrderTable from './OrderTable';

function Order(props) {
    const contentRef = useRef();
    const sidebarRef = useRef();

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(0);

    const [orders, setOrders] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [sortField] = useState('createdAt');
    const [orderBy] = useState('desc')
    const [keyWord, setKeyWord] = useState('');
    const [status, setStatus] = useState('');
    const [method, setMethod] = useState('');


    useEffect(() => {
        fetchOrders();
    }, [pageNumber, keyWord, status, method]);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getAllOrder(pageSize, pageNumber, sortField, orderBy, keyWord, status, method );

            setOrders(data.content);
            setPageInfo(data.pageInfo);

            console.log(data);
        } catch(error) {
            console.error("Error fetching orders: ", error);
        }
    }

    const refreshData = () => {
        fetchOrders(pageInfo.page);
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
        fetchOrders();
    }

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
        setPageNumber(1);
        fetchOrders();
    }

    const handleChangeMethod = (newMethod) => {
        setMethod(newMethod);
        setPageNumber(1);
        fetchOrders();
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
                            <OrderTable 
                                orders={orders} 
                                pageInfo={pageInfo} 
                                onPageChange={handlePageChange} 
                                onSearch={handleSearch} 
                                refreshData={refreshData}
                                sidebarWidth={sidebarWidth}
                                onChangeStatus={handleChangeStatus}
                                onChangeMethod={handleChangeMethod}
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

export default Order;