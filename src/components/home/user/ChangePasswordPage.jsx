import Footer from "../../common/footer/Footer";
import Navbar from "../../common/navbar/Navbar";
import ChangePassword from "../../user/ChangePassword";

function ChangePasswordPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <ChangePassword />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ChangePasswordPage;