import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CartService from "../../service/CartApiService";

const ProductInfo = ({image, name, price, oldPrice, quantity}) => {
    return (
        <>
            <div className="flex flex-row justify-between p-4 border-t border-gray-300">
                <div className="flex flex-row items-center">
                <div className="">
                    <img src={image} alt="iPad" className="w-20 h-20 object-cover mr-4" />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold pb-2">{name}</h3>
                    <div className="flex flex-row justify-start">
                        <span className="text-blue-500 font-bold">{price.toLocaleString()}đ</span>
                        <span className="text-gray-500 line-through ml-2">{oldPrice.toLocaleString()}đ</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <span>Số lượng: <span className="text-blue-500 font-bold">{quantity}</span></span>
                </div>
            </div>
        </>
    )
}

const ProductCart = ({cartId, image, name, price, oldPrice, quantity, productId, refreshCart, getCartItems, selectedItems, setSelectedItems}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    
    const handleDelete = async (productId) => {
        try {
            const response = await CartService.deleteProductFromCart(productId);
            console.log("response: {}", response);
            getCartItems();
            refreshCart();
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    }

    const handleChangeQuantity = async (productId, change) => {
        try {
            const cartData = {
                quantity: change,
                productId: productId
            }
            const response = await CartService.changeQuantity(cartId, cartData);
            console.log("response: {}", response);
            setCurrentQuantity(prevQuantity => prevQuantity + change);
        } catch (error) {
            console.error('Error changing quantity:', error);
        }
    }

    const incrementQuantity = () => {
        handleChangeQuantity(productId, 1);
    }

    const decrementQuantity = () => {
        if (currentQuantity > 0) {
            handleChangeQuantity(productId, -1);
        }
    }

    const handleSelect = (e) => {
        const newSelectedItems = new Set(selectedItems);
        if(e.target.checked) {
            newSelectedItems.add(productId);
        } else {
            newSelectedItems.delete(productId);
        }
        setSelectedItems(newSelectedItems);
    }
    return (
        <>
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-300 shadow-lg mb-4">
                <div className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={selectedItems.has(productId)} onChange={handleSelect} />
                    <img src={image} alt="iPad" className="w-20 h-20 object-cover mr-4" />
                    <div>
                        <h3 className="font-semibold pb-2">{name}</h3>
                        <span className="text-blue-500 font-bold">{price.toLocaleString()}đ</span>
                        <span className="text-gray-500 line-through ml-2">{oldPrice.toLocaleString()}đ</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="h-8 w-8 border border-gray-300 rounded-lg hover:bg-blue-100 hover:text-blue-500">
                        <button className="h-full w-full" onClick={decrementQuantity}>–</button>
                    </div>
                        <span className="px-4">{currentQuantity}</span>
                    <div className="h-8 w-8 border border-gray-300 rounded-lg hover:bg-blue-100 hover:text-blue-500">
                        <button className="h-full w-full" onClick={incrementQuantity}>+</button>
                    </div>
                    <button className="ml-4 text-gray-500 hover:text-red-500">
                        <TrashIcon onClick={() => handleDelete(productId)} className="w-5 h-5 text-gray-700 hover:text-red-500" />
                    </button>
                </div>
            </div>
        </>
    )
}

export {ProductInfo, ProductCart};
