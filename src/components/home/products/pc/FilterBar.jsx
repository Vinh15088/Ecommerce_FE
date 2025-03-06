import { useState } from "react";
import { useNavigate } from "react-router-dom"
import ROUTES from "../../../../constants/Route";


const FilterBar = ({products, brands, brandName, onFilter, onBrandSelect}) => {
    const navigate = useNavigate();

    const [selectedBrand, setSelectedBrand] = useState(brandName);
    const [selectedNeed, setSelectedNeed] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedSortOrder, setSelectedSortOrder] = useState(null);

    const handleNeedClick = (need) => {
        setSelectedNeed(need);
    }

    const handlePriceRangeClick = (priceRange) => {
        setSelectedPriceRange(priceRange);
    }

    const handleSortOrderClick = (sortOrder) =>  {
        setSelectedSortOrder(sortOrder);
    }

    const handleApplyFilters = () => {
        let filteredProducts = products;
        if(selectedBrand) {
            filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
        }

        if (selectedNeed) {
            switch (selectedNeed) {
                case 'Văn phòng':
                    filteredProducts = filteredProducts.filter(product => product.category === 'Office PC');
                    break;
                case 'Gaming':
                    filteredProducts = filteredProducts.filter(product => product.category === 'Gaming PC');
                    break;
                case 'Đồ họa Kỹ thuật':
                    filteredProducts = filteredProducts.filter(product => product.category === 'Workstation PC');
                    break;  
                case 'Cao cấp':
                    filteredProducts = filteredProducts.filter(product => product.price >= 60000000);
                    break;
                
            }
        }

        if (selectedPriceRange) {
            switch (selectedPriceRange) {
                case 'Dưới 6 triệu':
                    filteredProducts = filteredProducts.filter(product => product.price < 6000000);
                    break;
                case 'Từ 6 - 10 triệu':
                    filteredProducts = filteredProducts.filter(product => product.price >= 6000000 && product.price <= 10000000);
                    break;
                case 'Từ 10 - 20 triệu':
                    filteredProducts = filteredProducts.filter(product => product.price >= 10000000 && product.price <= 20000000);
                    break;
                case 'Từ 20 - 40 triệu':
                    filteredProducts = filteredProducts.filter(product => product.price >= 20000000 && product.price <= 40000000);
                    break;
                case 'Trên 40 triệu':
                    filteredProducts = filteredProducts.filter(product => product.price > 40000000);
                    break;
            }
        }

        if (selectedSortOrder) {
            switch (selectedSortOrder) {
                case 'Giá tăng dần':
                    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'Giá giảm dần':
                    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
                    break;
            }
        }

        onFilter(filteredProducts);
        navigate(ROUTES.PAGE_PC, {
            state: {
                filteredProducts: filteredProducts,
                products: products,
                brands: brands,
                brandName: brandName
            }
        });
    }

    const handleClearFilters = async () => {
        let filteredProducts = products.filter(product => product.brand === brandName);

        setSelectedNeed(null);
        setSelectedPriceRange(null);
        setSelectedSortOrder(null);

        if(selectedBrand) {
            const brand = brands.find(brand => brand.name === selectedBrand);
            if(brand) {
                await onBrandSelect(brand.id);
            }
        } else {
            await onBrandSelect(null);
        }
        navigate(ROUTES.PAGE_PC, { 
            state: {
                filteredProducts: filteredProducts, 
                products: products, 
                brands: brands, 
                brandName: brandName} 
        });
    }

    const handleBrandClick = async (brand) => {
        setSelectedBrand(brand.name);
        await onBrandSelect(brand.id);

        setSelectedNeed(null);
        setSelectedPriceRange(null);
        setSelectedSortOrder(null);
    }

    return (
        <div className="pt-10 border-b border-gray-300 pb-4">
            <div className="flex justify-start mb-4 border-b border-gray-300">
                <div className="flex flex-row gap-2 items-center overflow-x-auto pb-3">
                    {brands.map((brand, index) => (
                        <div key={index} 
                            className={`flex items-center justify-center w-20 h-12 rounded-lg border  hover:border-blue-500 ${selectedBrand === brand.name ? 'border-2 border-blue-500 shadow-blue-400' : 'border-gray-300'}`} 
                            onClick={() => handleBrandClick(brand)}
                        >
                            <img src={brand.url_logo} alt={brand.name} className="h-full object-contain" /> 
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-start mb-4">
                <div className='flex flex-col'>
                    <span className='text-sm font-bold text-blue-500'>Nhu cầu</span>
                    <div className='flex flex-wrap'> 
                        {['Văn phòng', 'Gaming', 'Đồ họa Kỹ thuật', 'Cao cấp'].map((need) => (
                            <button key={need} 
                                onClick={() => handleNeedClick(need)}
                                className={`m-1 text-sm text-gray-500 px-4 py-1 bg-gray-200 rounded-full hover:bg-blue-200 hover:text-blue-500 hover:outline-none hover:outline-blue-500 ${selectedNeed === need ? 'border-2 border-blue-500 shadow-blue-400' : ''}`}
                            >
                                {need}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start mb-4">
                <div className='flex flex-col'>
                    <span className='text-sm font-bold text-blue-500'>Mức giá</span>
                    <div className='flex flex-wrap'> 
                        {['Dưới 6 triệu', 'Từ 6 - 10 triệu', 'Từ 10 - 20 triệu', 'Từ 20 - 40 triệu', 'Trên 40 triệu'].map((price) => (
                            <button key={price} 
                                onClick={() => handlePriceRangeClick(price)}
                                className={`m-1 text-sm text-gray-500 px-4 py-1 bg-gray-200 rounded-full hover:bg-blue-200 hover:text-blue-500 hover:outline-none hover:outline-blue-500 ${selectedPriceRange === price ? 'border-2 border-blue-500 shadow-blue-400' : ''}`}
                            >
                                {price}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start mb-4">
                <div className='flex flex-col'>
                    <span className='text-sm font-bold text-blue-500'>Sắp xếp theo</span>
                    <div className='flex flex-wrap'> 
                        {['Giá tăng dần', 'Giá giảm dần'].map((sort) => (
                            <button key={sort} 
                                onClick={() => handleSortOrderClick(sort)}
                                className={`m-1 text-sm text-gray-500 px-4 py-1 bg-gray-200 rounded-full hover:bg-blue-200 hover:text-blue-500 hover:outline-none hover:outline-blue-500 ${selectedSortOrder === sort ? 'border-2 border-blue-500 shadow-blue-400' : ''}`}
                            >
                                {sort}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={handleApplyFilters} className="px-4 py-2 bg-blue-500 rounded-lg text-white mr-4 hover:bg-blue-600">Áp dụng</button>
            <button onClick={handleClearFilters} className="px-4 py-2 bg-red-200 rounded-lg text-red-500 hover:bg-red-400 hover:text-white">Xóa bỏ</button>
        </div>
    );
}

export default FilterBar;