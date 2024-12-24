import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import Cart from "../../cart/Cart";

function CartPage() {

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Cart />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CartPage;
