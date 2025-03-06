import axios from "axios";
import API_ROUTES from "../constants/ApiRoutes";
import ApiService from "./ApiService";

export default class BrandService {
    static async createBrand(brandData, logo) {
        console.log(`Image:`, logo);
                console.log(`Type of logo:`, typeof logo);
                console.log(`Is Blob:`, logo instanceof Blob);
                console.log(`Is File:`, logo instanceof File);
        const formData = new FormData();
        formData.append("brand", new Blob([JSON.stringify(brandData)], {type: "application/json"}));
        formData.append("logo", logo);

        const response = await axios.post(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.BRAND.CREATE}`,
            formData,
            {headers: {
                "Content-Type": "multipart/form-data",
                ...ApiService.getHeader()
            }}
        );

        return response.data;
    }

    static async getBrandById(brandId) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.BRAND.GET_BY_ID}/${brandId}`);

        return response.data;
    }

    static async getBrandByName(brandName) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.BRAND.GET_BY_NAME}?brandName=${brandName}`);

        return response.data;
    }

    static async getAllBrand() {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.BRAND.GET_ALL}`);

        return response.data;
    }

    static async getBrandPage(pageNumber, pageSize, sortField, keyWord) {
        const response = await axios.get(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.BRAND.GET_PAGE}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&keyWord=${keyWord}`,
            { headers : ApiService.getHeader() },
        );

        return response.data;
    }

    static async updateBrand(brandId, brandData, logo) {
        console.log(brandData);
        console.log(logo);

        const formData = new FormData();
        formData.append(
            "brand",
            new Blob([JSON.stringify(brandData)], { type: "application/json" })
          );
        formData.append("logo", logo);

        console.log(formData);

        const response = await axios.put(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.BRAND.UPDATE}/${brandId}`,
            formData, 
            {headers: {
                "Content-Type": "multipart/form-data",
                ...ApiService.getHeader()
            }}
        );

        return response.data;
    }

    static async deleteBrand(brandId) {  
        console.log(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.BRAND.DELETE}`);

        const response = await axios.delete(`${API_ROUTES.API_BASE_URL}${API_ROUTES.ADMIN.BRAND.DELETE}/${brandId}`,
            { headers : ApiService.getHeader() },       
        );

        return response.data;
    }


}