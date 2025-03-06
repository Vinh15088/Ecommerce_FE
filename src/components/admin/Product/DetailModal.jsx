import { useEffect, useState } from "react";
import ReviewService from "../../../service/ReviewApiService";

function DetailModal({ product, onClose }) {
    const [reviews, setReviews] = useState([]);
    const [currentImage, setCurrentImage] = useState(product.images[0]);
    const [rating, setRating] = useState('');
    const [sortField] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const timeAgo = (dateString) => {
        try {
            const normalizedString = dateString.replace(/\.\+\d{2}:\d{2}/, "Z");
            const date = new Date(normalizedString);
    
            if (isNaN(date)) return "Invalid Date";
    
            const now = new Date();
            const diff = now - date; 
    
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);
    
            if (years > 0) return `${years} năm trước`;
            if (months > 0) return `${months} tháng trước`;
            if (days > 0) return `${days} ngày trước`;
            if (hours > 0) return `${hours} giờ trước`;
            if (minutes > 0) return `${minutes} phút trước`;
            return "Vừa xong";
        } catch (error) {
            return "Invalid Date";
        }
    };
    
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const data = await ReviewService.getReviewByProduct(product.id, rating, sortField, orderBy);

            setReviews(data.content);
            console.log(reviews);
        } catch(error) {
            console.error("Error fetching review: ", error);
        }
    }

    return (
        <div
            className="fixed bg-gray-400 inset-0 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col fixed top-0 right-0 2xl:w-4/5 xl:w-4/5 lg:w-4/5 bg-white h-full shadow-lg rounded-lg z-50 overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-8 flex justify-between items-center border-b border-gray-300 bg-gray-100">
                    <h2 className="text-2xl font-semibold">Thông tin chi tiết sản phẩm</h2>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-gray-400 font-bold text-2xl rounded-full w-10 h-10 hover:bg-red-300 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col md:flex-row gap-6 border-b border-gray-300 bg-gray-50">
                    {/* Images Section */}
                    <div className="w-full md:w-1/2  rounded-lg">
                        <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full h-auto object-cover border rounded-lg mb-4"
                        />
                        <div className="flex gap-2 overflow-auto">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
                                        currentImage === image
                                            ? "border-blue-500"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() => setCurrentImage(image)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">Laptop {product.brand} {product.name}</h1>
                        <p className="text-gray-600 mb-4 text-xl">{product.shortDescription}</p>
                        <div className="mb-3">
                            <p className="text-xl font-semibold text-gray-800">
                                Giá:{" "}
                                <span className="text-red-500">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.price)}
                                </span>
                            </p>
                            {product.discount > 0 && (
                                <p className="text-sm text-gray-500 line-through">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.cost)}
                                </p>
                            )}
                        </div>
                        <p className="text-gray-800 mb-3"><strong>Trong kho:</strong> {product.stock}</p>
                        <p className="text-gray-800 mb-3"><strong>Danh mục:</strong> {product.category}</p>
                        <div>
                            {Object.entries(product.productDetails).map(([key, value]) => {
                                if (key === "moreDetails" && typeof value === "object" && value) {
                                    return Object.entries(value).map(([subKey, subValue]) => (
                                        <p key={subKey} className="text-gray-800 mb-3">
                                            <strong>{subKey.charAt(0).toLowerCase() + subKey.slice(1)}:</strong>{" "}
                                            {subValue}
                                        </p>
                                    ));
                                }

                                if (key.toLowerCase() === "color" || key.toLowerCase() === "display") {
                                    return (
                                        <p key={key} className="text-gray-800 mb-3">
                                            <strong>{key.charAt(0).toLowerCase() + key.slice(1)}:</strong> {value}
                                        </p>
                                    );
                                }
                                return (
                                    <p key={key} className="text-gray-800 mb-3">
                                        <strong>{key}:</strong> {value}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer - Replace with Reviews Section */}
                <div className="p-8 border-t border-gray-300 bg-gray-100">
                    <h3 className="text-xl font-semibold mb-4">Đánh giá</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center mb-2">
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 ${
                                                    index < review.rating
                                                        ? "text-yellow-500"
                                                        : "text-gray-300"
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 .587l3.668 7.429 8.184 1.181-5.918 5.764 1.398 8.139L12 18.902l-7.332 3.864 1.398-8.139-5.918-5.764 8.184-1.181z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-600 text-sm">
                                        {timeAgo(review.createdAt)}
                                    </span>
                                </div>
                                <p className="text-gray-800 mb-1">{review.comment}</p>
                                <span className="text-sm text-gray-500">
                                    Đánh giá bởi <strong>{review.user.username}</strong>
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Không có đánh giá nào của sản phẩm này.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default DetailModal;
