import { useEffect, useState } from "react";
import ProductApiService from "../../../service/ProductApiService";

function ProductImage({ productName }) {
    const [image, setImage] = useState(null);

    const fetchProduct = async (productName) => {
        try {
            const response = await ProductApiService.getProductByName(productName);
            return response.content;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchImage = async () => {
            const product = await fetchProduct(productName);
            if (product && product.images && product.images.length > 0) {
                setImage(product.images[0]);
            }
        };
        fetchImage();
    }, [productName]);

    return (
        <img src={image} alt={productName} className="border border-gray-300 w-20 h-20 rounded-lg object-cover" />
    );
}

export default ProductImage;