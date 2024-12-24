import { ClipboardDocumentListIcon, ShoppingCartIcon, LockClosedIcon, UserCircleIcon, UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../constants/Route";
import ApiService from "../../service/ApiService";

function UserSideCommon() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (route) => {
        return location.pathname.startsWith(route);
    }

    const handleLogout = () => {
        ApiService.logout();
        navigate(ROUTES.SIGN_IN);
    }
    
    return (
        <div className="col-span-1 bg-white border border-gray-300 rounded-lg shadow-md pt-4 h-72 overflow-y-auto">
            <div className="flex flex-row gap-4 items-center border-b border-gray-300 pl-4 pb-5">
                <div>
                    <UserCircleIcon className="h-12 w-12 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-md font-semibold text-blue-500">Tài khoản của bạn</h3>
                    <h3 className="text-md font-bold text-blue-500">Mai Đức Vinh</h3>
                </div>
            </div>
            <div className="flex flex-col items-stretch">
                <button onClick={() => navigate(ROUTES.USER_INFO)} className={`flex flex-row gap-4 items-center p-2 pl-4 ${isActive(ROUTES.USER_INFO) ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'}`}>
                    <div>
                        <UserIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Thông tin tài khoản</span>
                </button>
                <button onClick={() => navigate(ROUTES.CART)} className={`flex flex-row gap-4 items-center p-2 pl-4 ${isActive(ROUTES.CART) ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'}`}>
                    <div>
                        <ShoppingCartIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Giỏ hàng</span>
                </button>
                <button onClick={() => navigate(ROUTES.USER_ORDERS)} className={`flex flex-row gap-4 items-center p-2 pl-4 ${isActive(ROUTES.USER_ORDERS) ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'}`}>
                    <div>
                        <ClipboardDocumentListIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Lịch sử đơn hàng</span>
                </button>
                <button onClick={() => navigate(ROUTES.USER_CHANGE_PASSWORD)} className={`flex flex-row gap-4 items-center p-2 pl-4 ${isActive(ROUTES.USER_CHANGE_PASSWORD) ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'}`}>
                    <div>
                        <LockClosedIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Thay đổi mật khẩu</span>
                </button>
                <button onClick={handleLogout} className="flex flex-row gap-4 items-center p-2 pl-4 hover:bg-blue-100 hover:text-blue-500 w-full">
                    <div>
                        <ArrowRightStartOnRectangleIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Đăng xuất tài khoản</span>
                </button>
            </div>
        </div>
    );
};

export default UserSideCommon;
