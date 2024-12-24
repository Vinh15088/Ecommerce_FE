import { Bars3Icon, ShoppingBagIcon, UserIcon, MagnifyingGlassIcon, IdentificationIcon, LockClosedIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'; 
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ApiService from '../../../service/ApiService';
import ROUTES from '../../../constants/Route';
import { NavbarContext } from '../../../context/NavbarContext';
import ProductService from '../../../service/ProductApiService';

function Navbar() {
    const itemIconClass = "w-5 h-5 lg:w-6 lg:h-6";
    const userButtonRef = useRef(null);
    const searchInputRef = useRef(null);

    const navigate = useNavigate();
    const [isModalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [isUserModal, setIsUserModal] = useState(false);
    const [search, setSearch] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchModalVisible, setSearchModalVisible] = useState(false);

    const { cartItems, refreshCart } = useContext(NavbarContext);

    useEffect(() => {
        refreshCart();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp > currentTime) {
                setUsername(decodedToken.data.username);
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userButtonRef.current && !userButtonRef.current.contains(event.target)) {
                setIsUserModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUserButtonClick = () => {
        if(username) setIsUserModal(!isUserModal);
        else navigate(ROUTES.SIGN_IN);
    }

    const handleLogout = () => {
        ApiService.logout();
        navigate(ROUTES.SIGN_IN);
        setUsername(null);
        setIsUserModal(false);
    }   

    const handleSearchChange = async (event) => {
        const keyword = event.target.value;
        setSearch(keyword);
        if(keyword.length >= 1) {
            try {
                const results = await ProductService.getProductWithKeywordAll(keyword);
                setSearchResults(results.content);
                setSearchModalVisible(true);
            } catch(error) {
                console.error("Error fetching search results: ", error);
            }
        } else {
            setSearchModalVisible(false);
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchModalVisible(false);
        navigate(ROUTES.SEARCH_RESULTS, {state: {keyword: search}});
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setSearchModalVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProductClick = (productId) => {
        navigate(ROUTES.PAGE_SINGLE_PRODUCT.replace(':id', productId), 
            { state: { product: searchResults.find(product => product.id === productId) } }
        );
    };

    // const handleProductClick = (productName) => {
    //     setSearch(productName);
    //     setSearchModalVisible(false);
    //     navigate(ROUTES.SEARCH_RESULTS, {state: {keyword: productName}});
    // }

    return (
        <div className="grid grid-cols-10 gap-4 bg-blue-400">
            <div className="col-start-2 col-span-8 flex justify-between items-center  px-6 py-6 text-white">
                
                <div className="flex items-center space-x-6">
                    <div className="rounded-lg h-10 w-20 shadow-lg">
                        <button onClick={() => navigate(ROUTES.BASE)} className="flex items-center space-x-2 w-30">
                            <img 
                                src="../../../assets/images/logo_vinhseo.png" 
                                alt="Logo" 
                                className=" shadow-lg object-contain" 
                                style={{ borderRadius: '50px' }} 
                            />
                        </button>
                    </div>

                    <div 
                        onMouseEnter={() => setModalVisible(true)}
                        onMouseLeave={() => setModalVisible(false)}
                        className="relative"
                    >
                        <button 
                            className="flex items-center bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 space-x-2">
                            <Bars3Icon className={itemIconClass} />
                            <span className="text-sm whitespace-nowrap">Danh mục</span>
                        </button>
                        {isModalVisible && (
                            <>
                                <div className="absolute top-full w-48 h-4"></div>
                                <div className="absolute top-full w-48 bg-white border border-gray-300 text-black rounded-lg shadow-lg mt-2 z-10">
                                    <ul className="flex flex-col justify-between">
                                        <li><Link to={ROUTES.PAGE_LAPTOP} className="block pl-5 px-2 py-2 hover:bg-blue-400">Laptop</Link></li>
                                        <li><Link to={ROUTES.PAGE_MACBOOK} className="block pl-5 px-2 py-2 hover:bg-blue-400">Macbook</Link></li>
                                        <li><Link to={ROUTES.PAGE_PC} className="block pl-5 px-2 py-2 hover:bg-blue-400">PC</Link></li>
                                        <li><Link to={ROUTES.PAGE_IPAD} className="block pl-5 px-2 py-2 hover:bg-blue-400">iPad</Link></li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                
                <div className="flex items-center w-full max-w-lg mx-4 rounded-full relative">
                    <form onSubmit={handleSearchSubmit} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Tìm kiếm ..."
                            className="w-full px-4 py-2 rounded-l-full text-gray-700 focus:outline-2 focus:outline-blue-500"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="bg-white text-blue-500 px-4 py-2 rounded-r-full flex items-center justify-center hover:bg-blue-700">
                            <MagnifyingGlassIcon className={itemIconClass} />
                        </button>
                    </form>
                    {isSearchModalVisible && (
                        <div className="absolute top-full mt-2 w-full max-w-md bg-white border border-gray-300 text-black rounded-lg shadow-lg z-10 overflow-y-auto" style={{ maxHeight: '300px' }}>
                            <ul className="flex flex-col">
                                {searchResults.map((product, index) => (
                                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" 
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4 ">
                    <button onClick={() => navigate('/cart')} className="flex items-center bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 space-x-2">
                        <ShoppingBagIcon className={`${itemIconClass} text-orange-500`} />
                        <span className="text-sm whitespace-nowrap">Giỏ hàng ({cartItems?.cartSummary?.totalItems || 0})</span>
                    </button>
                    
                    <div className="relative" ref={userButtonRef}>
                        <button onClick={handleUserButtonClick} className="flex justify-center items-center bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 space-x-2">
                            <UserIcon className={itemIconClass} />
                            <span className="text-sm whitespace-nowrap">
                                {username ? `Hi, ${username}` : 'Đăng nhập'}
                            </span>
                        </button>
                        {isUserModal && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-red-500 text-black rounded-lg shadow-xl z-10">
                                <ul className="flex flex-col">
                                    <li 
                                        className="flex justify-start p-4 py-2 px-2 pl-2 border-b border-gray-300 text-blue-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer" 
                                        onClick={() => navigate(ROUTES.USER_INFO)}
                                    >
                                        <IdentificationIcon className={`${itemIconClass} mr-2`} />
                                        Thông tin tài khoản
                                    </li>
                                    <li 
                                        className="flex justify-start p-4 py-2 px-2 pl-2 border-b border-gray-300 text-blue-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer" 
                                        onClick={() => navigate(ROUTES.USER_ORDERS)}
                                    >
                                        <ShoppingBagIcon className={`${itemIconClass} mr-2`} />
                                        Đơn hàng của tôi
                                    </li>
                                    <li 
                                        className="flex justify-start p-4 py-2 px-2 pl-2 border-b border-gray-300 text-blue-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer" 
                                        onClick={() => navigate(ROUTES.USER_CHANGE_PASSWORD)}
                                    >
                                        <LockClosedIcon className={`${itemIconClass} mr-2`} />
                                        Thay đổi mật khẩu
                                    </li>
                                    <li 
                                        className="flex justify-start p-4 py-2 px-2 pl-2 text-blue-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer" 
                                        onClick={handleLogout}
                                    >
                                        <ArrowRightStartOnRectangleIcon className={`${itemIconClass} mr-2`} />
                                        Đăng xuất
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
