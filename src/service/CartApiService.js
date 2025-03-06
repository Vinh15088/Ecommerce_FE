import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class CartService {
    static async addToCart(cartData) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.ADD_TO_CART}`, 
            cartData,
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async getMyCart() {
        console.log(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.MY_CART}`);
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.MY_CART}`, 
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }
    
    static async changeQuantity(cartId, cartData) {
        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.CHANGE_QUANTITY}/${cartId}`, 
              cartData,
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async deleteProductFromCart(productId) {
        console.log(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.DELETE_PRODUCT}?productId=${productId}`);
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.DELETE_PRODUCT}?productId=${productId}`, 
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }

    static async deleteAllProductFromCart() {
        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.CART.DELETE_ALL_PRODUCTS}`, 
            {headers: ApiService.getHeader()}
        );

        return response.data;
    }
}