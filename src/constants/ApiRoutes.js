const API_ROUTES = {
    BASE_URL: "http://localhost:8080",
    API_BASE_URL: "http://localhost:8080/api/v1",
  
    // Auth
    AUTH: {
      LOGIN: "/auth/login/local",
      LOGIN_GOOGLE: "/auth/outbound/google/authentication",
      LOGIN_FACEBOOK: "/auth/outbound/facebook/authentication",
      INTROSPECT_TOKEN: "/auth/introspect",
      REFRESH_TOKEN: "/auth/refresh",
      LOGOUT: "/auth/logout",
    },
  
    // Admin
    ADMIN: {
      USER: {
        GET_BY_ID: "/users",
        GET_ALL: "/users/all",
        GET_PAGE: "/users",
        DELETE: "/users",
      },
      BRAND: {
        CREATE: "/brands",
        GET_PAGE: "/brands",
        UPDATE: "/brands",
        DELETE: "/brands",
      },
      CATEGORY: {
        CREATE: "/categories",
        GET_PARENT_CATEGORY: "/categories/allParent",
        GET_PAGE: "/categories",
        UPDATE: "/categories",
        DELETE: "/categories",
      },
      PRODUCT: {
        CREATE: "/products",
        UPDATE: "/products",
        DELETE: "/products",
        ADD_STOCK: "/products/add-stock",
      },
      ORDER: {
        GET_BY_ID: "/orders/id",
        GET_BY_USER_ID: "/orders/userId",
        GET_BY_ORDER_CODE: "/orders/code",
        GET_ALL_PAGE: "/orders/all-page",
        GET_ALL: "/orders/all",
        UPDATE: "/orders/change-status",
        DELETE: "/orders",
      },
      REVIEW: {
        DELETE: "/reviews",
      },
    },
  
    // User
    USER: {
      REGISTER: "/users/register",
      PROFILE: "/users/my-profile",
      UPDATE: "/users",
      CHANGE_PASSWORD: "/users/change-password",
      MY_ORDERS: "/orders/my-order",
    },
  
    // Brand
    BRAND: {
      GET_BY_ID: "/brands",
      GET_BY_NAME: "/brands/name",
      GET_ALL: "/brands/all",
    },
  
    // Category
    CATEGORY: {
      GET_BY_ID: "/categories",
      GET_BY_NAME: "/categories/name",
      GET_ALL: "/categories/all",
    },
  
    // Product
    PRODUCT: {
      GET_BY_ID: "/products",
      GET_BY_NAME: "/products",
      GET_ALL: "/products/all",
      GET_ALL_PAGE: "/products/allPage",
      GET_BY_PAGE_CATEGORY_AND_BRAND: "/products/page-category-brand",
      GET_BY_CATEGORY_AND_BRAND: "/products/category-brand",
      GET_BY_BRAND: "/products/brand",
      SEARCH: "/products/search",
      SEARCH_ALL: "/products/search_product",
    },
  
    // Order
    ORDER: {
      CREATE: "/orders",
      MY_ORDER: "/orders/my-order",
    },
  
    // Cart
    CART: {
      ADD_TO_CART: "/carts/add-to-cart",
      MY_CART: "/carts/my-cart",
      CHANGE_QUANTITY: "/carts/change-quantity",
      DELETE_PRODUCT: "/carts/delete-product-from-cart",
      DELETE_ALL_PRODUCTS: "/carts/delete-all-product",
    },
  
    // Review
    REVIEW: {
      CREATE: "/reviews",
      GET_BY_ID: "/reviews",
      GET_BY_PRODUCT: "/reviews/byProduct",
      GET_BY_USER: "/reviews/byUser",
      UPDATE: "/reviews/update",
    },
  
    // Payment
    PAYMENT: {
      VNPAY: {
        ORDER: "/payment/vn-pay/payment-order",
        CALLBACK: "/payment/vn-pay/call-back",
        IPN: "/payment/vn-pay/IPN",
      },
      ZALOPAY: {
        ORDER: "/payment/zalo-pay/payment-order",
        CALLBACK: "/payment/zalo-pay/call-back",
        STATUS_ORDER: "/payment/zalo-pay/status-order",
      },
    },
  };
  
  export default API_ROUTES;
  