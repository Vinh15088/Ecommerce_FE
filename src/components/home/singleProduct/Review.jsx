import ReviewItem from "./ReviewItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES  from "../../../constants/Route";
import { jwtDecode } from "jwt-decode";
import ReviewService from "../../../service/ReviewApiService";
import { showSuccessToast, showErrorToast } from "../../common/toastUtils";

function Review({ product, reviews}) {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("accessToken") ? true : false;

    const [username, setUsername] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp > currentTime) {
                setUsername(decodedToken.data.username);
            }
        }
    }, []);

    const [visibleReviews, setVisibleReviews] = useState(5);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [reviewForm, setReviewForm] = useState({
        product_id: product.id,
        rating: 0,
        comment: ""
    });

    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (value) => {
        setReviewForm({ ...reviewForm, rating: value });
    }

    const handleStartHover = (value) => {
        setHoverRating(value);
    }
    
    const handleStarHoverOut = () => {
        setHoverRating(0);
    }

    const handleLoadMoreReviews = () => {
        setVisibleReviews(prev => prev + 5);
    }

    const handleCollapse = () => {
        setVisibleReviews(5);
    }

    const handleShowReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    }

    const handleChangeReviewForm = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    }

    const handleSubmitReview = async () => {
        setIsLoading(true);
        try {
            const response = await ReviewService.createReview(reviewForm);
            console.log(response);
            if (response.status === 200) {
                setShowReviewForm(false);
                showSuccessToast("Đánh giá sản phẩm thành công!");
            }
            
        } catch (error) {
            console.log(error);
            if(error.response.data.code === 1010) {
                showErrorToast("Bạn đã đánh giá sản phẩm này rồi!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    let totalReviews = reviews.length;
    let averageRating = () => {
        return (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    }
    let starDistribution = () => {
        return reviews.reduce((acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        }, {});
    }


    return (
        <>
            <div className="col-start-2 col-span-8 mt-10 pt-5 border-t-2 border-gray-300">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-500">Đánh giá & nhận xét: LAPTOP <span>{product.brand} {product.name}</span></h2> 
                </div>
                <div className="flex mt-4">
                    <div className="w-1/4 flex flex-col items-center">
                        <p className="text-4xl font-bold">{averageRating()}/5</p>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`w-6 h-6 ${index < Math.round(averageRating()) ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">{totalReviews} đánh giá & nhận xét</p>
                    </div>
                    <div className="w-3/4 pl-4">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center mb-2">
                                <span className="text-yellow-500">{star} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 inline"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                                <div className="flex-1 mx-2 bg-gray-200 h-2 rounded">
                                    <div className="bg-blue-500 h-2 rounded" style={{ width: `${(starDistribution()[star] / totalReviews) * 100}%` }}></div>
                                </div>
                                <span className="text-sm text-gray-500">{starDistribution()[star]} đánh giá</span>
                            </div>
                        ))}
                    </div>
                </div>

                {isAuthenticated ? (
                    <div>
                        <button onClick={handleShowReviewForm} className="p-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            {showReviewForm ? "Ẩn form đánh giá" : "Viết đánh giá sản phẩm này"}
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 p-4 border-t border-gray-300 flex flex-col items-center">
                        <p className="text-gray-500">Vui lòng đăng nhập để viết đánh giá</p>
                        <button onClick={() => navigate(ROUTES.SIGN_IN)} className="mt-2 p-2 px-4 bg-blue-500 text-white rounded-full">Đăng nhập</button>
                    </div>
                )}

                {isAuthenticated && showReviewForm && (
                    <div className="mt-4 p-4 border-t border-gray-300">
                        <h3 className="text-lg font-semibold text-blue-500">Bạn thấy sản phẩm này như thế nào?</h3>
                        <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`w-6 h-6 ${index < (hoverRating || reviewForm.rating) ? 'text-yellow-500' : 'text-gray-400'}`}
                                    onClick={() => handleStarClick(index + 1)}
                                    onMouseEnter={() => handleStartHover(index + 1)}
                                    onMouseLeave={handleStarHoverOut}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="font-semibold text-sm text-gray-500 text-nowrap pr-2">Tên người đánh giá:</p>
                            <input type="text" value={username} disabled className="w-full mt-2 p-2 border rounded" />
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="font-semibold text-sm text-gray-500 text-nowrap pr-2">Nội dung đánh giá: </p>
                            <textarea onChange={(e) => handleChangeReviewForm({ target: { name: "comment", value: e.target.value } })} placeholder="Nội dung đánh giá về sản phẩm..." className="w-full mt-2 p-2 border rounded"></textarea>
                        </div>
                        <button onClick={handleSubmitReview} className="mt-2 p-2 px-4 bg-blue-500 text-white    rounded-full hover:bg-blue-600">
                            {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                    </div>
                )}

                <div className="mt-4">
                    {totalReviews === 0 && (
                        <div className="flex justify-center items-center">
                            <p className="text-gray-500">Không có đánh giá nào</p>
                        </div>
                    )}
                    {reviews.slice(0, visibleReviews).map((review, index) => (
                        <ReviewItem review={review} key={index} />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    {visibleReviews < totalReviews && (
                        <button onClick={handleLoadMoreReviews} className="p-2 px-4 bg-blue-500 text-white rounded-full mr-2 hover:bg-blue-600">
                            Xem thêm đánh giá
                        </button>
                    )}
                    {visibleReviews >= totalReviews && (
                        <button onClick={handleCollapse} className="p-2 px-4 bg-gray-500 text-white rounded-full hover:bg-gray-600">
                            Thu gọn
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Review;
