import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class CategoryService {
    static async createCategory(categoryData) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.CATEGORY.CREATE}`, 
            categoryData,
            { headers : ApiService.getHeader()},
        );

        return response.data;
    }

    static async getCategoryByName(name) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CATEGORY.GET_BY_NAME}?categoryName=${name}`);

        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CATEGORY.GET_BY_ID}/${categoryId}`);

        return response.data;
    }

    static async getAllCategory() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CATEGORY.GET_ALL}`,
        );

        return response.data;
    }

    static async getAllParentCategory() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.CATEGORY.GET_PARENT_CATEGORY}`,
            { headers : ApiService.getHeader() },
        );

        return response.data;
    }

    static async getCategoryPage(pageNumber, pageSize, sortField, keyWord) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.CATEGORY.GET_PAGE}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&keyWord=${keyWord}`,
            { headers : ApiService.getHeader() },
        );

        return response.data;
    }

    static async updateCategory(categoryId, categoryData) {
        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.CATEGORY.UPDATE}/${categoryId}`,
            categoryData,
            { headers : ApiService.getHeader()},
        );

        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.CATEGORY.DELETE}/${categoryId}`,
            { headers : ApiService.getHeader()}
        );

        return response.data;
    }
}