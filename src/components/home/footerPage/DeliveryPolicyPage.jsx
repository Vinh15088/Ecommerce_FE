import Navbar from "../../common/navbar/Navbar"
import Footer from "../../common/footer/Footer"
function DeliveryPolicyPage () {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-4">Chính sách giao hàng tại Vinh Sẹo Shop</h2>
                <p className="mb-4">Nắm bắt nhu cầu mua sắm thông minh, tiết kiệm thời gian và công sức của quý khách. Vinh Sẹo Shop đã áp dụng quy trình mua hàng online - nhận hàng tại nhà như sau:</p>

                <h3 className="text-2xl font-bold mb-2">Bước 1</h3>
                <p className="mb-4">Quý khách chọn và đặt sản phẩm muốn mua trên website hoặc fanpage.</p>

                <h3 className="text-2xl font-bold mb-2">Bước 2</h3>
                <p className="mb-4">Nhân viên bán hàng Vinh Sẹo Shop sẽ tiếp nhận, tư vấn và hướng dẫn quý khách chọn sản phẩm.</p>

                <h3 className="text-2xl font-bold mb-2">Bước 3</h3>
                <p className="mb-4">Sau khi đã đạt được thỏa thuận về sản phẩm, giá, phương thức mua hàng. Khách hàng sẽ cung cấp cho Vinh Sẹo Shop số điện thoại, địa chỉ nhận hàng để nhân viên lên đơn giao hàng.</p>

                <h3 className="text-2xl font-bold mb-2">Bước 4</h3>
                <p className="mb-4">Quý khách xác nhận đồng ý mua thì:</p>
                <ul className="list-disc ml-4 mb-4">
                    <li>Nếu quý khách ở khu vực nội thành Hà Nội, Đà Nẵng, Huế, Quảng Nam và HCM thì sẽ được miễn phí vận chuyển và không cần cọc trước.</li>
                    <li>Nếu quý khách hàng mua sản phẩm Laptop cũ sẽ chuyển 500.000 VNĐ vào tài khoản Vinh Sẹo Shop để xác thực, tránh trường hợp đặt đơn hàng ảo với tên và địa chỉ giả gây thiệt hại cho Vinh Sẹo Shop.</li>
                    <li>Nếu quý khách hàng mua sản phẩm Laptop mới giá trị cao sẽ chuyển 1.000.000 VNĐ vào tài khoản Vinh Sẹo Shop để xác thực, tránh trường hợp đặt đơn hàng ảo với tên và địa chỉ giả gây thiệt hại cho Vinh Sẹo Shop.</li>
                    <li>Nếu quý khách hàng mua linh kiện, vui lòng chuyển trước 50% giá trị linh kiện vào tài khoản Vinh Sẹo Shop để xác thực, tránh trường hợp đặt đơn hàng ảo với tên và địa chỉ giả gây thiệt hại cho Vinh Sẹo Shop.</li>
                </ul>
                <p className="mb-4">Lưu ý: Khi chuyển quý khách ghi rõ nội dung bao gồm: "họ và tên" đặt cọc laptop/iPhone/Macbook "tên máy hay tên linh kiện" gửi về TK dưới đây:</p>
                <ul className="list-disc ml-4 mb-4">
                    <li>Ngân hàng: Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam - BIDV</li>
                    <li>Chủ tài khoản: Hộ kinh doanh Vinh Sẹo Shop</li>
                    <li>Số tài khoản: 3102997897</li>
                </ul>

                <h3 className="text-2xl font-bold mb-2">Bước 5</h3>
                <p className="mb-4">Sau 3 - 4 ngày nhân viên giao hàng chuyển phát nhanh sẽ giao hàng tại địa chỉ quý khách. Quý khách nhận máy, bật máy test thử các chức năng của máy. Nếu chất lượng máy đúng như mô tả quý khách nhận hàng và thanh toán tiền cho nhân viên giao hàng.</p>

                <p className="mb-4">Thời gian nhận hàng đối với khách hàng nội thành Hà Nội, Đà Nẵng, Huế, Quảng Nam, Quy Nhơn và HCM tầm trong ngày đặt là có.</p>
                <p className="mb-4">Thời gian nhận hàng đối với khách hàng ngoại thành không thuộc chi nhánh của Vinh Sẹo Shop tầm 3-4 ngày tùy vào vị trí từng tỉnh không kể thứ 7 chủ nhật và ngày lễ.</p>
                <p className="mb-4">Lưu ý:</p>
                <ul className="list-disc ml-4 mb-4">
                    <li>Nếu sản phẩm gửi đến đúng như mô tả mà quý khách đổi ý không mua nữa, quý khách sẽ phải chịu hoàn toàn số tiền đặt cọc xác thực đã chuyển.</li>
                    <li>Nếu sản phẩm không đúng mô tả hoặc có lỗi, Vinh Sẹo Shop sẽ hoàn trả lại tiền đặt cọc xác thực cho quý khách.</li>
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default DeliveryPolicyPage;