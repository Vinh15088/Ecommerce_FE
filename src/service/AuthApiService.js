import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";

export default class UserService {

    
    static async loginLocal(loginDetails) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.LOGIN}`, 
            loginDetails
        );

        return response.data;
    }

    static async loginGoogle(code) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.LOGIN_GOOGLE}`, 
            {params: {code}}
        );

        return response.data;
    }

    static async loginFacebook(code) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.LOGIN_FACEBOOK}`, 
            {params: {code}}
        );

        return response.data;
    }

    static async introspectToken(request) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.INTROSPECT_TOKEN}`, 
            request
        );

        return response.data;
    }

    static async refreshToken(request) {
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`, 
            request
        );

        return response.data;
    }

    // static async logout() {
    //     ApiService.logout;
    // }
    
}
