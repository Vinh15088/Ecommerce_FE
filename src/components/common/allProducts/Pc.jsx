import Product from "./Product";
import ROUTES  from "../../../constants/Route";
import { useNavigate } from "react-router-dom";
import BrandService from "../../../service/BrandApiService";
import { useEffect, useState, useContext } from "react";
import { NavbarContext } from '../../../context/NavbarContext';
import ProductApiService from "../../../service/ProductApiService";

const Pc = () => {
    const [pc, setPc] = useState([]);
    const [pcBrands] = useState(null);
    const [pcCategories] = useState(2);
    const [minPrice] = useState(null);
    const [maxPrice] = useState(null);

    useEffect(() => {
        fetchPc();
    }, [pcBrands, minPrice, maxPrice]);

    const fetchPc = async () => {
        try {
            const data = await ProductApiService.getAllPageProductByCategoryAndBrand(1, 10, pcCategories, pcBrands, minPrice, maxPrice);
            setPc(data.content);
            console.log(data);
        } catch (error) {
            console.error("Error fetching Pc: ", error);
        }
    }

    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);

    const handleViewAllClick = () => {
        navigate(ROUTES.PAGE_PC, { state: {filteredProducts: pc , products: pc, brands: brands} });
    };
    
    const handleProductClick = (productId) => {
        navigate(ROUTES.PAGE_SINGLE_PRODUCT.replace(':id', productId), { state: { product: pc.find(product => product.id === productId) } });
    };

    const handleBrandClick = (brandName, brandId) => {
        navigate(ROUTES.PAGE_PC.replace(':category', `laptop`), { state: { brandName: brandName, brandId: brandId } });
    }

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const data = await BrandService.getAllBrand();
            setBrands(data.content);
            console.log(data);
        } catch (error) {
            console.error("Error fetching brands: ", error);
        }
    };

    const { refreshCart } = useContext(NavbarContext);

    return (
        <div className="grid grid-cols-12 gap-4 pt-5 border-t-2 border-gray-300">
            <div className="col-start-2 col-span-10 flex flex-col mb-20 gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                    <h2 className="text-2xl font-bold text-blue-500">PC nổi bật</h2>
                    <div className="flex flex-row gap-2 justify-end overflow-x-auto">
                        <div className="flex flex-row gap-1 items-center overflow-x-auto">
                            {brands.map((brand, index) => (
                                <div key={index} className="flex items-center justify-center w-14 h-8 rounded-lg border border-gray-300 hover:border-blue-500" 
                                    onClick={() => handleBrandClick(brand.name, brand.id)}>
                                    <img src={brand.url_logo} alt={brand.name} className="h-full object-contain" />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleViewAllClick()} className="text-white bg-blue-500 hover:bg-blue-600 hover:border-1 hover:border-slate-800 px-4 py-2 rounded-full">
                            Xem tất cả
                       </button>
                    </div>
                </div>

                <div className="flex overflow-x-auto w-full mt-5">
                    <div className="flex flex-row justify-between w-full gap-1">
                        {pc.map((product, index) => (
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

export default Pc;

