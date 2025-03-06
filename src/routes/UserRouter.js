import { Navigate, useLocation } from "react-router-dom"
import ROUTES from "../constants/Route"
import ApiService from "../service/ApiService"

function UserRouter({children}) {
    const location = useLocation();

        return ApiService.isUser() ? (children) : (
        <Navigate to={ROUTES.BASE} replace state={{from: location}} />
    );
}

export default UserRouter;