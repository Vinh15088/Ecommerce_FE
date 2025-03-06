import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import OrdersConfirmed from "../../../user/userOrders/OrdersConfirmed";

function OrdersConfirmedPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <OrdersConfirmed />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersConfirmedPage;
