import { useState } from "react";
import BrandService from "../../../service/BrandApiService";
import { DeleteModalForm } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function DeleteModal({brand, onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await BrandService.deleteBrand(brand.id);
            showSuccessToast("Xóa nhãn hàng thành công!")
            onClose();
        } catch(error) {
            console.log(error);
            showErrorToast("Xóa nhãn hàng thất bại!")
            setError("Delete failed. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DeleteModalForm onClose={onClose} name={brand.name} error={error} handleDelete={handleDelete} loading={loading} />
    );
}

export default DeleteModal;

