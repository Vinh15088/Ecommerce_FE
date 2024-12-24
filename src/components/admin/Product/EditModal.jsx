import { useState, useEffect } from "react";
import CategoryService from "../../../service/CategoryApiService";
import BrandService from "../../../service/BrandApiService";
import ProductService from "../../../service/ProductApiService";
import "react-quill/dist/quill.snow.css";
import {TextInput, TextareaInput} from "./TextInput";

function AddProductModal({product, onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState(product.images || []);
    const [moreDetails, setMoreDetails] = useState(product.productDetails.moreDetails || []);

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
        name: product?.name || '',
        sku: product?.sku || '',
        shortDescription: product?.shortDescription || '',
        longDescription: product?.longDescription || '',
        stock: product?.stock || '',
        cost: product?.cost || '',
        discount: product?.discount || '',
        price: product?.price || '',
        active: product?.active ?? true,
        category_id: product?.category || '',
        brand_id: product?.brand || '',
        productDetails: {
            CPU: product?.productDetails.CPU || '',
            RAM: product?.productDetails.RAM || '',
            ROM: product?.productDetails.ROM || '',
            VGA: product?.productDetails.VGA || '',
            display: product?.productDetails.display || '',
            color: product?.productDetails.color || '',
            OS: product?.productDetails.OS || '',
            moreDetails: moreDetails,
        },
        imagesToDelete: [],
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
        const imageToDelete = images[index];

        if(typeof imageToDelete === 'string') {
            const fileName = imageToDelete.split('/').pop();
            setProductData((prevData) => ({
                ...prevData, 
                imagesToDelete: [...prevData.imagesToDelete, fileName],
            }))
        }
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
            const response = await ProductService.updateProduct(product.id, productData, images);
            console.log("Update Product success:", response.content);
            onClose(); 
        } catch (error) {
            console.error("Update failed:", error);
            setError("Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
        
    };
    
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="flex flex-col fixed top-0 right-0 2xl:w-2/3 xl:w-2/3 lg:w-2/3 h-full bg-white rounded-lg shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="p-8 bg-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Cập nhật sản phẩm</h2>
                        <p className="text-gray-500 mb-6">Cập nhật sản phẩm với những thông tin cần thiết ở dưới</p>
                    </div>
                    <button onClick={onClose} className="text-red-400 hover:text-gray-400 font-bold text-2xl float-right rounded-full w-10 h-10 hover:bg-red-300">
                    ×
                    </button>
                </div>

                {/* body */}
                <form onSubmit={handleUpdate} className="grid grid-cols-2 flex-1 p-8 bg-white space-y-4 overflow-y-auto">
                    <TextInput label="Tên" name="name" value={productData.name} onChange={handleChange} />
                    <TextInput label="SKU" name="sku" value={productData.sku} onChange={handleChange} />
                    <TextareaInput label="Mô tả ngắn" name="shortDescription" row="2" value={productData.shortDescription} onChange={handleChange} />
                    <TextareaInput label="Mô tả dài" name="longDescription" row="8" value={productData.longDescription} onChange={handleChange} />
                    <TextInput label="Trong kho" name="stock" value={productData.stock} onChange={handleChange} type="number" />
                    <TextInput label="Giá" name="cost" value={productData.cost} onChange={handleChange} type="number" />
                    <TextInput label="Giá sale" name="price" value={productData.price} onChange={handleChange} type="number" />
                    <TextInput label="Giảm giá" name="discount" value={productData.discount} onChange={handleChange} type="number" />

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
                                        return (
                                            <div key={index} className="relative">
                                                <img
                                                    key={index}
                                                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                                    alt={`Product Image ${index}`}
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
                                })}
                            </div>

                        </div>
                    </div>

                    <div className="col-span-2 m-2">
                        <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                        <select
                            name="category"
                            value={productData.category_id}
                            onChange={(e) => setProductData((prevData) => ({...prevData, category_id: e.target.value}))}
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
                            value={productData.brand_id}
                            onChange={(e) => setProductData((prevData) => ({...prevData, brand_id: e.target.value}))}
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
                    <TextInput label="CPU" name="CPU" value={productData.productDetails.CPU} onChange={handleChange} type="text" />
                    <TextInput label="RAM" name="RAM" value={productData.productDetails.RAM} onChange={handleChange} type="text" />
                    <TextInput label="ROM" name="ROM" value={productData.productDetails.ROM} onChange={handleChange} type="text" />
                    <TextInput label="VGA" name="VGA" value={productData.productDetails.VGA} onChange={handleChange} type="text" />
                    <TextInput label="Display" name="display" value={productData.productDetails.display} onChange={handleChange} type="text" />
                    <TextInput label="Color" name="color" value={productData.productDetails.color} onChange={handleChange} type="text" />
                    <TextInput label="OS" name="OS" value={productData.productDetails.OS} onChange={handleChange} type="text" />


                    <label className="col-span-2 block text-lg font-medium text-gray-900">Thêm thống tin chi tiết</label>
                    {moreDetails.map((detail, index) => (
                        <div key={index} className="col-span-2 flex space-x-2 items-center">
                            <input
                                type="text"
                                name="name"     
                                value={detail.name}
                                onChange={(e) => handleMoreDetailsChange(index, "name", e.target.value)}                      
                                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="value" 
                                value={detail.value}    
                                onChange={(e) => handleMoreDetailsChange(index, "value", e.target.value)}                                    
                                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
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
                        Thêm thông tin chi tiết khác
                    </button>
                   

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
                        onClick={handleUpdate}               
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProductModal;