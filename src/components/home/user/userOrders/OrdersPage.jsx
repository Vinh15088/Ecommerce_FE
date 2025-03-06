import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import Orders from "../../../user/userOrders/Orders";

function OrdersPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Orders />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersPage;
