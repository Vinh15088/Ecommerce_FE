import { Navigate, useLocation } from "react-router-dom"
import ROUTES from "../constants/Route"
import ApiService from "../service/ApiService"

function AdminRouter({children}) {
    const location = useLocation();

    return ApiService.isAdmin() ? (children) : (
        <Navigate to={ROUTES.BASE} replace state={{from: location}} />
    );
}

export default AdminRouter;