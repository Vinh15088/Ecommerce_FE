import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ROUTES from "../constants/Route";
import HomePage from "../components/home/HomePage";
import Authenticate from "../components/auth/sign-in/Authenticate";
import Dashboard from "../components/admin/DashBoard";
import Category from "../components/admin/Category/Category";
import Brand from "../components/admin/Brand/Brand";
import Product from "../components/admin/Product/Product";
import Order from "../components/admin/Order/Order";
import AdminRouter from "./AdminRouter";
import Customer from "../components/admin/Customer/Customer";
import LaptopPage from "../components/home/products/laptops/LaptopPage";
import SingleProductPage from "../components/home/singleProduct/SingleProductPage";
import SignInPage from "../components/home/SignInPage";
import SignUpPage from "../components/home/SignUpPage";
import InfoPage from "../components/home/user/InfoPage";
import OrdersPage from "../components/home/user/userOrders/OrdersPage";
import OrdersPendingPage from "../components/home/user/userOrders/OrdersPendingPage";
import OrdersConfirmedPage from "../components/home/user/userOrders/OrdersConfirmedPage";
import OrdersShippingPage from "../components/home/user/userOrders/OrdersShippingPage";
import OrdersDeliveredPage from "../components/home/user/userOrders/OrdersDeliveredPage";
import OrdersCancelledPage from "../components/home/user/userOrders/OrdersCancelledPage";
import ChangePasswordPage from "../components/home/user/ChangePasswordPage";    
import UserRouter from "./UserRouter";
import CartPage from "../components/home/cart/CartPage";
import PaymentInfoPage from "../components/home/cart/PaymentInfoPage";
import PaymentPage from "../components/home/cart/PaymentPage";
import MacbookPage from "../components/home/products/macbooks/MacbookPage";
import PcPage from "../components/home/products/pc/PcPage";
import IpadPage from "../components/home/products/ipad/IpadPage";
import SearchProductPage from "../components/home/products/searchProducts/SearchProductPage";

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* public route */}
                <Route path={ROUTES.BASE} element={<HomePage />} />
                <Route path={ROUTES.AUTHENTICATE} element={<Authenticate />} />
                <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                <Route path={ROUTES.PAGE_LAPTOP} element={<LaptopPage />} />
                <Route path={ROUTES.PAGE_MACBOOK} element={<MacbookPage />} />
                <Route path={ROUTES.PAGE_PC} element={<PcPage />} />
                <Route path={ROUTES.PAGE_IPAD} element={<IpadPage />} />
                <Route path={ROUTES.SEARCH_RESULTS} element={<SearchProductPage />} />
                <Route path={ROUTES.PAGE_SINGLE_PRODUCT} element={<SingleProductPage />} />


                {/* user route */}
                <Route path={ROUTES.USER_INFO} element={<UserRouter> <InfoPage /></UserRouter>} />
                <Route path={ROUTES.USER_ORDERS} element={<UserRouter> <OrdersPage /></UserRouter>} />
                <Route path={ROUTES.USER_ORDERS_PENDING} element={<UserRouter> <OrdersPendingPage /> </UserRouter>} />
                <Route path={ROUTES.USER_ORDERS_CONFIRMED} element={<UserRouter> <OrdersConfirmedPage /> </UserRouter>} />
                <Route path={ROUTES.USER_ORDERS_SHIPPING} element={<UserRouter> <OrdersShippingPage /> </UserRouter>} />
                <Route path={ROUTES.USER_ORDERS_DELIVERED} element={<UserRouter> <OrdersDeliveredPage /> </UserRouter>} />
                <Route path={ROUTES.USER_ORDERS_CANCELLED} element={<UserRouter> <OrdersCancelledPage /> </UserRouter>} />
                <Route path={ROUTES.USER_CHANGE_PASSWORD} element={<UserRouter> <ChangePasswordPage /> </UserRouter>} />
                <Route path={ROUTES.CART} element={<UserRouter> <CartPage /> </UserRouter>} />
                <Route path={ROUTES.PAYMENT_INFO} element={<UserRouter> <PaymentInfoPage /> </UserRouter>} />
                <Route path={ROUTES.PAYMENT} element={<UserRouter> <PaymentPage /> </UserRouter>} />


                {/* admin route */}
                <Route path={ROUTES.DASHBOARD} element={<AdminRouter><Dashboard /></AdminRouter>} />
                <Route path={ROUTES.DASHBOARD_USER} element={<AdminRouter><Customer /></AdminRouter>} />
                <Route path={ROUTES.DASHBOARD_CATEGORY} element={<AdminRouter><Category /></AdminRouter>} />
                <Route path={ROUTES.DASHBOARD_BRAND} element={<AdminRouter><Brand /></AdminRouter>} />
                <Route path={ROUTES.DASHBOARD_PRODUCT} element={<AdminRouter><Product /></AdminRouter>} />
                <Route path={ROUTES.DASHBOARD_ORDER} element={<AdminRouter><Order /></AdminRouter>} />


                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
                
        </Router>
    );
}

export default AppRouter;