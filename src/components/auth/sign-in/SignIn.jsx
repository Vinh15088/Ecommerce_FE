import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getToken, setToken } from '../../../service/LocalStorageService';
import AuthApiService from '../../../service/AuthApiService';
import ROUTES from '../../../constants/Route';
import { OAuthConfig } from '../../../configuration/configuration';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon } from '../../common/shared-theme/CustomIcons';

function SignIn(props) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [identifier, setIdentifier] = React.useState(""); 
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const accessToken = getToken();
    if (accessToken && window.location.pathname === ROUTES.BASE) {
      navigate(ROUTES.BASE);
    }
  }, [navigate]);

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.googleRedirectUri;
    const authUrl = OAuthConfig.googleAuthUri;
    const googleClientId = OAuthConfig.googleClientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    window.location.href = targetUrl;
  };

  const handleContinueWithFacebook = () => {
    const callbackUrl = OAuthConfig.facebookRedirectUri;
    const authUrl = OAuthConfig.facebookAuthUri;
    const facebookClientId = OAuthConfig.facebookClientId;

    const targetUrl = `${authUrl}?client_id=${facebookClientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&state={"{st=state123abc,ds=123456789}"}&scope=email,public_profile`;

    window.location.href = targetUrl;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!identifier) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const jsonPayload = decodeURIComponent(atob(base64Url).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if(!validateInputs()) return;

    const data = isEmail(identifier)
      ? {email: identifier, password}
      : {username: identifier, password};

    try {
      const response = await AuthApiService.loginLocal(data);

      const token = response.content?.token;
      setToken(token);
      
      console.log(token);

      const decodeToken = parseJwt(token);
      const role = decodeToken?.scope;

      console.log(role);

      localStorage.setItem("role", role);
      
      if(role === "ADMIN") navigate(ROUTES.DASHBOARD);
      
      if(role === "USER") navigate(ROUTES.BASE);
    } catch(error) {
      console.log(error);
      
      if(error.response.data.code === 1002) {
        setPasswordErrorMessage(error.response.data.message);
        setPasswordError(true);
      }
      if(error.response.data.code === 1003) {
        setEmailErrorMessage(error.response.data.message);
        setEmailError(true);
      }
    }
  }

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="max-w-md w-full bg-white px-8 py-4 mt-8 mb-8 rounded-lg border border-gray-300 shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Đăng nhập</h1>
        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-500">Email hoặc Tên đăng nhập</label>
            <input
              type="text"
              id="email"
              placeholder="Nhập email hoặc tên đăng nhập"
              className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            {emailError && <span className="text-red-500 text-sm">{emailErrorMessage}</span>}
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-blue-500">Mật khẩu</label>
              <button type="button" onClick={handleClickOpen} className="text-sm font-medium text-blue-500 hover:text-blue-700">
                Quên mật khẩu?
              </button>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••"
              className={`mt-1 block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <span className="text-red-500 text-sm">{passwordErrorMessage}</span>}
          </div>

          <ForgotPassword open={open} handleClose={handleClose} />
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Đăng nhập
          </button>
          <p className="text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <Link to={ROUTES.SIGN_UP} className="font-medium text-blue-500 hover:text-blue-600">
              Đăng ký ngay
            </Link>
          </p>
        </form>
        <div className="mt-4 border-t border-gray-200 pt-4 pb-4">
          <div className="space-y-2">
            <button onClick={handleContinueWithGoogle} className="w-full flex items-center justify-center py-2 px-4 hover:border-blue-500 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <GoogleIcon /> <span className="text-sm pl-2">Đăng nhập bằng tài khoản Google</span>
            </button>
            {/* <button onClick={handleContinueWithFacebook} className="w-full flex items-center justify-center py-2 px-4 hover:border-blue-500 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FacebookIcon /> <span className="text-sm pl-2">Đăng nhập bằng tài khoản Facebook</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;