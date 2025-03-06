import { CheckIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/16/solid';
import CartService from "../../../service/CartApiService";

const Product = ({product, refreshCart}) => {
    const itemIconClass = "w-4 h-4 lg:w-5 lg:h-5";
    const descriptionParts = product.shortDescription.split('/').slice(0, 3);

    const cartItemRequest = {
        productId: product.id,
        quantity: 1
    };

    const handleAddToCart = async (event) => {
        event.stopPropagation();
        try {
            const response = await CartService.addToCart(cartItemRequest);
            console.log("Add to cart response: ", response.content);
            refreshCart();
        } catch (error) {
            console.error("Error adding to cart: ", error);
        }
    }

    return (
        <div className="border-2 border-gray-300 rounded-lg p-2 shadow-lg flex flex-col justify-between"
            style={{width: 'auto', height: 'auto'}}
        >
            <img src={product.images[0]} alt={product.name} className="w-48 h-48 2xl:w-64 2xl:h-64 xl:w-56 xl:h-56 lg:w-48 lg:h-48 md:w-40 md:h-40 sm:w-32 sm:h-32 object-cover"/>
            <h5 className="text-md font-semibold mb-2 text-center h-10">LAPTOP {product.brand} {product.name}</h5>
            <p className="text-gray-500 text-sm font-semibold mt-1 h-8">
                {descriptionParts.map((part, index) => (
                    part + ' / '
                ))}
            </p>
            <div className="flex justify-center items-center my-1 py-1">
                <span className="text-blue-500 font-bold text-md">{product.price.toLocaleString()}đ</span>
                <span className="mx-1"></span>
                <span className="text-gray-500 line-through text-sm">{product.cost.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-items-center items-center">
                <span className="text-red-500 text-sm">Giảm {product.discount}%</span>
            </div>
            <div className="flex justify-between items-center pb-2">
                <span className={`text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {product.stock > 0 ? 
                        <div className="flex justify-items-center items-center">
                            <CheckIcon className={itemIconClass} /> 
                            <span>Còn hàng</span>
                        </div>
                    :
                        <div className="flex justify-items-center items-center">
                            <XMarkIcon className={itemIconClass} />
                            <span>Hết hàng</span>
                        </div>
                    }
                </span>
                <div className="p-2 bg-blue-600 rounded-full" onClick={handleAddToCart}>
                    <ShoppingBagIcon className={`${itemIconClass} text-white`} />
                </div>
            </div>
        </div>
    )
};

export default Product;
