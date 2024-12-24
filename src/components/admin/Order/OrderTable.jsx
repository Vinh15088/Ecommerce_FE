import { ChevronDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/16/solid';
import React, {useState, useRef } from 'react';
import { format } from "date-fns";
import FilterModal from './FilterModal';
import DetailModal from './DetailModal';
import OrderService from '../../../service/OrderApiService';
import {Pagination} from '../common/PaginationTable';
import { showErrorToast, showSuccessToast } from '../../common/toastUtils';

const statusOptions = [
    {name: "PENDING", value: 'PENDING'},
    {name: "CONFIRMED", value: 'CONFIRMED'},
    {name: "SHIPPED", value: 'SHIPPED'},
    {name: "DELIVERED", value: 'DELIVERED'},
    {name: "CANCELED", value: 'CANCELED'},
];

const methodOptions = [
    {name: "CASH", value: 'CASH'},
    {name: "CREDIT_CARD", value: 'CREDIT_CARD'},
    {name: "VNPAY", value: 'VNPAY'},
    {name: "ZALOPAY", value: 'ZALOPAY'},
];
function OrderTable({orders, pageInfo, onPageChange, onSearch, refreshData, sidebarWidth, onChangeStatus, onChangeMethod}) {
    const itemIconClass = "w-8 h-8 lg:w-7 lg:h-7";

    // filter
    const statusButtonRef = useRef(null);
    const methodButtonRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [openModal, setOpenModal] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleFilter = () => {
        onSearch(searchKeyword);
    };

    const handleReset = () => {
        setSearchKeyword('');
        setSelectedStatus(null);
        setSelectedMethod(null);
        onSearch('');
        onChangeStatus('');
        onChangeMethod('');
    };

    const handleDetail = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const handleFilterSelect = (filterType, option) => {
        setOpenModal(null);
    
        if (filterType === 'status') {
            console.log("Status selected:", option);
            setSelectedStatus(option);
            onChangeStatus(option);
        }
        if (filterType === 'method') {
            console.log("Method selected:", option);
            setSelectedMethod(option);
            onChangeMethod(option);
        }
    };    

    const toggleModal = (modalType, buttonRef) => {
        if (openModal === modalType) {
            setOpenModal(null);
        } else {
            const rect = buttonRef.current.getBoundingClientRect();

            setModalPosition({
                top: rect.bottom + window.scrollY + 4, 
                left: rect.left + window.scrollX - sidebarWidth,
                width: rect.width
            });
            setOpenModal(modalType);
        }
    };

    const handleActionChange = async (orderCode, newStatus) => {
        try {
            const updatedOrder = await OrderService.updateOrder(orderCode, {
                newOrderStatus: newStatus
            });

            refreshData();
            showSuccessToast("Cập nhật trạng thái đơn hàng thành công!");

            console.log('Order updated: {}', updatedOrder);
        } catch(error) {
            showErrorToast("Cập nhật trạng thái đơn hàng thất bại!");
            console.error('Error updating order: {}', error);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Search and Filter */}
            <div className="gap-2 grid grid-cols-5 mb-4  bg-white mt-15 px-5 py-10 rounded-lg">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên" 
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="col-span-3 p-2 border bg-slate-100  rounded-lg w-full"
                />          
                <button onClick={handleFilter} className="col-span-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">Tìm kiếm</button>
                <button onClick={handleReset} className="col-span-1 bg-red-400 hover:bg-red-500 p-2 rounded-lg">Hủy</button>
                <button 
                    ref={statusButtonRef} 
                    onClick={() => toggleModal('status', statusButtonRef)} 
                    className={`flex items-center justify-between col-span-1 p-2 rounded-lg ${
                        openModal === 'status' ? 'bg-slate-300 text-black' : 'bg-gray-200 text-black'
                    }`}
                >
                    <span>{selectedStatus || 'Trạng thái đơn hàng'}</span>
                    <ChevronDownIcon className={itemIconClass} />
                </button>
                <button 
                    ref={methodButtonRef} 
                    onClick={() => toggleModal('method', methodButtonRef)} 
                    className={`flex items-center justify-between col-span-1 p-2 rounded-lg ${
                        openModal === 'method' ? 'bg-slate-300 text-black' : 'bg-gray-200 text-black'
                    }`}
                >
                    <span>{selectedMethod || 'Thanh toán'}</span>
                    <ChevronDownIcon className={itemIconClass} />
                </button>
            </div>

            {/* Table */}
            <div className='border border-gray-300 rounded-lg shadow-md'>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-400 text-left">
                            <th className="p-2 border-b font-semibold">THỜI GIAN ĐẶT HÀNG</th>
                            <th className="p-2 border-b font-semibold">TÊN KHÁCHH HÀNG</th>
                            <th className="p-2 border-b font-semibold">THANH TOÁN</th>
                            <th className="p-2 border-b font-semibold">GIÁ</th>
                            <th className="p-2 border-b font-semibold">TRẠNG THÁI</th>
                            <th className="p-2 border-b font-semibold">THAO TÁC</th>
                            <th className="p-2 border-b font-semibold">XEM THÊM</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {orders.map((order, index) => {
                            const formattedDate = order.createdAt ? order.createdAt.replace('.', '') : null;
                            const dateObj = formattedDate ? new Date(formattedDate) : null;

                            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(order.totalPrice);

                            return (
                                <tr key={index} className="hover:bg-gray-50 text-left">                                   
                                    <td className="p-2 border-b">
                                        {dateObj && !isNaN(dateObj) ? format(dateObj, 'dd MMM yyyy, HH:mm') : 'Invalid Date'}
                                    </td>
                                    <td className="p-2 border-b">{order.fullName}</td>
                                    <td className="p-2 border-b">{order.paymentType}</td>
                                    <td className="p-2 border-b">{formattedPrice}</td>                                  
                                    <td className="p-2 border-b">
                                        {order.orderStatus === "PENDING" && (<span className="px-3 py-1 bg-yellow-100 text-yellow-500 rounded-2xl">PENDING</span>)}
                                        {order.orderStatus === "CONFIRMED" && (<span className="px-3 py-1 bg-orange-100 text-orange-500 rounded-2xl">CONFIRMED</span>)}
                                        {order.orderStatus === "SHIPPED" && (<span className="px-3 py-1 bg-blue-100 text-blue-500 rounded-2xl">SHIPPED</span>)}
                                        {order.orderStatus === "DELIVERED" && (<span className="px-3 py-1 bg-green-100 text-green-500 rounded-2xl">DELIVERED</span>)}
                                        {order.orderStatus === "CANCELED" && (<span className="px-3 py-1 bg-red-100 text-red-500 rounded-2xl">CANCELED</span>)}
                                    </td>
                                    <td className="p-2 border-b">
                                        <select
                                            className='p-2 bg-gray-200 rounded-lg'
                                            value={order.orderStatus}
                                            onChange={(e) => handleActionChange(order.orderCode, e.target.value)}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status.value} value={status.value}>{status.name}</option>
                                            ))}                                            
                                        </select>
                                    </td>
                                    <td className="p-2 border-b">
                                        <div className="flex justify-start items-center space-x-2"> 
                                            <button onClick={() => handleDetail(order)}  className="text-gray-300 hover:text-gray-500" title="Thông tin chi tiết">
                                                <MagnifyingGlassCircleIcon className={itemIconClass} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
            </div>

            {/* Detail, Edit, Delete, Add modal */}
            {isDetailModalOpen && (
                <DetailModal order={selectedOrder} onClose={closeDetailModal} />
            )}

            {openModal === 'status' && (
                <FilterModal
                    options={statusOptions}
                    onSelect={(option) => handleFilterSelect('status', option.name)}
                    onClose={() => setOpenModal(null)}
                    title="Status"
                    buttonRef={statusButtonRef}
                    position={modalPosition}
                />
            )}
            {openModal === 'method' && (
                <FilterModal
                    options={methodOptions}
                    onSelect={(option) => handleFilterSelect('method', option.name)}
                    onClose={() => setOpenModal(null)}
                    title="Method"
                    buttonRef={methodButtonRef}
                    position={modalPosition}
                />
            )}
        </div>
    );
}

export default OrderTable;