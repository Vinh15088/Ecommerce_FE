import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";
export default class PaymentService {
    static async paymentOrderVNPay(orderCode) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PAYMENT.VNPAY.ORDER}/${orderCode}`);

        return response.data;
    }

    static async paymentOrderZaloPay(orderCode) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.PAYMENT.ZALOPAY.ORDER}/${orderCode}`,
            {headers: ApiService.getHeader() },
        );

        return response.data;
    }
}