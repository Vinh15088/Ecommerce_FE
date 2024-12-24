import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useContext } from 'react';
import ROUTES from "../../constants/Route";
import LineContent from './LineContent';
import { AddressContext } from '../../context/AddressContext';
import OrderService from '../../service/OrderApiService';
import PaymentService from '../../service/PaymentApiService';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../common/toastUtils';
import CartService from "../../service/CartApiService";
import UserService from '../../service/UserApiService';

function Payment() {
    const navigate = useNavigate();
    const { address, setAddress, note, setNote } = useContext(AddressContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [orderLoading, setOrderLoading] = useState(false);    

    useEffect(() => {
        getCartItems();
        fetchMyProfile();
    }, []);

    const getCartItems = async () => {
        try {
            const response = await CartService.getMyCart();
            setCartItems(response.content);
            console.log("cartItems: {}", response.content);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    const fetchMyProfile = async () => {
        try {
            const response = await UserService.getMyProfile();
            const userData = response.content;
            setFullName(userData.fullName);
            setPhone(userData.phoneNumber);
            setEmail(userData.email);
        } catch(error) {
            console.log("Error fetching my profile: {}", error);
        }
    };

    const paymentMethods = [
        { id: 1, name: 'Thanh toán khi nhận hàng', icon: '../../../assets/images/cash.webp' },
        { id: 2, name: 'Thanh toán qua VNPAY', icon: '../../../assets/images/vnpay.jpg' },
        { id: 3, name: 'Thanh toán qua ZALOPAY', icon: '../../../assets/images/zalopay.png' },
    ];

    const [orderData, setOrderData] = useState({
        address: '',
        note: '',
        phone: '',
        paymentType: '',
        detailRequests: [],
    });

    
    useEffect(() => {
        setOrderData({
            address: `${address.street}, ${address.ward}, ${address.district}, ${address.city}`,
            note: note,
            phone: phone,
            paymentType: selectedMethod === 1 ? 'CASH' : selectedMethod === 2 ? 'VNPAY' : 'ZALOPAY',
            detailRequests: cartItems.cartItemResponses ? cartItems.cartItemResponses.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })) : [],
        });
    }, [address, note, phone, selectedMethod, cartItems]);


    const createOrder = async () => {
        setOrderLoading(true);
        try {
            console.log("Order data: {}", orderData);
            const response = await OrderService.createOrder(orderData);
            console.log("createOrderResponse: {}", response.content);
            const orderCodeCreate = response.content.orderCode;
            console.log("orderCodeCreate: {}", orderCodeCreate);
            showSuccessToast("Đặt đơn hàng thành công!");
            return orderCodeCreate;
        } catch (error) {
            
            console.error('Error creating order:', error);
            if(error.response.data.code === 1008) {
                navigate(ROUTES.USER_INFO);
                showErrorToast("Vui lòng cung cấp số điện thoại");
                return null;
            }
            showErrorToast("Đặt đơn hàng thất bại!");
            throw error;
        } finally {
            setOrderLoading(false);
        }
    }

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

    // const handlePaymentZaloPay = async () => {
    //     try {
    //         const response = await PaymentService.paymentOrderZaloPay(createOrderResponse.orderCode);
    //         console.log("response: {}", response);
    //     } catch (error) {
    //         console.error('Error payment ZaloPay:', error);
    //     }
    // }


    const handleCreateOrder = async () => {
        const orderCodeCreate = await createOrder();
        if(!orderCodeCreate) return;

        if(selectedMethod === 1) {
            navigate(ROUTES.USER_ORDERS_PENDING);
            setSelectedMethod(null);
            setAddress(null);
            setNote(null);
        }
        if(selectedMethod === 2) {
           showPaymentConfirmationVNPay(orderCodeCreate);
        }
    }

    const showPaymentConfirmationVNPay = (orderCodeCreate) => {
        const userConfirmed = window.confirm("Tien hanh thanh toan qua VNPAY?");
        if(userConfirmed) {
            handlePaymentVNPay(orderCodeCreate);
        } else {
            console.log("Thanh toan chua thanh cong");
        }
        setSelectedMethod(null);
        setAddress(null);
        setNote(null);
    }

            // if(selectedMethod === 3) {
        //     handlePaymentZaloPay();
        //     setSelectedMethod(null);
        //     setAddress(null);
        //     setNote(null);
        // }


    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-3 col-span-6 gap-4 pb-4 flex flex-col">
                <h2 className="text-2xl font-semibold text-center text-blue-500">Thanh toán</h2>
                <div className="mx-20">
                    <div className="flex flex-col border border-gray-300 rounded-lg p-4 gap-2">
                        <LineContent label="Số lượng sản phẩm" value={cartItems.cartSummary?.totalItems} />
                        <LineContent label="Tiền hàng" value={cartItems.cartSummary?.totalPrice.toLocaleString()}đ />
                        <LineContent label="Phí vận chuyển" value="Miễn phí" />
                            
                        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                            <span className="font-semibold">Tổng tiền</span>
                            <span className="font-semibold">{cartItems.cartSummary?.totalPrice.toLocaleString()}đ</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg text-blue-500 font-semibold mb-2">Thông tin thanh toán</h3>
                        {!selectedMethod && 
                            <div className="flex flex-row pb-2 gap-2">
                                <span className="text-red-500">Vui lòng chọn phương thức thanh toán</span>
                            </div>
                        }
                        <div 
                            onClick={() => setIsOpen(true)}
                            className="flex flex-row p-4 border border-gray-300 rounded-lg gap-2"
                        >
                            {selectedMethod ? (
                                <>
                                    <div>
                                        <img 
                                            src={paymentMethods.find(method => method.id === selectedMethod).icon} 
                                            alt={paymentMethods.find(method => method.id === selectedMethod).name} 
                                            className="w-20 h-20" 
                                        />
                                    </div>
                                    <div className="content-center">
                                        <span className="text-blue-500 font-semibold">
                                            {paymentMethods.find(method => method.id === selectedMethod).name}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <img src="../../../assets/images/credit_card.avif" alt="vnpay" className="w-20 h-20" />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <span className="text-blue-500 font-semibold">Chọn phương thức thanh toán</span>
                                        <span className="text-gray-500">Thanh toán tiện ích, nhanh chóng</span>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end items-center ml-auto">
                                <button className="flex items-center text-blue-500 hover:text-red-500">
                                    <ChevronRightIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div 
                            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <div 
                                className="bg-white rounded-lg h-4/5 w-4/12 mx-auto p-6 flex flex-col justify-between"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-md text-blue-500 font-bold">Chọn phương thức thanh toán</h2>
                                    <button onClick={() => {
                                            setIsOpen(false);
                                            setSelectedMethod(null);
                                        }} 
                                        className="text-gray-500 px-3 pb-1 rounded-full hover:text-red-500"
                                    >
                                        <span className="text-2xl font-bold mt-1">&times;</span>
                                    </button>
                                </div>
                                <div className="mt-4 flex-grow">
                                    <div className="flex flex-col gap-2">
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method.id)}
                                                className={`flex items-center p-2 border rounded-lg hover:bg-gray-200 ${
                                                    selectedMethod === method.id ? 'border-blue-500 bg-blue-100' : ''
                                                }`}
                                            >
                                                <img src={method.icon} alt={method.name} className="w-16 h-16 mr-2" />
                                                {method.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {setIsOpen(false);}}
                                    className={`mt-4 w-full py-2 rounded-lg ${
                                        selectedMethod ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={!selectedMethod}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-4">
                        <h3 className="text-lg text-blue-500 font-semibold mb-2">Thông tin nhận hàng</h3>
                        <div className="flex flex-col p-4 border border-gray-300 rounded-lg gap-2">
                            <LineContent label="Khách hàng:" value={fullName} />
                            <LineContent label="Số điện thoại:" value={phone} />
                            <LineContent label="Email:" value={email} />
                            <LineContent label="Nhận hàng tại:" value={`${address.street}, ${address.ward}, ${address.district}, ${address.city}`} />
                            <LineContent label="Ghi chú:" value={note} />
                        </div>
                    </div>

                    <div className="flex items-center flex-col justify-between mt-8 p-4 rounded-lg border border-gray-300 shadow-lg mb-4">
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <span className="text-gray-700 font-bold text-lg">Tổng tiền: </span>
                            </div>
                            <div>
                                <span className="text-blue-500 font-bold text-lg">{cartItems?.cartSummary?.totalPrice.toLocaleString()}đ</span>
                            </div>
                        </div>
                        <div className={`w-full text-center ${!selectedMethod ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'} rounded-lg mt-4`}>
                            <button onClick={() => {handleCreateOrder()}} disabled={!selectedMethod || orderLoading} className=" py-2 w-full ">{orderLoading ? <span>Đặt hàng...</span> : <span>Đặt hàng</span>}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Payment;
