import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import OrdersShipping from "../../../user/userOrders/OrdersShipping";

function OrdersShippingPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <OrdersShipping />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersShippingPage;
