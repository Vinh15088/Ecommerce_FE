import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import MenuItem from "./MenuItem";
import { ArrowRightEndOnRectangleIcon, CubeIcon, HomeIcon, RectangleGroupIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/16/solid";
import { Category } from "@mui/icons-material";
import ROUTES from "../../../constants/Route";
import ApiService from "../../../service/ApiService";

function SideMenu(toggleActiveComponent) {
    const navigate = useNavigate();
    const itemIconClass = "w-8 h-8 lg:w-5 lg:h-5";

    const location = useLocation();

    const handleLogout = () => {
        ApiService.logout();
        navigate(ROUTES.SIGN_IN);
    }

    useEffect(() => {
        console.log("Location changed: ", location.pathname);
    }, [location]);

    return (
        <div className="bg-gray-800 overflow-y-auto h-screen">
            <Header title="Quản lý" />

            <ul className="lg:mt-2 lg:space-y-2">
                <MenuItem 
                    to={ROUTES.DASHBOARD} 
                    title="Trang chủ" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD} >
                    <HomeIcon  className={itemIconClass} />
                </MenuItem>

                <MenuItem 
                    to={ROUTES.DASHBOARD_USER} 
                    title="Người dùng" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD_USER} >
                    <UserIcon className={itemIconClass} />
                </MenuItem>

                <MenuItem 
                    to={ROUTES.DASHBOARD_CATEGORY} 
                    title="Danh mục" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD_CATEGORY} >
                    <Category className={itemIconClass} />
                </MenuItem>

                <MenuItem 
                    to={ROUTES.DASHBOARD_BRAND} 
                    title="Nhãn hiệu" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD_BRAND} >
                    <RectangleGroupIcon className={itemIconClass} />
                </MenuItem>

                <MenuItem 
                    to={ROUTES.DASHBOARD_PRODUCT} 
                    title="Sản phẩm" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD_PRODUCT} >
                    <CubeIcon className={itemIconClass} />
                </MenuItem>

                <MenuItem 
                    to={ROUTES.DASHBOARD_ORDER} 
                    title="Đơn hàng" 
                    onClick={toggleActiveComponent}
                    active={location.pathname === ROUTES.DASHBOARD_ORDER} >
                    <ShoppingBagIcon className={itemIconClass} />                
                </MenuItem>
                <div>
                    <span className="my-3 lg:my-5 border-b border-gray-900 block"></span>
                </div>
                
                <MenuItem title="Đăng xuất" onClick={handleLogout}>
                    <ArrowRightEndOnRectangleIcon className={itemIconClass} />
                </MenuItem>
            </ul>
        </div>
    );
}

export default SideMenu;