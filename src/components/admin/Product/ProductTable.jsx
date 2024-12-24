import { ArchiveBoxXMarkIcon, ChevronDownIcon, MagnifyingGlassCircleIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/16/solid';
import React, {useMemo, useEffect, useState, useRef } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddProductModal from './AddProductModal';
import CategoryService from '../../../service/CategoryApiService';
import BrandService from '../../../service/BrandApiService';
import FilterModal from './FilterModal';
import DetailModal from './DetailModal';
import {Pagination} from '../common/PaginationTable';

const priceOptions = [
    {name: "Từ thấp đến cao", value: 'asc'},
    {name: "Từ cao đến thấp", value: 'desc'}
];
function ProductTable({products, pageInfo, onPageChange, onSearch, refreshData, sidebarWidth, onChangeCategory, onChangeBrand}) {
    const itemIconClass = "w-8 h-8 lg:w-7 lg:h-7";

    // filter
    const categoryButtonRef = useRef(null);
    const brandButtonRef = useRef(null);
    const priceButtonRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    
    const [selectedProduct, setSelectedProduct] = useState(null);

    // action with product
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [openModal, setOpenModal] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


    useEffect(() => {
        fetchCategories();
        fetchBrands();

    }, [openModal]);

    const fetchCategories = async () => {
        try {
            const data = await CategoryService.getAllCategory();
            setCategories(data.content);
        } catch(error) {
            console.error("Error fetching categories: ", error);
        }
    }

    const fetchBrands = async () => {
        try {
            const data = await BrandService.getAllBrand();
            setBrands(data.content);
        } catch(error) {
            console.error("Error fetching brands: ", error);
        }
    }

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleFilter = () => {
        onSearch(searchKeyword);
    };

    const handleReset = () => {
        setSearchKeyword('');
        setSelectedCategory(null);
        setSelectedBrand(null);
        setSelectedPrice(null);
        onSearch('');
        onChangeCategory(null);
        onChangeBrand(null);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDetail = (product) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        refreshData();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        refreshData();
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const closeAddProductModal = () => {
        setIsAddModalOpen(false);
        refreshData();
    };

    const handleFilterSelect = (filterType, option) => {
        setOpenModal(null);
    
        if (filterType === 'category') {
            console.log("Category selected:", option);
            setSelectedCategory(option);
            onChangeCategory(option);
        }
    
        if (filterType === 'brand') {
            console.log("Brand selected:", option);
            setSelectedBrand(option);
            onChangeBrand(option);
        }
    
        if (filterType === 'price') {
            console.log("Price selected:", option);
            setSelectedPrice(option.name);
            onSearch('', option.value);
        }
    };    

    const togglePublished = async (product) => {
        const updatedProduct = {...product, enabled: !product.enabled};

        try {
            await CategoryService.updateCategory(updatedProduct.id, updatedProduct);
            console.log("Update category success: {}", updatedProduct);
            refreshData();
        } catch (error) {
            console.error("Error updating category: ", error);
        }
    };

    const toggleModal = (modalType, buttonRef) => {
        if (openModal === modalType) {
            setOpenModal(null);
        } else {
            const rect = buttonRef.current.getBoundingClientRect();

            setModalPosition({
                top: rect.bottom + window.scrollY + 4, 
                left: rect.left + window.scrollX - sidebarWidth,
                width: rect.width
            });
            setOpenModal(modalType);
        }
    };

    const sortedProducts = useMemo(() => {
        if (!selectedPrice) return products; 
        
        return [...products].sort((a, b) => {
            if (selectedPrice === "Từ thấp đến cao") return a.price - b.price;
            else if (selectedPrice === "Từ cao đến thấp") return b.price - a.price; 
            
            return 0;
        });
    }, [products, selectedPrice]);
    

    return (
        <div className="flex flex-col">
            {/* Export & Import, Add Brand Buttons */}
            <div className="flex gap-4 mb-4 mt-15 px-5 py-8 bg-white rounded-lg">
                <button 
                    className="p-2 text-white rounded-lg flex items-center gap-2 border bg-green-500 hover:bg-green-600"
                    onClick={() => setIsAddModalOpen(true)}    
                >
                    <PlusIcon className={itemIconClass} />
                    <span> Thêm sản phẩm</span>
                </button>
            </div>

            {/* Search and Filter */}
            <div className="gap-2 grid grid-cols-5 mb-4  bg-white mt-15 px-5 py-10 rounded-lg">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên" 
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="col-span-3 p-2 border bg-slate-100  rounded-lg w-full"
                />          
                <button onClick={handleFilter} className="col-span-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">Tìm kiếm</button>
                <button onClick={handleReset} className="col-span-1 bg-red-400 hover:bg-red-500 p-2 rounded-lg">Hủy</button>
                <button 
                    ref={categoryButtonRef} 
                    onClick={() => toggleModal('category', categoryButtonRef)} 
                    className={`flex items-center justify-between col-span-1 p-2 rounded-lg ${
                        openModal === 'category' ? 'bg-slate-300 text-black' : 'bg-gray-200 text-black'
                    }`}
                >
                    <span>{selectedCategory || 'Danh mục'}</span>
                    <ChevronDownIcon className={itemIconClass} />
                </button>
                <button 
                    ref={brandButtonRef} 
                    onClick={() => toggleModal('brand', brandButtonRef)} 
                    className={`flex items-center justify-between col-span-1 p-2 rounded-lg ${
                        openModal === 'brand' ? 'bg-slate-300 text-black' : 'bg-gray-200 text-black'
                    }`}
                >
                    <span>{selectedBrand || 'Nhãn hàng'}</span>
                    <ChevronDownIcon className={itemIconClass} />
                </button>
                <button 
                    ref={priceButtonRef} 
                    onClick={() => toggleModal('price', priceButtonRef)} 
                    className={`flex items-center justify-between col-span-1 p-2 rounded-lg ${
                        openModal === 'price' ? 'bg-slate-300 text-black' : 'bg-gray-200 text-black'
                    }`}
                >
                    <span>{selectedPrice || 'Giá'}</span>
                    <ChevronDownIcon className={itemIconClass} />
                </button>
            </div>


            {/* Table */}
            <div className='border border-gray-300 rounded-lg shadow-md'>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-400 text-left">
                            <th className="p-2 border-b font-semibold">TÊN SẢN PHẨM</th>
                            <th className="p-2 border-b font-semibold">SKU</th>
                            <th className="p-2 border-b font-semibold">DANH MỤC</th>
                            <th className="p-2 border-b font-semibold">NHÃN HÀNG</th>
                            <th className="p-2 border-b font-semibold">GIÁ</th>
                            <th className="p-2 border-b font-semibold">GIÁ SALE</th>
                            <th className="p-2 border-b font-semibold">SỐ LƯỢNG</th>
                            <th className="p-2 border-b font-semibold">TRẠNG THÁI</th>
                            <th className="p-2 border-b font-semibold">PUBLISHED</th>
                            <th className="p-2 border-b font-semibold">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {sortedProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 text-left">
                                    <td className="p-2 border-b">{product.name}</td>
                                    <td className="p-2 border-b">{product.sku}</td>
                                    <td className="p-2 border-b">{product.category}</td>
                                    <td className="p-2 border-b">{product.brand}</td>
                                    <td className="p-2 border-b">{product.cost}</td>
                                    <td className="p-2 border-b">{product.price}</td>
                                    <td className="p-2 border-b">{product.stock}</td>
                                    <td className="p-2 border-b">
                                        {product.stock === 0 ? (
                                            <span className="px-3 py-1 bg-red-100 text-red-500 rounded-2xl">Hết hàng</span>
                                        ) : (
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-2xl">Đang bán</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={product.active}
                                            onChange={() => togglePublished(product)}
                                            className="toggle-checkbox size-4 ml-5"
                                        />
                                    </td>
                                    <td className="p-2 border-b">
                                        <div className="flex justify-start items-center space-x-2"> 
                                            <button onClick={() => handleDetail(product)}  className="text-gray-300 hover:text-gray-500" title="Thông tin chi tiết">
                                                <MagnifyingGlassCircleIcon className={itemIconClass} />
                                            </button>
                                            <button onClick={() => handleEdit(product)} className="text-green-500 hover:text-green-600" title="Chỉnh sửa">
                                                <PencilSquareIcon className={itemIconClass} />
                                            </button>
                                            <button onClick={() => handleDelete(product)} className="text-red-400 hover:text-red-500" title="Xóa">
                                                <ArchiveBoxXMarkIcon className={itemIconClass} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
            </div>

            {/* Detail, Edit, Delete, Add modal */}
            {isDetailModalOpen && (
                <DetailModal product={selectedProduct} onClose={closeDetailModal} />
            )}
            {isEditModalOpen && (
                <EditModal product={selectedProduct} onClose={closeEditModal} />
            )}
            {isDeleteModalOpen && (
                <DeleteModal product={selectedProduct} onClose={closeDeleteModal} />
            )}
            {isAddModalOpen && (
                <AddProductModal onClose={closeAddProductModal}/>
            )}

            {openModal === 'category' && (
                <FilterModal
                    options={categories}
                    onSelect={(option) => handleFilterSelect('category', option.name)}
                    onClose={() => setOpenModal(null)}
                    title="Danh mục"
                    buttonRef={categoryButtonRef}
                    position={modalPosition}
                />
            )}
            {openModal === 'brand' && (
                <FilterModal
                    options={brands}
                    onSelect={(option) => handleFilterSelect('brand', option.name)}
                    onClose={() => setOpenModal(null)}
                    title="Nhãn hàng"
                    buttonRef={brandButtonRef}
                    position={modalPosition}
                />
            )}
            {openModal === 'price' && (
                <FilterModal
                    options={priceOptions}
                    onSelect={(option) => handleFilterSelect('price', option)}
                    onClose={() => setOpenModal(null)}
                    title="Giá"
                    buttonRef={priceButtonRef}
                    position={modalPosition}
                />
            )}

        </div>
    );
}

export default ProductTable;