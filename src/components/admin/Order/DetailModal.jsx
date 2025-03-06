function DetailModal({ order, onClose }) {

    return (
        <div
            className="fixed bg-gray-400 inset-0 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col fixed top-0 right-0 2xl:w-4/5 xl:w-4/5 lg:w-4/5 bg-white h-full shadow-lg rounded-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-8 flex justify-between items-center rounded-t-lg border-b border-gray-300">
                    <h2 className="text-2xl font-semibold">Invoice</h2>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-gray-400 font-bold text-2xl rounded-full w-10 h-10 hover:bg-red-300 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="bg-gray-200 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">HÓA ĐƠN</h3>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Trạng thái:</strong> {order.orderStatus}</p>
                            <p><strong>Mã đơn hàng:</strong> {order.orderCode}</p>
                            <p><strong>Đặt hàng:</strong> {order.createdAt ? new Date(order.createdAt.replace('.', '')).toLocaleString() : 'N/A'}</p>
                            <p><strong>Tên khách hàng:</strong> {order.fullName}</p>
                            <p><strong>Địa chỉ:</strong> {order.address}</p>
                            <p><strong>Số điện thoại:</strong> {order.phone}</p>
                            <p><strong>Ghi chú của khách hàng:</strong> {order.note}</p>
                        </div>
                    </div>

                    <div className="border-gray-300  shadow-md rounded-lg border">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-gray-200 text-gray-400 ">
                                    <th className="p-2 text-left">STT</th>
                                    <th className="p-2 text-left">TÊN SẢN PHẨM</th>
                                    <th className="p-2 text-left">SỐ LƯỢNG</th>
                                    <th className="p-2 text-left">GIÁ</th>
                                    <th className="p-2 text-left">TỔNG TIỀN</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-800">
                                {order.orderDetailResponses.map((detail, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border-b">{1 + index}</td>
                                            <td className="p-2 border-b">{detail.product}</td>
                                            <td className="p-2 border-b ml-5">{detail.quantity}</td>
                                            <td className="p-2 border-b">{detail.unitPrice.toLocaleString()} VND</td>
                                            <td className="p-2 border-b">{detail.totalPrice.toLocaleString()} VND</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 space-y-4 p-6 border-gray-300  shadow-md rounded-lg border">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Phương thức thanh toán:</span>
                            <span className="font-semibold text-gray-800">{order.paymentType}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Chi phí giao hàng:</span>
                            <span className="font-semibold text-gray-800">0 VND</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Giảm giá:</span>
                            <span className="font-semibold text-gray-800">0 VND</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Giá tổng sản phẩm:</span>
                            <span className="font-semibold text-gray-800">{order.totalPrice.toLocaleString()} VND</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-4 border-gray-300">
                            <span className="text-gray-800 font-semibold">Số tiền thanh toán:</span>
                            <span className="text-lg font-bold text-red-600">
                                {order.totalPrice.toLocaleString()} VND
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModal;
