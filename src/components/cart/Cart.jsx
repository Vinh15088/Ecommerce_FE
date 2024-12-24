import ROUTES from "../../constants/Route";
import Submit from "./Submit";
import { ProductCart } from "./ProductInfo";
import CartService from "../../service/CartApiService";
import { useState, useEffect, useContext } from "react";
import { NavbarContext } from '../../context/NavbarContext';

function Cart() {
    const { refreshCart } = useContext(NavbarContext);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());

    useEffect(() => {
        getCartItems();
    }, []);

    const getCartItems = async () => {
        try {
            const response = await CartService.getMyCart();
            setCartItems(response.content);
            console.log("cartItems: {}", response.content);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    const handleSelectAll = (e) => {
        if(e.target.checked) {
            setSelectedItems(new Set(cartItems.cartItemResponses.map(item => item.productId)));
        } else {
            setSelectedItems(new Set());
        }
    }

    const handleDeleteSelected = async () => {
        try {
            for(const productId of selectedItems) {
                await CartService.deleteProductFromCart(productId);
            }
            getCartItems();
            refreshCart();
        } catch (error) {
            console.error('Error deleting selected products:', error);
        }
    }

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-3 col-span-6 gap-4 pb-4 flex flex-col">
                <h2 className="text-2xl font-semibold text-center text-blue-500">Giỏ hàng của bạn</h2>
                <div className="flex items-center justify-between mx-20">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" onChange={handleSelectAll} />
                        <span>Chọn tất cả</span>
                    </div>
                    <button className="text-blue-500 hover:text-red-500" onClick={handleDeleteSelected}>Xóa sản phẩm đã chọn</button>
                </div>

                <div className="mx-20 ">
                    {cartItems.cartItemResponses && cartItems.cartItemResponses.map((item) => (
                        <ProductCart 
                            key={item.productId}
                            cartId={cartItems.id}
                            image={item.images[0]}
                            name={item.name}
                            price={item.unitPrice}
                            oldPrice={item.unitCost}
                            quantity={item.quantity}
                            productId={item.productId}
                            refreshCart={refreshCart}
                            getCartItems={getCartItems}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                        />
                    ))}

                    <Submit totalPrice={cartItems?.cartSummary?.totalPrice.toLocaleString()} toRoute={ROUTES.PAYMENT_INFO} titleSubmit="Mua ngay" />
                </div>
            </div>
        </div>
    )
}

export default Cart;

