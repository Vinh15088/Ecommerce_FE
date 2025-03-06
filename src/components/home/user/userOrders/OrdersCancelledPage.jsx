import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import OrdersCancelled from "../../../user/userOrders/OrdersCancelled";

function OrdersCancelledPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <OrdersCancelled />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersCancelledPage;
