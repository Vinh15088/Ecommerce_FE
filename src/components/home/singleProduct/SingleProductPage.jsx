import Navbar from '../../common/navbar/Navbar';
import Footer from '../../common/footer/Footer';
import ProductDetails from './ProductDetails';
import { useLocation } from 'react-router-dom';

    
function SingleProductPage() {
    const location = useLocation();
    const product = location.state?.product || {};

    return (
        <div>
            <Navbar />
            <ProductDetails product={product} />
            <Footer />
        </div>
    );
};

export default SingleProductPage;
