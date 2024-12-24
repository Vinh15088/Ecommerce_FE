import { ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useContext } from "react";
import Product from "../../common/allProducts/Product";
import ROUTES  from "../../../constants/Route";
import { useNavigate } from "react-router-dom";
import ProductApiService from "../../../service/ProductApiService";
import CategoryService from "../../../service/CategoryApiService";
import BrandService from "../../../service/BrandApiService";
import ReviewService from "../../../service/ReviewApiService";
import Review from "./Review";
import CartService from "../../../service/CartApiService";
import { NavbarContext } from '../../../context/NavbarContext';

function ProductDetails({ product }) {
    const { refreshCart } = useContext(NavbarContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const cartItemRequest = {
        productId: product.id,
        quantity: quantity
    };

    const handleAddToCart = async () => {
        try {
            const response = await CartService.addToCart(cartItemRequest);
            console.log("Add to cart response: ", response.content);
            refreshCart();
        } catch (error) {
            console.error("Error adding to cart: ", error);
        }
    }

    let averageRating = () => {
        return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    }

    useEffect(() => {
        fetchRelatedProducts();
    }, [product]);

    const fetchRelatedProducts = async () => {
        let categoryId = null;
        let brandId = null;
        try {
            const category = await CategoryService.getCategoryByName(product.category);
            const brand = await BrandService.getBrandByName(product.brand);
            categoryId = category.content.id;
            brandId = brand.content.id;
        } catch (error) {
            console.error("Error fetching related products: ", error);
        }
        try {
            const data = await ProductApiService.getAllProductByCategoryAndBrand(categoryId, brandId, null, null);
            setRelatedProducts(data.content);
            console.log("Related products: ", data);
        } catch (error) {
            console.error("Error fetching related products: ", error);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [product]);

    const fetchReviews = async () => {
        try {
            const data = await ReviewService.getReviewByProduct(product.id, '', '', '');

            setReviews(data.content);
            console.log("Reviews: ", reviews);
        } catch(error) {
            console.error("Error fetching review: ", error);
        }
    }
    
    const [currentImage, setCurrentImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleThumbnailClick = (index) => {
        setCurrentImage(index);
    };

    const handlePrevClick = () => {
        setCurrentImage((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };
    
    const handleNextClick = () => {
        setCurrentImage((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleProductClick = (productId) => {
        navigate(ROUTES.PAGE_SINGLE_PRODUCT.replace(':id', productId), { state: { product: relatedProducts.find(product => product.id === productId) } });
    };

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 pb-20 2xl:mb-50 3xl:mb-70">
            <div className="col-start-2 col-span-8 bg-slate-100 rounded-lg lg:pb-10 xl:pb-10 2xl:pb-32 3xl:pb-40 container mx-auto p-4 grid grid-cols-12 gap-6">
                {/* Left Section: Product Images */}
                <div className="col-span-7 grid grid-cols-8 pr-4 flex-col"
                    style={{height: '400px'}}
                >
                    <div className="col-span-2 space-y-4 h-auto overflow-y-auto scrollbar-custom pr-1">
                        <div className="flex flex-col space-y-2">
                            {product.images.map((thumb, index) => (
                            <img
                                key={index}
                                src={thumb}
                                alt={`Thumbnail ${index}`}
                                className={`w-auto h-auto rounded-lg object-cover border cursor-pointer 
                                    ${index === currentImage ? 'border-blue-500' : 'hover:border-blue-500 '}`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                            ))}
                        </div>
                    </div>
                    <div className="col-span-6 h-auto mr-4 relative flex flex-col">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg border cursor-pointer"
                            onClick={toggleModal}
                        />
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2  rounded-full border shadow"
                            onClick={handlePrevClick}
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full border shadow"
                            onClick={handleNextClick}
                        >
                            <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                        </button>                       
                    </div>
                    <div className="col-start-3 col-span-6 h-auto mr-4 mt-4 p-4 bg-white rounded-lg border flex justify-center gap-4">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="hover:border-blue-500">
                                <img src={product.images[0]} alt={product.name} onClick={toggleModal} className="w-11 h11 object-cover rounded-lg border cursor-pointer"/>
                            </div>
                            <span className="text-sm text-gray-500 text-center ">Hình ảnh sản phẩm</span>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <button className="bg-white rounded-lg p-2 border hover:border-blue-500"
                                style={{height: 44, width: 44}}
                            >
                                <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                            </button>
                            <span className="text-sm text-gray-500 text-center">Thông số kỹ thuật</span>
                        </div>
                    </div>
                    <div className="col-start-1 col-span-8 grid grid-cols-2 p-4 mr-4 mt-4 bg-white rounded-lg">
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold text-blue-500">Ưu đãi thêm</h3>
                            <ul className="text-sm text-gray-500">
                                <li>Tặng kèm đầy đủ phụ kiện</li>
                                <li>Hỗ trợ phần mềm trọn đời</li>
                                <li>Miễn phí cài đặt win + vệ sinh máy</li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold text-blue-500">Chính sách bảo hành</h3>
                            <ul className="text-sm text-gray-500">
                                <li>Bảo hành 24 tháng</li>
                                <li>Dùng thử trong vòng 14 ngày lỗi 1 đổi 1</li>
                                <li>Miễn phí giao hàng toàn quốc</li>
                            </ul>
                        </div>
                    </div>
                </div>              

                {/* Right Section: Product Details */}
                <div className="col-span-5">
                    <h1 className="text-2xl text-blue-500 font-bold">LAPTOP {product.brand} {product.name}</h1>
                    <h2 className="text-xl text-blue-500 font-semibold mt-2">{product.shortDescription}</h2>
                    <p className="text-sm text-gray-500 flex justify-start mt-2">
                        <strong>Mã SP:</strong><span className="text-blue-500 ml-1 font-bold">{product.sku} |</span>
                        <strong className="mx-1">Đánh giá: </strong>
                        <span className="flex items-center">
                            {[...Array(5)].map((_, index) => {
                            const fillPercentage = Math.min(Math.max(averageRating() - index, 0), 1) * 100;
                            return (
                                <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-4"
                                >
                                <defs>
                                    <linearGradient id={`grad-${index}`}>
                                        <stop offset={`${fillPercentage}%`} stopColor="gold" />
                                        <stop offset={`${fillPercentage}%`} stopColor="gray" />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill={`url(#grad-${index})`}
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                />
                                </svg>
                            );
                            })}
                            <span className="ml-2 font-bold text-blue-500">3.6</span>
                        </span>
                    </p>
                    <div className="mt-4 bg-gray-200 p-4 rounded-lg border">
                        <h2 className="text-lg font-bold text-blue-500">Thông số sản phẩm</h2>
                        <ul className="list-disc pl-5 text-gray-700 text-sm font-semibold">
                            {Object.entries(product.productDetails)
                                .filter(([key]) => key !== 'moreDetails')
                                .map(([key, value]) => (
                                <li key={key} className="list-none before:content-['-'] before:mr-2">
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Price Section */}
                    <div className="mt-6 bg-gray-100 p-4 outline-dashed outline-slate-300 rounded-lg">
                        <p className="text-red-500 font-bold text-sm">
                            Giá khuyến mãi: <span className="font-semibold">Giảm {product.discount}%</span>
                        </p>
                        <p className="text-blue-600 font-bold text-xl">
                            {product.price.toLocaleString()}₫ <span className="text-blue-600 text-lg line-through">{product.cost.toLocaleString()}₫</span>
                        </p>
                        <p className="text-blue-600">Tiết kiệm: {(product.cost - product.price).toLocaleString()}₫</p>
                        <div className="mt-6 p-4 rounded-lg text-white" style={{ background: 'linear-gradient(to right, #5dade2 , #2e86c1 )' }}>
                            <p className="text-sm font-semibold">
                                Giá CHẠM ĐÁY khi Mua Online:
                            </p>
                            <div className="flex justify-between"> 
                                <p className="text-xl font-bold items-center">
                                    {(product.price - 100000).toLocaleString()}₫
                                </p>
                                <p className="text-sm items-center mt-1">
                                    Đã giảm thêm: 100,000₫
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                <span className="bg-yellow-300 px-2 py-1 rounded">
                                Giá đã bao gồm VAT
                                </span>
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                <span className="bg-yellow-300 px-2 py-1 rounded">
                                Bảo hành: 24 tháng (Pin 12 tháng)
                                </span>
                            </p>
                        </div>
                    </div>


                    {/* Quantity and Action Buttons */}
                    <div className="mt-4 p-2 flex items-center justify-start space-x-4">
                        <span className="text-sm text-blue-500 text"><strong>Số lượng:</strong></span>
                        <div className="flex items-center border bg-white border-gray-400 rounded py-1">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="text-gray-800 w-10"><strong>–</strong></button>
                            <input
                                type="text"
                                value={quantity}
                                className="w-12 text-center border-l border-r border-gray-400"
                                readOnly
                            />
                            <button onClick={() => setQuantity(quantity + 1)} className="text-gray-800 w-10"><strong>+</strong></button>
                        </div>
                        <div className="flex items-center border bg-white border-gray-400 rounded py-1 px-2 hover:bg-blue-400">
                            <button onClick={handleAddToCart} className="text-gray-800">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 w-full flex justify-center rounded-lg py-2 bg-red-500  hover:bg-red-600">
                        <button className="text-white rounded flex flex-col items-center">
                            <h2 className="text-xl">MUA NGAY</h2>
                            <p className="text-sm">Giao nhanh tận nơi, miễn phí toàn quốc</p>
                        </button>
                    </div>
                </div>              
            </div>

            <div className="col-start-2 col-span-8 mt-10 pt-5 border-t-2 border-gray-300">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-500">Sản phẩm tương tự</h2> 
                </div>

                <div className="flex overflow-x-auto w-full mt-5">
                    <div className="flex flex-row justify-between gap-2">
                        {relatedProducts.map((product, index) => (
                            <div key={index} onClick={() => {handleProductClick(product.id); setQuantity(1);}}> 
                                <Product product={product} refreshCart={refreshCart}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-start-2 col-span-8 mt-10 pt-5 border-t-2 border-gray-300">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-500">Đặc điểm nổi bật</h2> 
                </div>
                <div className="flex mt-4 h-full">
                    <textarea className="w-full h-56 p-4 rounded-lg border border-gray-200" value={product.longDescription} readOnly></textarea>
                </div>
            </div>

            <Review product={product} reviews={reviews} />

            {isModalOpen && (
               <div
                    className="fixed h-auto bg-gray-400 inset-0 bg-opacity-75 flex items-center justify-center"
                    onClick={toggleModal}
                >
                    <div className="bg-white h-auto p-4 rounded-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white h-auto p-4 rounded-lg">
                            <img
                                src={product.images[currentImage]}
                                alt={product.name}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <button
                                onClick={toggleModal}
                                className="absolute top-0 right-0 bg-blue-200 p-2 text-blue-500"
                            >
                                Close
                            </button>
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full border shadow"
                                onClick={handlePrevClick}
                            >
                                <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
                            </button>
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full border shadow"
                                onClick={handleNextClick}
                            >
                                <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
