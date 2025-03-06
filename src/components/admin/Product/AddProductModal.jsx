import { useState, useEffect } from "react";
import CategoryService from "../../../service/CategoryApiService";
import BrandService from "../../../service/BrandApiService";
import ProductService from "../../../service/ProductApiService";
import {TextInput, TextareaInput} from "./TextInput";
import { FooterModal } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function AddProductModal({ onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([null]);
    const [moreDetails, setMoreDetails] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await CategoryService.getAllParentCategory();
            setCategories(data.content);
        } catch(error) {
            console.error("Error fetching users: ", error);
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
    
    const [productData, setProductData] = useState({
        name: '',
        sku: '',
        shortDescription: '',
        longDescription: '',
        stock: '',
        cost: '',
        discount: '',
        price: '',
        active: 'true',
        category: '',
        brand: '',
        productDetails: {
            CPU: '',
            RAM: '',
            ROM: '',
            VGA: '',
            display: '',
            color: '',
            OS: '',

            moreDetails: {}
        }
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(['CPU', 'RAM', 'ROM', 'VGA', 'display', 'color', 'OS'].includes(name)) {
            setProductData((prevData) => ({
                ...prevData,
                productDetails: {
                    ...prevData.productDetails, [name]: value,
                },
            }));
        } else {
            setProductData((prevData) => ({...prevData, [name]: value}));            
        }

        console.log(productData);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleAddMoreDetails = () => {
        setMoreDetails([...moreDetails, {name: "", value: ""}]);
    };

    const handleMoreDetailsChange = (index, field, value) => {
        const updateMoreDetails = [...moreDetails];
        updateMoreDetails[index][field] = value;

        setMoreDetails(updateMoreDetails);

        setProductData((prevData) => ({
            ...prevData,
            productDetails: {
                ...prevData.productDetails,
                moreDetails: updateMoreDetails,
            },
        }));
    };

    const handleRemoveMoreDetail = (index) => {
        const updateMoreDetails = moreDetails.filter((_, i) => i !== index);

        setMoreDetails(updateMoreDetails);

        setProductData((prevData) => ({
            ...prevData,
            productDetails: {
                ...prevData.productDetails,
                moreDetails: updateMoreDetails,
            },
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            console.log(images);
            const response = await ProductService.createProduct(productData, images);
            showSuccessToast("Thêm sản phẩm thành công!")
            console.log("Create Category success:", response.content); 
            onClose(); 
        } catch (error) {
            console.error("Create failed:", error);
            showErrorToast("Thêm sản phẩm thất bại!")
            setError("Create failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="flex flex-col fixed top-0 right-0 2xl:w-2/3 xl:w-2/3 lg:w-2/3 h-full bg-white shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="p-8 bg-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Tạo sản phẩm mới</h2>
                        <p className="text-gray-500 mb-6">Tạo sản phẩm với những thông tin cần thiết ở dưới</p>
                    </div>
                    <button onClick={onClose} className="text-red-400 hover:text-gray-400 font-bold text-2xl float-right rounded-full w-10 h-10 hover:bg-red-300">
                    ×
                    </button>
                </div>

                {/* body */}
                <form onSubmit={handleUpdate} className="grid grid-cols-2 flex-1 p-8 bg-white space-y-4 overflow-y-auto">
                    <TextInput label="Tên" name="name" placeholder={"Nhập tên"} onChange={handleChange} />
                    <TextInput label="SKU" name="sku" placeholder={"Nhập SKU"} onChange={handleChange} />
                    <TextareaInput label="Mô tả ngắn" name="shortDescription" placeholder={"Nhập mô tả ngắn"} row="2"  onChange={handleChange} />
                    <TextareaInput label="Mô tả dài" name="longDescription" row="8" placeholder={"Nhập mô tả dài"}  onChange={handleChange} />
                    <TextInput label="Trong kho" name="stock"  onChange={handleChange} placeholder={"Nhập số lượng trong kho"} type="number" />
                    <TextInput label="Giá" name="cost" onChange={handleChange} placeholder={"Nhập giá"} type="number" />
                    <TextInput label="Giá sale" name="price"  onChange={handleChange} placeholder={"Nhập giá sale"} type="number" />
                    <TextInput label="Giảm giá" name="discount" onChange={handleChange} placeholder={"Nhập giảm giá"} type="number" />

                    <div className="col-span-2 m-2">
                        <label className="block text-sm font-medium text-gray-700">Published</label>
                        <select
                            name="active"
                            value={productData.active}
                            onChange={(e) => setProductData((prevData) => ({ 
                                ...prevData, 
                                active: e.target.value === "false" ? false : true 
                            }))}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className="col-span-2 m-2 ">
                        <label className="block text-sm font-medium text-gray-700">Ảnh</label>
                        <div className="block p-2 border-gray-300 bg-gray-100 rounded-md">
                            <input  
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full mt-2"
                            />

                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {images.map((img, index) => {
                                    if (img instanceof File) {
                                        return (
                                            <div key={index} className="relative">
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(img)}
                                                    alt={`Uploaded ${index}`}
                                                    className="w-full h-auto rounded shadow"
                                                />
                                                <button
                                                    className="absolute top-1 right-1 pb-1 bg-red-200 text-red-600 rounded-full w-6 h-6 text-2xl flex items-center justify-center"
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <span>×</span>
                                                </button>
                                            </div>
                                        );
                                    } else return null;
                                })}
                            </div>

                        </div>
                    </div>

                    <div className="col-span-2 m-2">
                        <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                        <select
                            name="category"
                            value={productData.category}
                            onChange={(e) => setProductData((prevData) => ({...prevData, category: e.target.value}))}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus-bg-slate-200 focus-outline-none"
                        >
                            <option value="">None</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 m-2">
                        <label className="block text-sm font-medium text-gray-700">Nhãn hàng</label>
                        <select
                            name="brand"
                            value={productData.brand}
                            onChange={(e) => setProductData((prevData) => ({...prevData, brand: e.target.value}))}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus-bg-slate-200 focus-outline-none"
                        >
                            <option value="">None</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <label className="col-span-2 block text-lg font-medium text-gray-900">Thông tin chi tiết sản phẩm</label>
                    <TextInput label="CPU" name="CPU" onChange={handleChange} placeholder={"Nhập CPU"} type="text" />
                    <TextInput label="RAM" name="RAM" onChange={handleChange} placeholder={"Nhập RAM"} type="text" />
                    <TextInput label="ROM" name="ROM" onChange={handleChange} placeholder={"Nhập ROM"} type="text" />
                    <TextInput label="VGA" name="VGA" onChange={handleChange} placeholder={"Nhập VGA"} type="text" />
                    <TextInput label="Display" name="display" onChange={handleChange} placeholder={"Nhập Display"} type="text" />
                    <TextInput label="Color" name="color" onChange={handleChange} placeholder={"Nhập Color"} type="text" />
                    <TextInput label="Operating System" name="OS" onChange={handleChange} placeholder={"Nhập OS"} type="text" />

                   <label className="col-span-2 block text-lg font-medium text-gray-900">Thông tin chi tiết thêm</label>
                    {moreDetails.map((detail, index) => (
                        <div key={index} className="col-span-2 flex space-x-2 items-center">
                            <input
                                type="text"
                                name="name"     
                                value={detail.name}
                                onChange={(e) => handleMoreDetailsChange(index, "name", e.target.value)}                      
                                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                                placeholder="Tên"
                            />
                            <input
                                type="text"
                                name="value" 
                                value={detail.value}    
                                onChange={(e) => handleMoreDetailsChange(index, "value", e.target.value)}                                    
                                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                                placeholder=""
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveMoreDetail(index)}
                                className="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-600"
                            >Xóa</button>
                        </div>
                    ))}

                    <button 
                        type="button"
                        onClick={handleAddMoreDetails}
                        className="col-span-2 bg-blue-400 text-white rounded p-2"
                    >
                        Thêm thông tin chi tiết
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>

                <FooterModal name="sản phẩm" onClose={onClose} loading={loading} handleUpdate={handleUpdate} />

            </div>
        </div>
    );
}

export default AddProductModal;