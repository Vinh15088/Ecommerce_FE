import { createContext, useState, useEffect } from 'react';
import CartService from '../service/CartApiService';
import { removeToken } from '../service/LocalStorageService';

export const NavbarContext = createContext();

export const NavbarProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getCartItems();
    }, [children]);

    const getCartItems = async () => {
        const token = localStorage.getItem('accessToken');

        if(token === 'undefined') removeToken();

        if(!token || token === 'undefined') {
            return;
        }
        try {
            const response = await CartService.getMyCart();
            setCartItems(response.content);
            console.log("cartItems: {}", response.content);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    const refreshCart = () => {
        getCartItems();
    }

    return (
        <NavbarContext.Provider value={{ cartItems, refreshCart }}>
            {children}
        </NavbarContext.Provider>
    );
}