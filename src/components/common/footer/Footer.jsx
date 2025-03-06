// src/components/common/footer/Footer.jsx

import React from 'react';

function Footer() {
    return (
        <div className="grid grid-cols-8 bg-gray-100">
            <div className="col-start-2 col-span-6 p-8 text-gray-700">
                <div className="flex justify-between mb-8">
                    <div className="flex items-center">
                        <div>
                            <p className="font-bold">Tổng đài</p>
                            <p>Mua hàng: <strong>19001903</strong></p>
                            <p>Khiếu nại: <strong>19001903</strong></p>
                            <p className="font-bold">Phương thức thanh toán</p>
                            <div className="flex space-x-2 mt-2"> 
                                <img src="../../../assets/images/cash.jpg" alt="Cash" className="h-8 w-14 object-cover contain-content border-collapse rounded-lg" />
                                <img src="../../../assets/images/zalopay.png" alt="ZaloPay" className="h-8 w-14 object-cover contain-content border-collapse rounded-lg" />
                                <img src="../../../assets/images/vnpay.jpg" alt="VNPay" className="h-8 w-14 object-cover contain-content border-collapse rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Giới thiệu</h3>
                        <ul>
                            <li>Giới thiệu công ty</li>
                            <li>Liên hệ hợp tác kinh doanh</li>
                            <li>Hệ thống thanh toán</li>
                            <li>Tin công nghệ</li>
                            <li>Tin tức</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Hỗ trợ khách hàng</h3>
                        <ul>
                            <li>Hướng dẫn mua hàng trực tuyến</li>
                            <li>Hướng dẫn thanh toán</li>
                            <li>Hướng dẫn mua hàng trả góp</li>
                            <li>Góp ý, Khiếu Nại</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Chính sách chung</h3>
                        <ul>
                            <li>Chính sách, quy định chung</li>
                            <li>Chính sách bảo hành</li>
                            <li>Chính sách cho doanh nghiệp</li>
                            <li>Chính sách hàng chính hãng</li>
                            <li>Bảo mật thông tin khách hàng</li>
                            <li>Chính sách giao hàng</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm">
                    <p>© 2024 Công ty Cổ phần đầu tư công nghệ VinhSeo</p>
                    <p>Trụ sở chính: Số 129+131 Lê Thanh Nghị, Phường Đồng Tâm, Quận Hai Bà Trưng, Thành phố Hà Nội</p>
                    <p>VPGD: Tầng 3 Tòa nhà LILAMA, số 124 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Thành phố Hà Nội</p>
                    <p>GPKDKKD số 0101116194 do Sở KHĐT TP.Hà Nội cấp ngày 31/8/2001</p>
                    <p>Email: info@vinhSeo.com. Điện thoại: 1900 1903</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;