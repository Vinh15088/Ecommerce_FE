import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import StatCard from "./StatCard";
import OrderService from "../../service/OrderApiService";

function Overview() {
    const [orders, setOrders] = useState([]);
    const [orderStats, setOrderStats] = useState({
        today: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        yesterday: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        thisWeek: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        thisMonth: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        thisYear: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        allTime: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
        pending: 0,
        processing: 0,
        delivered: 0,
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getAll();
            setOrders(data.content);
            console.log(data);
            console.log(orders);

            calculateStats(data.content);
            console.log(orderStats);

        } catch(error) {
            console.error("Error fetching orders: {}", error);
        }
    }

    const calculateStats = (orderData) => {
        if(!orderData || orderData.length === 0) return;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let stats = {
            today: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            yesterday: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            thisWeek: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            thisMonth: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            thisYear: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            allTime: {total: 0, cash: 0, zaloPay: 0, vnPay: 0},
            pending: 0,
            processing: 0,
            delivered: 0,
        };

        orderData.forEach((order) => {
            const createdAt = order.createdAt.replace('.', '');
            const orderDate = new Date(createdAt);
            // console.log(orderDate);
            const isToday = orderDate >= today;
            const isYesterday = orderDate >= yesterday && orderDate < today;
            const isThisWeek = orderDate >= new Date(today.setDate(today.getDate() - today.getDay()));
            const isThisMonth = orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
            const isThisYear = orderDate.getFullYear() === now.getFullYear();

            const paymentType = order.paymentType;
            if(isToday) {
                stats.today.total += order.totalPrice;
                if(paymentType === "CASH") stats.today.cash += order.totalPrice;
                if(paymentType === "ZALOPAY") stats.today.zaloPay += order.totalPrice;
                if(paymentType === "VNPAY") stats.today.vnPay += order.totalPrice;
            }
            if(isYesterday) {
                stats.yesterday.total += order.totalPrice;
                if(paymentType === "CASH") stats.yesterday.cash += order.totalPrice;
                if(paymentType === "ZALOPAY") stats.yesterday.zaloPay += order.totalPrice;
                if(paymentType === "VNPAY") stats.yesterday.vnPay += order.totalPrice;
            }
            if(isThisWeek) {
                stats.thisWeek.total += order.totalPrice;
                if(paymentType === "CASH") stats.thisWeek.cash += order.totalPrice;
                if(paymentType === "ZALOPAY") stats.thisWeek.zaloPay += order.totalPrice;
                if(paymentType === "VNPAY") stats.thisWeek.vnPay += order.totalPrice;
            }
            if(isThisMonth) {
                stats.thisMonth.total += order.totalPrice;
                if(paymentType === "CASH") stats.thisMonth.cash += order.totalPrice;
                if(paymentType === "ZALOPAY") stats.thisMonth.zaloPay += order.totalPrice;
                if(paymentType === "VNPAY") stats.thisMonth.vnPay += order.totalPrice;
            }
            if(isThisYear) {
                stats.thisYear.total += order.totalPrice;
                if(paymentType === "CASH") stats.thisYear.cash += order.totalPrice;
                if(paymentType === "ZALOPAY") stats.thisYear.zaloPay += order.totalPrice;
                if(paymentType === "VNPAY") stats.thisYear.vnPay += order.totalPrice;
            }
            stats.allTime.total += order.totalPrice;
            if(paymentType === "CASH") stats.allTime.cash += order.totalPrice;
            if(paymentType === "ZALOPAY") stats.allTime.zaloPay += order.totalPrice;
            if(paymentType === "VNPAY") stats.allTime.vnPay += order.totalPrice;
            

            const status = order.orderStatus;
            if(status === "PENDING") stats.pending++;
            if(status === "CONFIRMED" || status === "SHIPPED") stats.processing++;
            if(status === "DELIVERED") stats.delivered++;
        })
        console.log(stats);
        setOrderStats(stats);

    }

    return (
        <div className="flex flex-col">
          {/* Top Stats */}
            <div className="grid grid-cols-1  md:grid-cols-4 gap-4 mt-5">
                <DashboardCard title="Đơn hàng hôm nay" 
                    amount={`${orderStats.today.total}`} 
                    cash={`${orderStats.today.cash}`} 
                    zaloPay={`${orderStats.today.zaloPay}`} 
                    vnPay={`${orderStats.today.vnPay}`} 
                />
                <DashboardCard title="Đơn hàng hôm qua" 
                    amount={`${orderStats.yesterday.total}`} 
                    cash={`${orderStats.yesterday.cash}`} 
                    zaloPay={`${orderStats.yesterday.zaloPay}`} 
                    vnPay={`${orderStats.yesterday.vnPay}`} 
                />
                <DashboardCard title="Đơn hàng trong tuần" 
                    amount={`${orderStats.thisWeek.total}`} 
                    cash={`${orderStats.thisWeek.cash}`} 
                    zaloPay={`${orderStats.thisWeek.zaloPay}`} 
                    vnPay={`${orderStats.thisWeek.vnPay}`} 
                />
                <DashboardCard title="Đơn hàng trong tháng" 
                    amount={`${orderStats.thisMonth.total}`} 
                    cash={`${orderStats.thisMonth.cash}`} 
                    zaloPay={`${orderStats.thisMonth.zaloPay}`} 
                    vnPay={`${orderStats.thisMonth.vnPay}`} 
                />
                <DashboardCard title="Đơn hàng trong năm" 
                    amount={`${orderStats.thisYear.total}`} 
                    cash={`${orderStats.thisYear.cash}`} 
                    zaloPay={`${orderStats.thisYear.zaloPay}`} 
                    vnPay={`${orderStats.thisYear.vnPay}`} 
                />
                <DashboardCard title="Tất cả" 
                    amount={`${orderStats.allTime.total}`} 
                    cash={`${orderStats.allTime.cash}`} 
                    zaloPay={`${orderStats.allTime.zaloPay}`} 
                    vnPay={`${orderStats.allTime.vnPay}`} 
                />
            </div>
    
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <StatCard title="Tổng đơn hàng" value={orders?.length} icon="🛒" bgColor="bg-white" textColor="text-gray-600" bgColorIcon="bg-yellow-200"/>
                <StatCard title="Đơn hàng đang chờ phê duyệt" value={`${orderStats.pending}`} icon="🔄" bgColor="bg-white" textColor="text-gray-600" bgColorIcon="bg-blue-200"/>
                <StatCard title="Đơn hàng đang được giao" value={`${orderStats.processing}`} icon="🚚" bgColor="bg-white" textColor="text-gray-600" bgColorIcon="bg-blue-200"/>
                <StatCard title="Đơn hàng đã được giao" value={`${orderStats.delivered}`} icon="✅" bgColor="bg-white" textColor="text-gray-600" bgColorIcon="bg-green-200"/>
            </div>

        </div>
      );
};

export default Overview;