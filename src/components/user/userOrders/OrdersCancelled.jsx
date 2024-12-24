import UserSideCommon from "../UserSideCommon";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/Route";
import { useState, useEffect } from "react";
import UserApiService from "../../../service/UserApiService";
import ListMyOrders from "./ListMyOrders";
import ModalDetails from "./ModalDetails";

function OrdersCancelled() {
    const navigate = useNavigate();
    const [myOrders, setMyOrders] = useState([]);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

    const fetchMyOrders = async () => {
        try {
            const response = await UserApiService.getMyOrders();
            const filteredOrders = response.content.filter(order => order.orderStatus === 'CANCELED');
            setMyOrders(filteredOrders);
            console.log("Filtered Orders: {}", filteredOrders);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleDetailClick = (detail) => {
        setSelectedOrderDetail(detail);
    };

    const closeModal = () => {
        setSelectedOrderDetail(null);
    };

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-2 col-span-8 grid grid-cols-4 gap-4 pb-10">
                <UserSideCommon />
                <div className="col-span-3 flex flex-col justify-start pr-8">
                    <div className="grid grid-cols-6 border border-gray-300 rounded-t-lg pt-2 mb-4">
                        <button onClick={() => navigate(ROUTES.USER_ORDERS)} className="text-gray-600 font-semibold pb-2 border-b-2">Tất cả</button>
                        <button onClick={() => navigate(ROUTES.USER_ORDERS_PENDING)} className="text-gray-600 font-semibold pb-2 border-b-2">Chờ xác nhận</button>
                        <button onClick={() => navigate(ROUTES.USER_ORDERS_CONFIRMED)} className="text-gray-600 font-semibold pb-2 border-b-2">Đã xác nhận</button>
                        <button onClick={() => navigate(ROUTES.USER_ORDERS_SHIPPING)} className="text-gray-600 font-semibold pb-2 border-b-2">Đang giao</button>
                        <button onClick={() => navigate(ROUTES.USER_ORDERS_DELIVERED)} className="text-gray-600 font-semibold pb-2 border-b-2">Đã giao</button>
                        <button onClick={() => navigate(ROUTES.USER_ORDERS_CANCELLED)} className="text-blue-500 font-semibold pb-2 border-b-2 border-blue-500">Đã hủy</button>
                    </div>
                    <div className="">
                        <ListMyOrders myOrders={myOrders} handleDetailClick={handleDetailClick} />
                    </div>
                </div>
            </div>   
            {selectedOrderDetail && (
                <ModalDetails orderDetail={selectedOrderDetail} closeModal={closeModal} />
            )}
        </div>
    )
}

export default OrdersCancelled;