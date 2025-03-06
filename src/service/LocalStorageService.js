import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ROUTES from "../constants/Route";

export const KEY_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(KEY_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const instance = axios.create({
  baseURL: API_ROUTES.API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,  // Trả về nếu response thành công
  async (error) => {
    const originalRequest = error.config;

    console.log("Test refresh token")

    // Kiểm tra lỗi 401 (Unauthorized) hoặc lỗi mạng
    if ((error.response.status === 401 && !originalRequest._retry) || error.AxiosError.code === "ERR_NETWORK") {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        // Gửi request để lấy lại token mới
        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
          { token: refreshToken }, 
          {headers: {"Content-Type": "application/json"}},
        );

        // Lấy token mới từ response và cập nhật vào localStorage
        const newToken = response.data.content.token;
        setToken(newToken);

        // Cập nhật Authorization header với token mới
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Tiến hành gọi lại request ban đầu
        return axios(originalRequest);
      } catch (error) {
        console.log("Error refreshing token:", error);
        // Nếu refresh token không thành công, có thể logout hoặc xử lý khác
        removeToken();
        window.location.href = ROUTES.SIGN_IN;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;