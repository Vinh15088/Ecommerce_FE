import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import PaymentInfo from "../../cart/PaymentInfo";

function PaymentInfoPage() {
    
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <PaymentInfo />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PaymentInfoPage;