import { useState } from "react";
import CategoryService from "../../../service/CategoryApiService";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function EditModal({category, onClose}) {
    
    const [categoryData, setCategoryData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        enabled: category?.enabled ?? true
    });

    const [selectChildren, setSelectedChildren] = useState(
        category.children ? category.children.map((cat) => cat.id) : []
    );


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategoryData((prevData) => ({...prevData, [name]: value}));

        console.log(categoryData);
    };

    const handleChildrenToggle = (childId) => {
        setSelectedChildren((prevSelected) => 
            prevSelected.includes(childId)
                ? prevSelected.filter((id) => id !== childId)
                : [...prevSelected, childId]  
        );
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await CategoryService.updateCategory(category.id, categoryData);

            const childrenToUpdate = category.children.filter(
                (child) => !selectChildren.includes(child.id)
            );

            console.log("childrenToUpdate: {}", childrenToUpdate);

            for(const child of childrenToUpdate) {
                console.log(child);
                await CategoryService.updateCategory(child.id, {
                    ...child,
                    parent_id: null
                });
            }
            showSuccessToast("Cập nhật danh mục thành công!")
    
            console.log("Update category success:", response);
            onClose(); 
        } catch (error) {
            console.error("Update failed:", error);
            showErrorToast("Cập nhật danh mục thất bại!")
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
                        <h2 className="text-2xl font-semibold mb-2">Cập nhật danh mục</h2>
                        <p className="text-gray-500 mb-6">Cập nhật danh mục với thông tin cần thiết phía dưới</p>
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
                            value={categoryData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <input
                            type="text"
                            name="description"
                            value={categoryData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Danh mục con</label>
                        <div className="mt-1 p-2 space-y-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none">
                            {category.children.map((cat) => (
                                <div key={cat.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectChildren.includes(cat.id)}
                                        onChange={() => handleChildrenToggle(cat.id)}
                                        className="ml-5 mr-2 "
                                    />
                                    <label className="text-sm text-gray-600">{cat.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Published</label>
                        <select
                            name="enabled"
                            value={categoryData.enabled.toString()}
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
                        {loading ? 'Đang cập nhật...' : 'Cập nhật danh mục'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;