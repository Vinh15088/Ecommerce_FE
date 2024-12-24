import Footer from "../../../common/footer/Footer";
import Navbar from "../../../common/navbar/Navbar";
import OrdersPending from "../../../user/userOrders/OrdersPending";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
function OrdersPendingPage() {
    const [searchParams] = useSearchParams();
    const responseCode = searchParams.get('vnp_ResponseCode');

    useEffect(() => {
        if (responseCode !== null) {
            if (responseCode === "00") {
                toast.success("Thanh toán qua VNPAY thành công");
            } else {
                toast.error("Thanh toán qua VNPAY thất bại");
            }
        }
    }, [responseCode]);

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <OrdersPending />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default OrdersPendingPage;
