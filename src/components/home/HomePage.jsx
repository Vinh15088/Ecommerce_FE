import '../../output.css';
import Navbar from '../common/navbar/Navbar';
import Footer from '../common/footer/Footer';
import Overview from './overview/Overview';
import AllProducts from '../common/allProducts/AllProducts';

function HomePage() {

    return (
        <div>
            <Navbar />
            <Overview />
            <AllProducts/>
            <Footer />
        </div>
    );
};

export default HomePage;