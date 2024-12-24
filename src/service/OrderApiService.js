import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class OrderService {
    static async createOrder(orderData) {
        const formData = new FormData();
        formData.append("order", new Blob([JSON.stringify(orderData)], { type: "application/json" }));

        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ORDER.CREATE}`,
            formData, 
            {headers: {
                "Content-Type": "multipart/form-data",
                ...ApiService.getHeader()
            }}
        );

        return response.data;
    }

    static async getOrderById(orderId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_BY_ID}/${orderId}`);

        return response.data;
    }

    static async getOrderByUserId(userId) {
        console.log(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_BY_USER_ID}/${userId}`);
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_BY_USER_ID}/${userId}`,
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async getOrderByOrderCode(orderCode) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_BY_ORDER_CODE}/${orderCode}`);

        return response.data;
    }

    static async getAll() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_ALL}`,
            {headers: ApiService.getHeader()}
        )

        return response.data;
    }

    static async getAllOrder(size, number, sortBy, order, keyWord, status, method) {
        const params = {size, number, sortBy, order, keyWord, status, method};

        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");

        const url = `${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.GET_ALL_PAGE}?${queryString}`;
        const response = await axios.get(url,
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async updateOrder(orderCode, changeOrderStatus) {
        const formData = new FormData();
        formData.append("changeOrderStatus", new Blob([JSON.stringify(changeOrderStatus)], { type: "application/json" }));

        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.UPDATE}/${orderCode}`,
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data',
                ...ApiService.getHeader()}}
        );

        return response.data;
    }

    static async getMyOrder() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ORDER.MY_ORDER}`,
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async deleteOrder(orderId) {
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.ORDER.DELETE}/${orderId}`);
        return response.data;
    }


}