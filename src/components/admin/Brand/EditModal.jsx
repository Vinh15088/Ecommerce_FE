import { useState } from "react";
import BrandService from "../../../service/BrandApiService";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function EditModal({brand, onClose}) {
    
    const [brandData, setBrandData] = useState({
        name: brand?.name || '',
        logo: brand?.logo || '',
        url_logo: brand?.url_logo || '',
    });


    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBrandData((prevData) => ({...prevData, [name]: value}));

        console.log(brandData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await BrandService.updateBrand(
                brand.id, 
                {name: brandData.name},
                imageFile 
            );

            showSuccessToast("Cập nhật nhãn hàng thành công!");
            console.log("Update brand success:", response);
            onClose(); 
        } catch (error) {
            console.error("Update failed:", error);
            showErrorToast("Cập nhật nhãn hàng thất bại!")
            setError("Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="flex flex-col fixed top-0 right-0 2xl:w-1/3 xl:w-1/2 lg:w-1/2 h-full bg-white shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="p-8 bg-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Cập nhật nhãn hàng</h2>
                        <p className="text-gray-500 mb-6">Cập nhật nhãn hàng với những thông tin cần thiết bên dưới</p>
                    </div>

                    <button onClick={onClose} className="text-red-400 hover:text-gray-400 font-bold text-2xl float-right rounded-full w-10 h-10 hover:bg-red-300">
                    ×
                    </button>
                </div>

                {/* body */}
                <form onSubmit={handleUpdate} className="flex-1 p-8 bg-white space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 ">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={brandData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo</label>
                        <input
                            type="text"
                            name="logo"
                            value={brandData.logo}
                            disabled
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ảnh</label>
                        
                        <div className="flex items-center space-x-4 mt-2">
                            {/* Hiển thị ảnh hiện tại hoặc ảnh xem trước */}
                            <div className="relative h-32 w-18 bg-gray-100 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={imageFile ? URL.createObjectURL(imageFile) : brandData.url_logo}
                                    alt={`${brandData.name} logo`}
                                    className=" h-full object-contain"
                                />
                                {imageFile && (
                                    <span className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer shadow" onClick={() => setImageFile(null)}>
                                        <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </div>

                            {/* Nút chọn ảnh */}
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
    
                        {/* Hiển thị lỗi khi cần */}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>


                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>

                {/* button cancel, update */}
                <div className="flex justify-between p-8 bg-gray-100 space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 w-full bg-white text-red-500 rounded-md hover:bg-red-300 focus:outline-none"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 w-full bg-green-400 text-white rounded-md hover:bg-green-600 focus:outline-none"
                        disabled={loading}     
                        onClick={handleUpdate}               >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật nhãn hàng'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;