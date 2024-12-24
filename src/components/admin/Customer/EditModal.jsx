import { useState } from "react";
import UserService from "../../../service/UserApiService";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

function EditModal({user, onClose}) {
    const [userData, setUserData] = useState({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({...prevData, [name]: value}));

        console.log(userData);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await UserService.updateUser(user.id, userData);
            showSuccessToast("Cập nhật người dùng thành công!")
            onClose();
            console.log("Update user success");
        } catch(error) {
            console.log(error);
            showErrorToast("Cập nhật người dùng thất bại!")
            setError('Update failed. Please try again');
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
                        <h2 className="text-2xl font-semibold mb-2">Cập nhật người dùng</h2>
                        <p className="text-gray-500 mb-6">Cập nhật những thông tin cần thiết của người dùng ở dưới</p>
                    </div>

                    <button onClick={onClose} className="text-red-400 hover:text-gray-400 font-bold text-2xl float-right rounded-full w-10 h-10 hover:bg-red-300">
                    ×
                    </button>
                </div>

                {/* body */}
                <form onSubmit={handleUpdate} className="flex-1 p-8 bg-white space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 ">Họ và tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Full Name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                            placeholder="Phone"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                        <input
                            type="date"
                            name="dob"
                            value={userData.dob}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
                        />
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
                        {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;