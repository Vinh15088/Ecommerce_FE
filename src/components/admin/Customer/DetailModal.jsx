import { useEffect, useState } from 'react';
import OrderService from '../../../service/OrderApiService'

function DetailModal({ user, onClose }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getOrderByUserId(user.id);
            setOrders(data.content);

            console.log(data);
        } catch(error) {
            console.log("Error fetching orders by userId: {}", error);
        }
    }

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
                    <h2 className="text-2xl font-semibold">Thông tin chi tiết người dùng</h2>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-gray-400 font-bold text-2xl rounded-full w-10 h-10 hover:bg-red-300 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Account Section */}
                    <div className="bg-gray-200 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">Tài khoản người dùng</h3>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Tên đăng nhập:</strong> {user.username}</p>
                            <p><strong>Họ và tên:</strong> {user.fullName}</p>
                            <p><strong>Ngày sinh:</strong> {user.dob}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Orders Table Section */}
                    <div className="border-gray-300  shadow-md rounded-lg border">
                        {orders.length === 0 ? (
                            <div className='p-6 text-center text-black'>
                                <p className='text-lg'>Không có đơn hàng nào của người dùng này</p>
                            </div>
                        ) : (
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-400 ">
                                        <th className="p-2 text-left">ID</th>
                                        <th className="p-2 text-left">Mã đơn hàng</th>
                                        <th className="p-2 text-left">Trạng thái</th>
                                        <th className="p-2 text-left">Thanh toán</th>
                                        <th className="p-2 text-left">Thời gian</th>
                                        <th className="p-2 text-left">Giá</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-800">
                                    {orders.map((order, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border-b">{order.id}</td>
                                            <td className="p-2 border-b">{order.orderCode}</td>
                                            <td className="p-2 border-b">{order.orderStatus}</td>
                                            <td className="p-2 border-b">{order.paymentType}</td>
                                            <td className="p-2 border-b">{order.createdAt ? new Date(order.createdAt.replace('.', '')).toLocaleString() : 'N/A'}</td>
                                            <td className="p-2 border-b">{order.totalPrice.toLocaleString()} VND</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModal;
