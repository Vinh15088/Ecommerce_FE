import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import Payment from "../../cart/Payment";

function PaymentPage() {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Payment />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PaymentPage;
