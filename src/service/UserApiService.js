import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class UserService {
    static async registerUser(userData) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.USER.REGISTER}`, 
            userData
        );

        console.log(response);
    
        return response.data;
    }

    static async getUserById(userId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.USER.GET_BY_ID}/${userId}`);

        return response.data;
    }

    static async getMyProfile() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.USER.PROFILE}`, 
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }

    static async getMyOrders() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.USER.MY_ORDERS}`, 
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }

    static async getAllUser() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.USER.GET_ALL}`);

        return response.data;
    }

    static async getUserPage(pageNumber, pageSize, sortField, keyWord) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.USER.GET_PAGE}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&keyWord=${keyWord}`, 
            { headers : ApiService.getHeader() },
        );

        return response.data;
    }

    static async updateUser(userId, updateUserData) {
        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.USER.UPDATE}/${userId}`, 
            updateUserData,
            { headers : ApiService.getHeader()}        
        );

        return response.data;
    }

    static async deleteUser(userId) {
        await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.USER.DELETE}/${userId}`,
            { headers : ApiService.getHeader()}            
        );

    }

    static async changePassword(userId, password) {
        const formData = new FormData();
        formData.append("password", String(password));

        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.USER.CHANGE_PASSWORD}/${userId}`, 
            formData,
            { headers : {...ApiService.getHeader(), 'Content-Type': 'multipart/form-data'}}
        );

        return response.data;
    }
}
