import { useState } from "react";
import ProductService from "../../../service/ProductApiService";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function DeleteModal({product, onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await ProductService.deleteProduct(product.id);
            showSuccessToast("Xóa sản phẩm thành công!")
            onClose();
        } catch(error) {
            console.log(error);
            showErrorToast("Xóa sản phẩm thất bại!")
            setError("Delete failed. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Bạn có chắc chắn?</h2>
                <p className="text-gray-600 mb-6">
                    Bạn thực sự muốn xóa sản phẩm <strong>{product.name}</strong>?
                </p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex justify-between">
                    <button 
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 p-2 rounded w-full mr-2">
                            Hủy
                    </button>

                    <button 
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-400 hover:bg-red-600 text-white p-2 rounded w-full ml-2">
                            {loading ? 'Đang xóa...' : 'Xóa'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;