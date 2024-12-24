import { useState, useEffect } from "react";
import CategoryService from "../../../service/CategoryApiService";
import { FooterModal } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function AddCategoryModal({ onClose}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await CategoryService.getAllParentCategory();

            setCategories(data.content);
        } catch(error) {
            console.error("Error fetching users: ", error);
        }
    }
    
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        enabled: 'true',
        parent_id: '',
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategoryData((prevData) => ({...prevData, [name]: value}));

        console.log(categoryData);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await CategoryService.createCategory(categoryData);
    
            console.log("Create Category success:", response);
            showSuccessToast("Tạo danh mục thành công!")
            onClose(); 
        } catch (error) {
            console.error("Create failed:", error);
            showErrorToast("Tạo danh mục thất bại!")
            setError("Create failed. Please try again.");
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
                        <h2 className="text-2xl font-semibold mb-2">Tạo danh mục</h2>
                        <p className="text-gray-500 mb-6">Tạo danh mục với thông tin cần thiết ở dưới</p>
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
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Category's name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <input
                            type="text"
                            name="description"     
                            onChange={handleChange}                      
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Description"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Published</label>
                        <select
                            name="enabled"
                            value={categoryData.enabled}
                            onChange={(e) => setCategoryData((prevData) => ({ 
                                ...prevData, 
                                enabled: e.target.value === "false" ? false : true 
                            }))}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Danh mục cha</label>
                        <select
                            name="parent"
                            value={categoryData.parent}
                            onChange={(e) => setCategoryData((prevData) => ({ ...prevData, parent_id: e.target.value }))}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        >
                            <option value="">None</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
               
                <FooterModal name="danh mục" onClose={onClose} loading={loading} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default AddCategoryModal;