import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import OrdersDelivered from "../../../user/userOrders/OrdersDelivered";

function OrdersDeliveredPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <OrdersDelivered />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersDeliveredPage;
