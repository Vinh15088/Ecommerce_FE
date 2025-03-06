import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useContext } from "react";
import ROUTES from "../../constants/Route";
import Submit from "./Submit";
import SelectAddress from "./SelectAddress";
import LineContent from "./LineContent";
import { ProductInfo } from "./ProductInfo";
import { jwtDecode } from "jwt-decode";
import { AddressContext } from "../../context/AddressContext";
import CartService from "../../service/CartApiService";
import UserService from '../../service/UserApiService';


function PaymentInfo() {
    const [cartItems, setCartItems] = useState([]);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        getCartItems();
        fetchMyProfile();
    }, []);

    const getCartItems = async () => {
        try {
            const response = await CartService.getMyCart();
            setCartItems(response.content);
            console.log("cartItems: {}", response.content);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    const fetchMyProfile = async () => {
        try {
            const response = await UserService.getMyProfile();
            const userData = response.content;
            setFullName(userData.fullName);
            setPhone(userData.phoneNumber);
            setEmail(userData.email);
        } catch(error) {
            console.log("Error fetching my profile: {}", error);
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const { address, setAddress, note, setNote } = useContext(AddressContext);

    const handleAddressChange = (selectedStreet) => {
        setAddress({
            city: cities.find(city => city.id === selectedCity).full_name,
            district: districts.find(district => district.id === selectedDistrict).full_name,
            ward: wards.find(ward => ward.id === selectedWard).full_name,
            street: selectedStreet,
        })
    }

    const isAddressValid = address.city && address.district && address.ward && address.street;

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setCities(data.data);
                }
            });
    }, []);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setSelectedDistrict('');
        setWards([]);

        fetch(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`)
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setDistricts(data.data);
                }
            });
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setWards(data.data);
                }
            });
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-3 col-span-6 gap-4 pb-4 flex flex-col">
                <h2 className="text-2xl font-semibold text-center text-blue-500">Thông tin</h2>
                <div className="mx-20">
                    <div className="border-b border-r border-l border-gray-300 rounded-lg">
                        {cartItems.cartItemResponses && cartItems.cartItemResponses.length > 0 && (
                            <ProductInfo 
                                key={cartItems.cartItemResponses[0].productId} 
                                image={cartItems.cartItemResponses[0].images[0]} 
                                name={cartItems.cartItemResponses[0].name} 
                                price={cartItems.cartItemResponses[0].unitPrice} 
                                oldPrice={cartItems.cartItemResponses[0].unitCost} 
                                quantity={cartItems.cartItemResponses[0].quantity} 
                            />
                        )}
                        
                        {isExpanded && (
                            <div>
                                {cartItems.cartItemResponses && cartItems.cartItemResponses.slice(1).map((item) => (
                                    <ProductInfo key={item.productId} image={item.images[0]} name={item.name} price={item.unitPrice} oldPrice={item.unitCost} quantity={item.quantity} />
                                ))}
                            </div>
                        )}
                        <div className="flex justify-center pb-2">
                            <button onClick={toggleExpand} className="text-blue-500 text-sm flex items-center ">
                                {isExpanded ? (
                                    <div className="flex items-center flex-row"><span>Thu gọn</span> <ChevronUpIcon className="w-4 h-4 ml-1" /></div>
                                ) : (
                                    <div className="flex items-center flex-row"><span>Xem thêm</span> <ChevronDownIcon className="w-4 h-4 ml-1" /></div>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg text-blue-500 font-semibold mb-2">Thông tin khách hàng</h3>
                        <div className="flex flex-col p-4 border border-gray-300 rounded-lg gap-2">
                            <LineContent label="Họ tên:" value={fullName} />
                            <LineContent label="Số điện thoại:" value={phone} />
                            <LineContent label="Email:" value={email} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg text-blue-500 font-semibold mb-2">Thông tin nhận hàng</h3>
                        {!isAddressValid && (
                            <div className="text-red-500 text-sm mb-2">
                                Vui lòng cung cấp đầy đủ thông tin nhận hàng.
                            </div>
                        )}
                        <div className="grid grid-cols-4 p-4 border border-gray-300 rounded-lg gap-2">
                            <SelectAddress 
                                selected={selectedCity} 
                                handleChange={handleCityChange} 
                                cities={cities} 
                                label="Chọn tỉnh/thành phố" 
                            />
                            <SelectAddress 
                                selected={selectedDistrict} 
                                handleChange={handleDistrictChange} 
                                cities={districts} 
                                label="Chọn quận/huyện" 
                            />

                            <select
                                className="border p-2 m-2 rounded col-span-2"
                                disabled={!selectedDistrict}
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}
                            >
                                <option value="" className="text-gray-500 text-sm">Chọn phường/xã</option>
                                {wards.map(ward => (
                                    <option key={ward.id} value={ward.id}>{ward.full_name}</option>
                                ))}
                            </select>
                            <input placeholder="Số nhà, tên đường" className="hover:bg-slate-100 outline-none p-2 m-2 rounded col-span-2 border border-gray-200" value={address.street} onChange={(e) => handleAddressChange(e.target.value)}></input>
                            <textarea placeholder="Ghi chú" className="hover:bg-slate-100 outline-none p-2 m-2 rounded col-span-4 border border-gray-200" value={address.note} onChange={(e) => setNote(e.target.value)}></textarea>
                        </div>
                    </div>

                    <Submit totalPrice={cartItems?.cartSummary?.totalPrice.toLocaleString()} toRoute={ROUTES.PAYMENT} titleSubmit="Tiếp tục" disabled={!isAddressValid} />
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo;