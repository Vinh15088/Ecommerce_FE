import Navbar from "../../../common/navbar/Navbar";
import Footer from '../../../common/footer/Footer';
import MacbookList from './MacbookList';

function MacbookPage() {
    return (
        <div>
            <Navbar />
            <MacbookList />
            <Footer />  
        </div>
    );
};

export default MacbookPage;