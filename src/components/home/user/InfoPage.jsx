import Footer from "../../common/footer/Footer";
import Navbar from "../../common/navbar/Navbar";
import Info from "../../user/Info";

function InfoPage() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Info />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default InfoPage;