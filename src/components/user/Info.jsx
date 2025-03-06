import UserSideCommon from "./UserSideCommon";
import { useState, useEffect } from "react";
import UserService from "../../service/UserApiService";
import { showSuccessToast, showErrorToast } from "../common/toastUtils";

function Info() {   
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [orderLoading, setOrderLoading] = useState(false);  
    
    const [initialData, setInitialData] = useState({});
    const [updateUserData, setUpdateUserData] = useState({
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email
    });

    const fetchUserData = async () => {
        const response = await UserService.getMyProfile();
            console.log("Response my-profile: ", response);
            setFullName(response.content.fullName);
            setPhoneNumber(response.content.phoneNumber);
            setEmail(response.content.email);
            setUserId(response.content.id);
            setUsername(response.content.username);
            setUpdateUserData({
                fullName: response.content.fullName,
                phoneNumber: response.content.phoneNumber,
                email: response.content.email
            });
            setInitialData({
                fullName: response.content.fullName,
                phoneNumber: response.content.phoneNumber,
                email: response.content.email
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUpdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
    }

    const isDataChanged = () => {
        return (
            updateUserData.fullName !== initialData.fullName ||
            updateUserData.phoneNumber !== initialData.phoneNumber ||
            updateUserData.email !== initialData.email
        );
    }

    const handleUpdateInfo = async () => {
        setOrderLoading(true);
        try {
            console.log("UserData: ", updateUserData);
            const response = await UserService.updateUser(userId, updateUserData);
            console.log("Response: ", response);
            if(response.success === true) {
                showSuccessToast('Cập nhật thông tin thành công');
                await fetchUserData();
            }
        } catch (error) {
            console.error('Error updating user info:', error);
            showErrorToast('Cập nhật thông tin thất bại');
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300 mb-10">
            <div className="col-start-2 col-span-8 grid grid-cols-4 gap-4 pb-10">
                <UserSideCommon />
                <div className="col-span-3 bg-white border border-gray-300 rounded-lg shadow-md p-4 pr-8">
                    <h2 className="text-lg font-semibold text-blue-500">Thông tin tài khoản</h2>
                    <div>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-row items-center gap-2">
                                <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Họ và tên</label>
                                <input type="text" className="outline-none w-4/5 p-2 border border-gray-300 rounded-md" name="fullName" value={updateUserData.fullName || ''} onChange={handleChange} />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Tên đăng nhập</label>
                                <input type="text" className="outline-none w-4/5 p-2 border border-gray-300 rounded-md" value={username} readOnly />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Email</label>
                                <input type="email" className="outline-none w-4/5 p-2 border border-gray-300 rounded-md" name="email" value={updateUserData.email || ''} onChange={handleChange} />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Số điện thoại</label>
                                <input type="text" className="outline-none w-4/5 p-2 border border-gray-300 rounded-md" name="phoneNumber" value={updateUserData.phoneNumber || ''} onChange={handleChange} />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <button type="submit" 
                                    className={`w-2/5 p-2 border border-gray-300 ${isDataChanged() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} rounded-md`} 
                                    disabled={orderLoading || !isDataChanged()}
                                    onClick={handleUpdateInfo}
                                >
                                    {orderLoading ? 'Đang cập nhật...' : 'Chỉnh sửa thông tin'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    )
}

export default Info;
