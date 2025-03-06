import { createContext, useState } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState({
        city: '',
        district: '',
        ward: '',
        street: '',
    });

    const [note, setNote] = useState('');

    return (
        <AddressContext.Provider value={{ address, setAddress, note, setNote }}>
            {children}
        </AddressContext.Provider>
    );
}

