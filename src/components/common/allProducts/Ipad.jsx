import Product from "./Product";
import ROUTES  from "../../../constants/Route";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { NavbarContext } from '../../../context/NavbarContext';
import ProductApiService from "../../../service/ProductApiService";

const Ipads = () => {
    const navigate = useNavigate();
    const [ipads, setIpads] = useState([]);
    const [ipadCategories] = useState(29);

    useEffect(() => {
        fetchIpads();
    }, []);

    const fetchIpads = async () => {
        try {
            const data = await ProductApiService.getAllPageProductByCategoryAndBrand(1, 10, ipadCategories, null, null, null);
            setIpads(data.content);
            console.log(data);
        } catch (error) {
            console.error("Error fetching ipads: ", error);
        }
    }

    const handleViewAllClick = () => {
        navigate(ROUTES.PAGE_IPAD, { state: {filteredProducts: ipads , products: ipads} });
    };
    
    const handleProductClick = (productId) => {
        navigate(ROUTES.PAGE_SINGLE_PRODUCT.replace(':id', productId), { state: { product: ipads.find(product => product.id === productId) } });
    };


    const { refreshCart } = useContext(NavbarContext);

    return (
        <div className="grid grid-cols-12 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-2 col-span-10 flex flex-col mb-20 gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                    <h2 className="text-2xl font-bold text-blue-500">Ipad nổi bật</h2>
                    <div className="flex flex-row gap-2 justify-end overflow-x-auto">
                        <button onClick={() => handleViewAllClick()} className="text-white bg-blue-500 hover:bg-blue-600 hover:border-1 hover:border-slate-800 px-4 py-2 rounded-full">
                            Xem tất cả
                       </button>
                    </div>
                </div>

                <div className="flex overflow-x-auto w-full mt-5">
                    <div className="flex flex-row justify-between w-full gap-1">
                        {ipads.map((product, index) => (
                            <div className="flex-none w-1/5" style={{height: 'auto'}} key={index} onClick={() => handleProductClick(product.id)}> 
                                <Product product={product} refreshCart={refreshCart}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Ipads;

