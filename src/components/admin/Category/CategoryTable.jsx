import { ArchiveBoxXMarkIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddCategoryModal from './AddCategoryModal';
import CategoryService from '../../../service/CategoryApiService';
import {Pagination} from '../common/PaginationTable';


function CategoryTable({categories, pageInfo, onPageChange, onSearch, refreshData}) {
    const itemIconClass = "w-8 h-8 lg:w-7 lg:h-7";

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(true);


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

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    }

    const handleDelete = (category) => {
        setSelectedCategory(category);
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

    const closeAddCategoryModal = () => {
        setIsAddModalOpen(false);
        refreshData();
    }

    const togglePublished = async (category) => {
        const updatedCategory = {...category, enabled: !category.enabled};

        try {
            await CategoryService.updateCategory(updatedCategory.id, updatedCategory);
            console.log("Update category success: {}", updatedCategory);

            refreshData();
        } catch (error) {
            console.error("Error updating category: ", error);
        }

    }

    const toggleCategoryView = () => {
        setShowAllCategories(!showAllCategories);
    }


    return (
        <div className="flex flex-col">
            {/* Export & Import, Add Brand Buttons */}
            <div className="flex gap-4 mb-4 mt-15 px-5 py-8 bg-white rounded-lg">
                <button 
                    className="p-2 text-white rounded-lg flex items-center gap-2 border bg-green-500 hover:bg-green-600"
                    onClick={() => setIsAddModalOpen(true)}    
                >
                    <PlusIcon className={itemIconClass} />
                    <span> Thêm danh mục</span>
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

            {/* Show all or parents only */}
            <div className="flex justify-end px-5 py-5 mb-4">
                <span className="mr-3 relative inline-flex items-center text-sm font-medium text-gray-900">
                    {showAllCategories ? "Tất cả" : "Chỉ danh mục cha"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={showAllCategories}
                        onChange={toggleCategoryView}
                    />
                    <div className="w-24 h-8 bg-gray-200 rounded-full peer dark:bg-green-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-11 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    
                </label>
            </div>   

            {/* Table */}
            <div className='border border-gray-300 rounded-lg shadow-md'>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-400 text-left">
                            <th className="p-2 border-b font-semibold">ID</th>
                            <th className="p-2 border-b font-semibold">TÊN</th>
                            <th className="p-2 border-b font-semibold">MÔ TẢ</th>
                            <th className="p-2 border-b font-semibold">PUBLISHED</th>
                            <th className="p-2 border-b font-semibold">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {categories.map((parentCategory, index) => (
                                <tr key={index} className="hover:bg-gray-50 text-left">
                                    <td className="p-2 border-b">{parentCategory.id}</td>
                                    <td className="p-2 border-b">
                                        <div className="font-semibold">{parentCategory.name}</div>
                                        {showAllCategories && parentCategory.children.map((child, i) => (
                                            <div key={i} className="pl-4">• {child.name}</div>
                                        ))}
                                    </td>
                                    <td className="p-2 border-b">{parentCategory.description}</td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={parentCategory.enabled}
                                            onChange={() => togglePublished(parentCategory)}
                                            className="toggle-checkbox size-4 ml-5"
                                        />
                                    </td>
                                    <td className="p-2 border-b">
                                        <div className="flex justify-start items-center space-x-2"> 
                                            <button onClick={() => handleEdit(parentCategory)} className="text-green-500 hover:text-green-600" title="Chỉnh sửa">
                                                <PencilSquareIcon className={itemIconClass} />
                                            </button>
                                            <button onClick={() => handleDelete(parentCategory)} className="text-red-400 hover:text-red-500" title="Xóa">
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
                <EditModal category={selectedCategory} onClose={closeEditModal} />
            )}
            {isDeleteModalOpen && (
                <DeleteModal category={selectedCategory} onClose={closeDeleteModal} />
            )}
            {isAddModalOpen && (
                <AddCategoryModal onClose={closeAddCategoryModal}/>
            )}

        </div>
    );
}

export default CategoryTable;