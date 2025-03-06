import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../constants/Route';

const FilterBar = ({products, onFilter}) => {
    const navigate = useNavigate();

    const [selectedNeed, setSelectedNeed] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedSortOrder, setSelectedSortOrder] = useState(null);

    const handleNeedClick = (need) => {
        setSelectedNeed(need);
    }

    const handlePriceRangeClick = (priceRange) => {
        setSelectedPriceRange(priceRange);
    }

    const handleSortOrderClick = (sortOrder) => {
        setSelectedSortOrder(sortOrder);
    }

    const handleApplyFilters = () => {
        let filteredProducts = [...products];

        if (selectedNeed) {
            switch (selectedNeed) {
                case 'MacBook Air':
                    filteredProducts = filteredProducts.filter(product => 
                        product.name.toLowerCase().includes('air'));
                    break;
                case 'MacBook Pro':
                    filteredProducts = filteredProducts.filter(product => 
                        product.name.toLowerCase().includes('pro'));
                    break;
                case 'Chip M1':
                    filteredProducts = filteredProducts.filter(product => 
                        product.name.toLowerCase().includes('m1'));
                    break;
                case 'Chip M2':
                    filteredProducts = filteredProducts.filter(product => 
                        product.name.toLowerCase().includes('m2'));
                    break;
            }
        }

        if (selectedPriceRange) {
            switch (selectedPriceRange) {
                case 'Dưới 20 triệu':
                    filteredProducts = filteredProducts.filter(product => 
                        product.price < 20000000);
                    break;
                case 'Từ 20 - 30 triệu':
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= 20000000 && product.price <= 30000000);
                    break;
                case 'Từ 30 - 50 triệu':
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= 30000000 && product.price <= 50000000);
                    break;
                case 'Trên 50 triệu':
                    filteredProducts = filteredProducts.filter(product => 
                        product.price > 50000000);
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
        navigate(ROUTES.PAGE_MACBOOK, { 
            state: { filteredProducts: filteredProducts }
        });
    }

    const handleClearFilters = () => {
        setSelectedNeed(null);
        setSelectedPriceRange(null);
        setSelectedSortOrder(null);
        onFilter(products);
    }

    return (
        <div className="pt-10 border-b border-gray-300 pb-4">
            <div className="flex flex-wrap justify-start mb-4">
                <div className='flex flex-col'>
                    <span className='text-sm font-bold text-blue-500'>Mức giá</span>
                    <div className='flex flex-wrap'> 
                        {['Dưới 20 triệu', 'Từ 20 - 30 triệu', 'Từ 30 - 50 triệu', 'Trên 50 triệu'].map((price) => (
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
};

export default FilterBar;