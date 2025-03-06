import ProductImage from "./ProductImage";

function ModalDetails({ orderDetail, closeModal }) {
    const getOrderStatus = (status) => {
        console.log("Current order status:", status);
        switch (status) {
            case 'PENDING':
                return 'CHỜ XÁC NHẬN';
            case 'CONFIRMED':
                return 'ĐÃ XÁC NHẬN';
            case 'SHIPPED':
                return 'ĐANG GIAO HÀNG';
            case 'DELIVERED':
                return 'HOÀN THÀNH';
            case 'CANCELED':
                return 'ĐÃ HỦY'; 
            default:
                return '';
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
                    onClick={closeModal}
            >
                <div className="flex flex-col bg-white p-4 rounded-lg h-auto w-2/3 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg text-blue-500 font-semibold mb-2">Chi tiết đơn hàng</h2>
                    <div>
                        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
                            <div className="flex flex-row">
                                <div className="text-gray-600 text-sm">Mã đơn hàng:</div>
                                <div className="text-gray-500 font-semibold text-sm pl-1">{orderDetail.orderCode}</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 text-sm">Trạng thái:</div>
                                <div className={`text-blue-500 font-semibold text-sm pl-1`}>
                                    {getOrderStatus(orderDetail.orderStatus)}
                                </div>
                            </div>
                        </div>
                        <div className="px-4">
                            <h3 className="text-gray-600 font-semibold text-lg mb-2">Địa chỉ nhận hàng</h3>
                            <div className="mb-4 border-b border-gray-300 pb-2">
                                <div className="flex flex-row justify-between mb-1">
                                    <div className="text-gray-600 text-sm">Tên khách hàng:</div>
                                    <div className="text-gray-500 font-semibold text-sm pl-1">{orderDetail.fullName}</div>
                                </div>  
                                <div className="flex flex-row justify-between mb-1">
                                    <div className="text-gray-600 text-sm">Địa chỉ:</div>
                                    <div className="text-gray-500 font-semibold text-sm pl-1">{orderDetail.address}</div>
                                </div>
                                <div className="flex flex-row justify-between mb-1">
                                    <div className="text-gray-600 text-sm">Số điện thoại:</div>
                                    <div className="text-gray-500 font-semibold text-sm pl-1">{orderDetail.phone}</div>
                                </div>
                                <div className="flex flex-row justify-between mb-1">
                                    <div className="text-gray-600 text-sm">Ghi chú:</div>
                                    <div className="text-gray-500 font-semibold text-sm pl-1">{orderDetail.note}</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="overflow-y-auto max-h-48">
                                    {orderDetail.orderDetailResponses.map((detail, index) => (
                                        <div className="flex flex-row justify-between cursor-pointer border-b border-gray-300 pb-2" key={index} >
                                            <div className="flex flex-row"> 
                                                <ProductImage productName={detail.product} />
                                                <div className="ml-4 flex-1">
                                                    <div className="font-semibold text-md">{detail.product}</div>
                                                    <div className="text-sm">x{detail.quantity}</div>
                                                </div>                                              
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-600 text-sm">{detail.unitPrice.toLocaleString()}₫</div>                                       
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between border-b border-dotted border-gray-300 py-1">
                                    <div className="text-gray-600 text-sm">Tổng tiền hàng</div>
                                    <div className="text-gray-500 font-semibold text-sm">{orderDetail.totalPrice.toLocaleString()}₫</div>
                                </div>  
                                <div className="flex justify-between border-b border-dotted border-gray-300 py-1">
                                    <div className="text-gray-600 text-sm">Phí vận chuyển</div>
                                    <div className="text-gray-500 font-semibold text-sm">0₫</div>
                                </div>  
                                <div className="flex justify-between border-b border-gray-300 py-1">
                                    <div className="text-gray-600 text-sm">Thành tiền</div>
                                    <div className="text-red-500 font-semibold text-sm">{orderDetail.totalPrice.toLocaleString()}₫</div>
                                </div> 
                                <div className="flex justify-between py-2">
                                    <div className="text-gray-600 text-sm">Phương thức thanh toán</div>
                                    <div className="text-gray-500 font-semibold text-sm">
                                        {`${orderDetail.paymentType}` === 'CASH' ? 'Thanh toán khi nhận hàng' : `${orderDetail.paymentType}` === 'ZALOPAY' ? 'Thanh toán qua ZaloPay' : 'Thanh toán qua VNPAY'}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <button 
                        className="mt-2 mb-4 mr-4 px-8 py-2 bg-blue-500 text-white rounded ml-auto"
                        onClick={closeModal}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </>
    );
}

export default ModalDetails;

