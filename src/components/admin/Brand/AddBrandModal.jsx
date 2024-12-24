import React, { useState } from 'react';
import BrandService from '../../../service/BrandApiService';
import { FooterModal } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from '../../common/toastUtils';

function AddBrandModal({ onClose, onAdd }) {
    const [brandData, setBrandData] = useState({ name: '', url_logo: '' });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setBrandData({ ...brandData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setBrandData({ ...brandData, url_logo: URL.createObjectURL(file) });
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(imageFile);
            const response = await BrandService.createBrand(
                {name: brandData.name},
                imageFile
            );

            showSuccessToast("Thêm nhãn hàng thành công!");
            onClose();
        } catch (error) {
            console.error("Create brand failed: ", error);
            showErrorToast("Thêm nhãn hàng thất bại!");
            setError("Create failed. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-lg shadow-lg z-50 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Thêm nhãn hàng</h2>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-gray-400 font-bold text-2xl rounded-full w-10 h-10 hover:bg-red-300"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleAddBrand} className="space-y-4 mt-4 pb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={brandData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Brand's name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ảnh</label>
                        <div className="flex items-center space-x-4 mt-2">
                            {/* Preview image */}
                            <div className="relative h-32 w-32 bg-gray-100 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={imageFile ? URL.createObjectURL(imageFile) : brandData.url_logo}
                                    alt="Brand logo preview"
                                    className="h-full w-full object-contain"
                                />
                                {/* Remove image */}
                                {imageFile && (
                                    <span
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer shadow"
                                        onClick={() => setImageFile(null)}
                                    >
                                        <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>

                            {/* Choose image button */}
                            <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
                                Chọn ảnh
                                <input
                                    type="file"
                                    name="url_logo"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </form>

                {/* Action buttons */}
                <FooterModal name="nhãn hàng" onClose={onClose} loading={loading} handleUpdate={handleAddBrand} />
            </div>
        </div>
    );
}

export default AddBrandModal;
