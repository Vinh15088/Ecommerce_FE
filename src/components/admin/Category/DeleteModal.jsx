import { useState } from "react";
import CategoryService from "../../../service/CategoryApiService";
import { DeleteModalForm } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";


function DeleteModal({category, onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await CategoryService.deleteCategory(category.id);
            showSuccessToast("Xóa danh mục thành công!")
            onClose();
        } catch(error) {
            console.log(error);
            showErrorToast("Xóa danh mục thất bại!")
            setError("Delete failed. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DeleteModalForm onClose={onClose} name={category.name} error={error} handleDelete={handleDelete} loading={loading} />
    );
}

export default DeleteModal;