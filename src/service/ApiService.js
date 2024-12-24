
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
        const role = localStorage.getItem("role");

        return role === "ADMIN";
    }

    static isUser() {
        const role = localStorage.getItem("role");

        return role === "USER";
    }
}

