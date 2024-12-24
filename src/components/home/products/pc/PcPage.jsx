import { useLocation } from "react-router-dom";
import Navbar from "../../../common/navbar/Navbar";
import PcList from "./PcList";
import Footer from "../../../common/footer/Footer";


function PcPage() {
    const location = useLocation();
    const brandName = location.state?.brandName || '';

    return (
        <div>
            <Navbar />

            <PcList brandName={brandName} />

            <Footer />
        </div>
    );
};

export default PcPage;