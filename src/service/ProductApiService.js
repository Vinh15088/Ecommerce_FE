import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class ProductService {
    static async createProduct(productData, images) {
        try {     
            const formData = new FormData();
            formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
            
            images.forEach((image, index) => {
                formData.append("images", image) });
            
            const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.PRODUCT.CREATE}`,
                formData,
                {headers: {
                    "Content-Type": "multipart/form-data",
                    ...ApiService.getHeader()
                }}
            );
            
            return response.data; 
        } catch (error) {
            console.error("Error in createProduct:", error.response || error);
            throw error;
        }
    }

    static async getProductById(productId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_BY_ID}/${productId}`);

        return response.data;
    }

    static async getProductByName(productName) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_BY_NAME}?name=${productName}`);

        return response.data;
    }

    static async getAllProduct(size, number, sortBy, order) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_ALL}?size=${size}&number=${number}&sortBy=${sortBy}&order=${order}`,);

        return response.data;
    }

    static async getPageProduct(size, number, sortBy, order, keyWord, category, brand, minPrice, maxPrice) {
        const params = {
            size,
            number,
            sortBy,
            order,
            keyWord,
            category,
            brand,
            minPrice,
            maxPrice
        };
    
        // delete null and undefined
        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
    
        const url = `${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_ALL_PAGE}?${queryString}`;
    
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error during API call: ", error);
            throw error;
        }
    }

    static async getAllPageProductByCategoryAndBrand(number, size, categoryId, brandId,  minPrice, maxPrice) {
        const params = {
            number, 
            size,
            categoryId,
            brandId,
            minPrice,
            maxPrice
        };
    
        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
    
        const url = `${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_BY_PAGE_CATEGORY_AND_BRAND}?${queryString}`;
    
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error during API call: ", error);
            throw error;
        }
    }

    static async getAllProductByCategoryAndBrand(categoryId, brandId,  minPrice, maxPrice) {
        const params = {
            categoryId,
            brandId,
            minPrice,
            maxPrice
        };
    
        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
    
        const url = `${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_BY_CATEGORY_AND_BRAND}?${queryString}`;
    
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error during API call: ", error);
            throw error;
        }
    }

    static async getAllProductByBrand(size, number, minPrice, maxPrice) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.GET_BY_BRAND}`,
            {params: {size, number, minPrice, maxPrice}}
        );

        return response.data;
    }

    static async getProductWithKeyword(size, number, keyword) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.SEARCH}?size=${size}&number=${number}&keyword=${keyword}`,);

        return response.data;
    }

    static async getProductWithKeywordAll(keyword) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PRODUCT.SEARCH_ALL}?keyword=${keyword}`,);

        return response.data;
    }

    static async updateProduct(productId, productData, newImages) {
        try {     
            const formData = new FormData();
            formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
            
            newImages.forEach((image, index) => {
                formData.append("newImages", image) });
            
            const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.PRODUCT.UPDATE}/${productId}`,
                formData,
                {headers: {
                    "Content-Type": "multipart/form-data",
                    ...ApiService.getHeader()
                }}
            );
            
            return response.data; 
        } catch (error) {
            console.error("Error in createProduct:", error.response || error);
            throw error;
        }
    }

    static async deleteProduct(productId) {
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.PRODUCT.DELETE}/${productId}`,
            {headers: {
                ...ApiService.getHeader()
            }}
        );

        return response.data;
    }

    static async addProductStock(productId, stock) {
        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.PRODUCT.ADD_STOCK}/${productId}`, 
            {params: {stock}}
        );

        return response.data;
    }
}