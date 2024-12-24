const ROUTES = {
    BASE: "/",
    AUTHENTICATE: "/authenticate",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGOT: "/forgot",

    // Dashboard - Admin
    DASHBOARD: "/dashboard",
    DASHBOARD_USER: "/dashboard/user",
    DASHBOARD_CATEGORY: "/dashboard/category",
    DASHBOARD_BRAND: "/dashboard/brand",
    DASHBOARD_PRODUCT: "/dashboard/product",
    DASHBOARD_ORDER: "/dashboard/order",


    PAGE_LAPTOP: "/products/laptop",
    PAGE_MACBOOK: "/products/macbook",
    PAGE_PC: "/products/pc",
    PAGE_IPAD: "/products/ipad",
    PAGE_SINGLE_PRODUCT: "/product/:id",

    SEARCH_RESULTS: "/search",

    // User
    MENU: "/menu",
    BRAND: "/brand",
    CATEGORY: "/category",
    PRODUCT: "/product",
    CART: "/cart",
    PAYMENT_INFO: "/cart/info",
    PAYMENT: "/cart/payment",
    ORDER: "/order",
    REVIEW: "/review",

    USER_INFO: "/account",
    USER_CHANGE_PASSWORD: "/change-password",
    USER_ORDERS: "/my-orders",
    USER_ORDERS_PENDING: "/my-orders/pending",
    USER_ORDERS_CONFIRMED: "/my-orders/confirmed",
    USER_ORDERS_SHIPPING: "/my-orders/shipping",
    USER_ORDERS_DELIVERED: "/my-orders/delivered",
    USER_ORDERS_CANCELLED: "/my-orders/cancelled",
  
    ACCOUNT_ADMIN_ORDERS: "/account/admin/orders",
    ACCOUNT_ADMIN_USERS: "/account/admin/users",
    ACCOUNT_ADMIN_PRODUCTS: "/account/admin/products",
    ACCOUNT_ADMIN_CATEGORY: "/account/admin/categories",

  };
  
  export default ROUTES;
  