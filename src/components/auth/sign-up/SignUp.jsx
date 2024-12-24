import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OAuthConfig } from "../../../configuration/configuration";
import ROUTES from "../../../constants/Route";
import { GoogleIcon } from "../../common/shared-theme/CustomIcons";
import UserService from "../../../service/UserApiService";
import { showErrorToast, showSuccessToast } from "../../common/toastUtils";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ.";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    }

    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng nhập họ và tên.";
    }

    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên đăng nhập.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await UserService.registerUser(formData);

      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });

      showSuccessToast("Tạo tài khoản thành công");

      console.log("User registered:", response.content);
    } catch (error) {
      showErrorToast("Tạo tài khoản thất bại, vui lòng thử lại!");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.googleRedirectUri;
    const authUrl = OAuthConfig.googleAuthUri;
    const googleClientId = OAuthConfig.googleClientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    window.location.href = targetUrl;
  };

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="max-w-md w-full bg-white px-8 py-4 mt-8 mb-8 rounded-lg shadow-md border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["fullName", "email", "username", "password"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-blue-500"
              >
                {field === "fullName"
                  ? "Họ và tên"
                  : field === "email"
                  ? "Email"
                  : field === "username"
                  ? "Tên đăng nhập"
                  : "Mật khẩu"}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Nhập ${
                  field === "fullName"
                    ? "họ và tên"
                    : field === "email"
                    ? "email"
                    : field === "username"
                    ? "tên đăng nhập"
                    : "mật khẩu"
                }`}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors[field] && (
                <span className="text-red-500 text-sm">{errors[field]}</span>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading === true ? <span>Đăng ký ...</span> : <span>Đăng ký</span>}
            
          </button>
          <p className="text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link
              to={ROUTES.SIGN_IN}
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </form>
        <div className="mt-4 border-t border-gray-200 pt-4 pb-4">
          <button
            onClick={handleContinueWithGoogle}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <GoogleIcon />
            <span className="ml-2">Đăng ký bằng tài khoản Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
