import { useState } from "react";
import UserService from "../../../service/UserApiService";
import { DeleteModalForm } from "../common/CommonModal";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";


function DeleteModal({user, onClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);

        try {
            await UserService.deleteUser(user.id);
            showSuccessToast("Xóa người dùng thành công!")
            onClose();
        } catch(error) {
            console.log(error);
            showErrorToast("Xóa người dùng thất bại!")
            setError("Xóa đã gặp lỗi. Vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DeleteModalForm onClose={onClose} name={user.fullName} error={error} handleDelete={handleDelete} loading={loading} />
    );
}

export default DeleteModal;

