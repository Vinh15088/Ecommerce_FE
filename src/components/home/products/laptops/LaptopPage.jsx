import Navbar from '../../../common/navbar/Navbar';
import Footer from '../../../common/footer/Footer';    
import { useLocation } from 'react-router-dom';
import LaptopList from './LaptopList';

function LaptopPage() {
    const location = useLocation();
    const brandName = location.state?.brandName || '';

    return (
        <div>
            <Navbar />

            <LaptopList brandName={brandName}/>

            <Footer />
        </div>
    );
};

export default LaptopPage;