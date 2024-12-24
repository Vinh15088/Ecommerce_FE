import Navbar from '../../../common/navbar/Navbar';
import Footer from '../../../common/footer/Footer';    
import { useLocation } from 'react-router-dom';
import IpadList from './IpadList';

function IpadPage() {
    const location = useLocation();
    const brandName = location.state?.brandName || '';

    return (
        <div>
            <Navbar />

            <IpadList brandName={brandName}/>

            <Footer />
        </div>
    );
};

export default IpadPage;