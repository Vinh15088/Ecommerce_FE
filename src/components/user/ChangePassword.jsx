import { EyeIcon } from "@heroicons/react/24/outline";
import UserSideCommon from "./UserSideCommon";
import { useState, useEffect } from "react";
import UserApiService from "../../service/UserApiService";
import { toast } from "react-toastify";
import UserService from "../../service/UserApiService";

function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const isPasswordValid = () => {
        return (
            password.newPassword === password.confirmPassword &&
            password.currentPassword !== password.newPassword
        );
    };

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const fetchUserData = async () => {
        const response = await UserService.getMyProfile();
        console.log("Response my-profile: ", response);
        setUserId(response.content.id);
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setPassword({...password, [e.target.name]: e.target.value});
    }

    const handleChangePassword = async () => {
        if (!isPasswordValid()) {
            if (password.newPassword !== password.confirmPassword) {
                setError("Mật khẩu mới và mật khẩu nhập lại không khớp");
            } else if (password.currentPassword === password.newPassword) {
                setError("Mật khẩu hiện tại và mật khẩu mới không được giống nhau");
            }
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            console.log("UserId: ", userId);
            console.log("Password: ", password);
            const response = await UserApiService.changePassword(userId, password.newPassword);
            console.log(response);
            if (response.success === true) {
                toast.success("Thay đổi mật khẩu thành công");
                setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            toast.error("Thay đổi mật khẩu thất bại");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-10 gap-4 pt-5 border-t-2 border-gray-300 mb-10">
            <div className="col-start-2 col-span-8 grid grid-cols-4 gap-4 pb-10">
                <UserSideCommon />
                <div className="col-span-3 bg-white border border-gray-300 rounded-lg shadow-md p-4 pr-8">
                    <h2 className="text-lg font-semibold text-blue-500">Thay đổi mật khẩu</h2>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-row items-center gap-2">
                            <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Mật khẩu hiện tại</label>
                            <div className="flex items-center w-4/5 border border-gray-300 rounded-lg px-2">
                                <input type={showCurrentPassword ? "text" : "password"} name="currentPassword" className="outline-none w-full p-2 " value={password.currentPassword} onChange={handleChange} />
                                <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="text-blue-500 ml-2">
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Mật khẩu mới</label>
                            <div className="flex items-center w-4/5 border border-gray-300 rounded-lg px-2">
                                <input type={showNewPassword ? "text" : "password"} name="newPassword" className="outline-none w-full p-2 " value={password.newPassword} onChange={handleChange} />
                                <button onClick={() => setShowNewPassword(!showNewPassword)} className="text-blue-500 ml-2">
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <label className="text-sm font-semibold text-gray-500 w-1/5 text-right">Nhập lại mật khẩu mới</label>
                            <div className="flex items-center w-4/5 border border-gray-300 rounded-lg px-2">
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="outline-none w-full p-2 " value={password.confirmPassword} onChange={handleChange} />
                                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-blue-500 ml-2">
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex flex-row items-center gap-2">
                            <label className="text-sm font-semibold text-gray-500 w-1/5 text-right"></label>
                            <button type="submit" 
                                className={`w-2/5 p-2 border border-gray-300 rounded-md ${isPasswordValid() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} 
                                onClick={handleChangePassword}
                                disabled={!isPasswordValid() || isLoading}
                            >
                                {isLoading ? 'Đang thay đổi mật khẩu...' : 'Thay đổi mật khẩu'}
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    );
};

export default ChangePassword;
