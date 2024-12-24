import { ArchiveBoxXMarkIcon, MagnifyingGlassCircleIcon, PencilSquareIcon} from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import DetailModal from "./DetailModal";
import {Pagination} from '../common/PaginationTable';


function CustomerTable({users, pageInfo, onPageChange, onSearch, refreshData}) {
    const itemIconClass = "w-8 h-8 lg:w-7 lg:h-7";

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    }

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    }

    const handleDetail = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        refreshData();
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        refreshData();
    }

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    }

    return (
        <div className="flex flex-col">
            {/* Search and Filter */}
            <div className="gap-2 grid grid-cols-5 mb-4  bg-white mt-15 px-5 py-10 rounded-lg">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên/ email/ số điện thoại" 
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="col-span-3 p-2 border bg-slate-100 hover:bg-slate-200  rounded-lg w-full"
                />
                <button onClick={handleFilter} className="col-span-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">Tìm kiếm</button>
                <button onClick={handleReset} className="col-span-1 bg-red-400 hover:bg-red-500 p-2 rounded-lg">Hủy</button>
            </div>

            {/* Table */}
            <div className='border border-gray-300 rounded-lg shadow-md overflow-hidden'>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-400 text-left">
                            <th className="p-2 border-b font-semibold">ID</th>
                            <th className="p-2 border-b font-semibold">HỌ VÀ TÊN</th>
                            <th className="p-2 border-b font-semibold">NGÀY SINH</th>
                            <th className="p-2 border-b font-semibold">EMAIL</th>
                            <th className="p-2 border-b font-semibold">SỐ ĐIỆN THOẠI</th>
                            <th className="p-2 border-b font-semibold">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-left">
                                <td className="p-2 border-b">{user.id}</td>
                                <td className="p-2 border-b">{user.fullName}</td>
                                <td className="p-2 border-b">{user.dob}</td>
                                <td className="p-2 border-b">{user.email}</td>
                                <td className="p-2 border-b">{user.phoneNumber}</td>
                                <td className="p-2 border-b">
                                    <div className='flex justify-start items-center space-x-2'> 
                                        <button onClick={() => handleDetail(user)} className="text-gray-300 hover:text-gray-500" title="Thông tin chi tiết">
                                            <MagnifyingGlassCircleIcon className={itemIconClass} />
                                        </button>
                                        <button onClick={() => handleEdit(user)} className="text-green-400 hover:text-green-600" title="Chỉnh sửa">
                                            <PencilSquareIcon className={itemIconClass} />
                                        </button>
                                        <button onClick={() => handleDelete(user)} className="text-red-400 hover:text-red-500" title="Xóa người dùng">
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

            {/* Edit, Delete, Detail modal */}
            {isEditModalOpen && (
                <EditModal user={selectedUser} onClose={closeEditModal} />
            )}

            {isDeleteModalOpen && (
                <DeleteModal user={selectedUser} onClose={closeDeleteModal} />
            )}

            {isDetailModalOpen && (
                <DetailModal user={selectedUser} onClose={closeDetailModal} />
            )}

        </div>
    );
}

export default CustomerTable;
