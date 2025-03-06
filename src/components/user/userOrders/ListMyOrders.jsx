import ProductImage from "./ProductImage";
import PaymentService from "../../../service/PaymentApiService";

function ListMyOrders({ myOrders, handleDetailClick }) {
    const getOrderStatus = (status) => {
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

    const handlePaymentVNPay = async (orderCode) => {
        try {
            console.log("orderCode: {}", orderCode);
            const response = await PaymentService.paymentOrderVNPay(orderCode);
            console.log("response: {}", response);
            window.location.href = response.content.paymentUrl;
        } catch (error) {
            console.error('Error payment VNPay:', error);
        }
    }

    const handlePaymentZaloPay = async (orderCode) => {
        try {
            console.log("orderCode: {}", orderCode);
            const response = await PaymentService.paymentOrderZaloPay(orderCode);
            console.log("response: {}", response);
            window.location.href = response.content.order_url;
        } catch (error) {
            console.error('Error payment ZaloPay:', error);
        }
    }

    const handlePayment = (order) => {
        if (order.paymentType === 'VNPAY') {
            handlePaymentVNPay(order.orderCode);
        } else if (order.paymentType === 'ZALOPAY') {
            handlePaymentZaloPay(order.orderCode);
        } else {
            console.error('Unsupported payment type:', order.paymentType);
        }
    }

    const getPaymentType = (type) => {
        switch (type) {
            case 'ZALOPAY':
                return 'Thanh toán qua Zalo Pay';
            case 'VNPAY':
                return 'Thanh toán qua VN pay';
            case 'CASH':
                return 'Thanh toán khi nhận hàng';
            default:
                return '';
        }
    }
    return (
        <>
            {myOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <img src={'../../assets/images/noneOrder.png'} alt="empty-cart" className="h-28 w-28 mx-auto mb-4" />
                    <h2 className="text-sm font-semibold text-blue-500 text-center mb-4">Không có đơn hàng nào</h2>
                    <button className="w-36 px-4 py-2 text-sm text-nowrap bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-auto">Tiếp tục mua sắm</button>
                </div>
                ) : (
                myOrders.map((order, index) => (
                    <div className="border border-gray-300 rounded-lg p-4 mb-4" key={index}>
                        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
                            <div className="flex flex-row">
                                <div className="text-gray-600 text-sm">Mã đơn hàng:</div>
                                <div className="text-blue-500 font-semibold text-sm pl-1">{order.orderCode}</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 text-sm">Trạng thái:</div>
                                <div className={`text-blue-500 font-semibold text-sm pl-1`}>
                                    {getOrderStatus(order.orderStatus)}
                                </div>
                            </div>
                        </div>
                        <div onClick={() => handleDetailClick(order)}>   
                            {order.orderDetailResponses.map((detail, index) => (
                                <div className="flex mt-2 cursor-pointer" key={index} >
                                    <ProductImage productName={detail.product} />
                                    <div className="ml-4 flex-1">
                                        <div className="font-semibold text-md">{detail.product}</div>
                                        <div className="text-sm">x{detail.quantity}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-600">{detail.unitPrice.toLocaleString()}₫</div>                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between border-t border-gray-300 mt-2 pt-2">
                            <div className="text-gray-600">Tổng tiền</div>
                            <div className="text-red-500 font-semibold">{order.totalPrice.toLocaleString()}₫</div>
                        </div>
                        {order.orderStatus === 'PENDING' && (
                            <>
                                <div className="flex justify-between mt-2">
                                    <div className="text-gray-600">Hình thức thanh toán:</div>
                                    <div className="text-blue-500 font-semibold">{getPaymentType(order.paymentType)}</div>
                                </div>
                                {(order.paymentType === 'VNPAY' || order.paymentType === 'ZALOPAY') && (
                                    <>
                                        <div className="flex justify-between mt-2">
                                            <div className="text-gray-600">Trạng thái thanh toán:</div>
                                            <div className="text-gray-600">{(order.paymentStatus === true) ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                        </div>
                                    </>
                                )}
                                    {/* Nút thanh toán nếu là ZALOPAY hoặc VNPAY */}
                                <div className="flex justify-end" >
                                    {(order.paymentStatus === false) && (order.paymentType === 'ZALOPAY' || order.paymentType === 'VNPAY') && (
                                        <button onClick={() => handlePayment(order)} className="mt-2 w-36 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md">
                                            Thanh toán ngay
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}
        </>
    )
}

export default ListMyOrders;
