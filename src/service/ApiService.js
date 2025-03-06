import { jwtDecode } from "jwt-decode";


export default class ApiService {
    static getHeader() {
        const token = localStorage.getItem('accessToken');

        return {
            Authorization: `Bearer ${token}`,
        };
    }

    static logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("accessToken");

        return !!token;
    }

    static isAdmin() {
        const token = localStorage.getItem("accessToken");
        if(token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.scope === "ADMIN";
        }
        return false;
    }

    static isUser() {
        const token = localStorage.getItem("accessToken");
        if(token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.scope === "USER";
        }

        return false;
    }
}

