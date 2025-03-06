import { Link } from "react-router-dom";
import ROUTES from "../../../constants/Route";

const SideMenu = () => {
    return (
        <div className={`w-1/5 h-full bg-slate-200 border-2 border-gray-300 rounded-lg transition-all duration-300}`}>
            <ul className=" w-full h-full flex flex-col justify-start">
                <li><Link to={ROUTES.PAGE_LAPTOP} className="block pl-5 px-2 py-2 hover:bg-blue-400">Laptop</Link></li>
                <li><Link to={ROUTES.PAGE_MACBOOK} className="block pl-5 px-2 py-2 hover:bg-blue-400">Macbook</Link></li>
                <li><Link to={ROUTES.PAGE_PC} className="block pl-5 px-2 py-2 hover:bg-blue-400">PC</Link></li>
                <li><Link to={ROUTES.PAGE_IPAD} className="block pl-5 px-2 py-2 hover:bg-blue-400">iPad</Link></li>
                <li><Link to="/phu-kien" className="block pl-5 px-2 py-2 hover:bg-blue-400">Phụ kiện</Link></li>
                <li><Link to="/sua-may-tinh" className="block pl-5 px-2 py-2 hover:bg-blue-400">Sửa máy tính</Link></li>
                <li><Link to="/tin-tuc" className="block pl-5 px-2 py-2 hover:bg-blue-400">Tin tức</Link></li>
            </ul>
        </div>
    );
};

export default SideMenu;
