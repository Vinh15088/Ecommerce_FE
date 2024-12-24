import { ArchiveBoxXMarkIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddBrandModal from './AddBrandModal';
import {Pagination} from '../common/PaginationTable';

function BrandTable({brands, pageInfo, onPageChange, onSearch, refreshData}) {
    const itemIconClass = "w-8 h-8 lg:w-7 lg:h-7";

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleFilter = () => {
        onSearch(searchKeyword);
    };

    const handleReset = () => {
        setSearchKeyword('');
        onSearch('');
    }

    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        setIsEditModalOpen(true);
    }

    const handleDelete = (brand) => {
        setSelectedBrand(brand);
        setIsDeleteModalOpen(true);
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        refreshData();
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        refreshData();
    }

    const closeAddBrandModal = () => {
        setIsAddModalOpen(false);
        refreshData();
    }


    return (
        <div className="flex flex-col">
            {/*Add Brand Buttons */}
            <div className="flex gap-4 mb-4 mt-15 px-5 py-8 bg-white rounded-lg">
                <button 
                    className="p-2 text-white rounded-lg flex items-center gap-2 border bg-green-500 hover:bg-green-600"
                    onClick={() => setIsAddModalOpen(true)}    
                >
                    <PlusIcon className={itemIconClass} />
                    <span> Thêm nhãn hàng</span>
                </button>
            </div>

            {/* Search and Filter */}
            <div className="gap-2 grid grid-cols-5 mb-4  bg-white mt-15 px-5 py-10 rounded-lg">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên" 
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="col-span-3 p-2 border bg-slate-100 hover:bg-slate-200  rounded-lg w-full"
                />
                <button onClick={handleFilter} className="col-span-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">Tìm kiếm</button>
                <button onClick={handleReset} className="col-span-1 bg-red-400 hover:bg-red-500 p-2 rounded-lg">Hủy</button>
            </div>

            {/* Table */}
            <div className='border border-gray-300 rounded-lg shadow-md'>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-400 text-left">
                            <th className="p-2 border-b font-semibold">ID</th>
                            <th className="p-2 border-b font-semibold">TÊN</th>
                            <th className="p-2 border-b font-semibold">LOGO</th>
                            <th className="p-2 border-b font-semibold">ẢNH</th>
                            <th className="p-2 border-b font-semibold">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {brands.map((brand, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-left">
                                <td className="p-2 border-b">{brand.id}</td>
                                <td className="p-2 border-b">{brand.name}</td>
                                <td className="p-2 border-b">{brand.logo}</td>
                                <td className="p-2 border-b">
                                    <div className="w-20 h-12 flex items-center justify-center">
                                        <img 
                                            src={brand.url_logo} 
                                            alt={`${brand.name} logo`} 
                                            className="h-full object-contain" 
                                        />
                                    </div>
                                </td>
                                <td className="p-2 border-b">
                                    <div className='flex justify-start items-center space-x-2'> 
                                        <button onClick={() => handleEdit(brand)} className="text-green-500 hover:text-green-600" title="Edit">
                                            <PencilSquareIcon className={itemIconClass} />
                                        </button>
                                        <button onClick={() => handleDelete(brand)} className="text-red-400 hover:text-red-500" title="Delete">
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

            {/* Edit, Delete, Add modal */}
            {isEditModalOpen && (
                <EditModal brand={selectedBrand} onClose={closeEditModal} />
            )}
            {isDeleteModalOpen && (
                <DeleteModal brand={selectedBrand} onClose={closeDeleteModal} />
            )}
            {isAddModalOpen && (
                <AddBrandModal onClose={closeAddBrandModal} />
            )}

        </div>
    );
}

export default BrandTable;
