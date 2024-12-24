import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class ReviewService {
    static async createReview(reviewData) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.CREATE}`, 
            reviewData, 
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }

    static async getReviewById(reviewId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.GET_BY_ID}/${reviewId}`);

        return response.data;
    }


    static async getReviewByProduct(productId, rating, sortBy, order) {
        console.log(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.GET_BY_PRODUCT}?productId=${productId}&rating=${rating}&sortBy=${sortBy}&order=${order}`);
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.GET_BY_PRODUCT}?productId=${productId}&rating=${rating}&sortBy=${sortBy}&order=${order}`,);

        return response.data;
    }

    static async getReviewUser(productId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.GET_BY_USER}/${productId}`,
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }

    static async updateReview(reviewId, reviewData) {
        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.REVIEW.UPDATE}/${reviewId}`,
            reviewData,
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }

    static async deleteReview(reviewId) {
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.REVIEW.DELETE}/${reviewId}`);

        return response.data;
    }

}