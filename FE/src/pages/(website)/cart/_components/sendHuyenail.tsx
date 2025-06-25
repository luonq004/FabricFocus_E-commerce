import axios from "@/configs/axios";
import { OrderEmail } from "../types";

const sendOrderHuyConfirmationEmail = async (to: string, orderCode: string) => {
  try {
    // Gọi API để lấy thông tin đơn hàng dựa vào orderCode
    const response = await axios.get(`/get-ordersCode/${orderCode}`);
    const order: OrderEmail = response.data; // Thông tin đơn hàng từ API

    // Kiểm tra xem thông tin đơn hàng có hợp lệ không
    if (!order) {
      console.error("Không tìm thấy đơn hàng.");
      throw new Error("Không tìm thấy đơn hàng.");
    }

    // Trích xuất danh sách sản phẩm
    const products = order?.products?.map((item) => ({
      name: item.productItem.name, // Tên sản phẩm
      image: item.productItem.image, // URL ảnh sản phẩm
      price: item.variantItem?.price, // Giá sản phẩm từ variantItem
      quantity: item.quantity, // Số lượng sản phẩm
      total: item.quantity * (item.variantItem?.price ?? 0), // Tổng giá trị cho sản phẩm
    }));

    // Nội dung email với bảng
    const emailContent = `
      <h1>Đơn hàng đã hủy!</h1>
      <p>Mã đơn hàng: <strong>${order.orderCode}</strong></p>
      <p>Trạng thái đơn hàng: <strong>${order.status}</strong></p>
      <p>Danh sách sản phẩm:</p>
      <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Giá tiền (VNĐ)</th>
            <th>Tổng tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          ${products
            ?.map(
              (product) => `
            <tr>
              <td style="text-align: center; vertical-align: middle;">${
                product.name
              }</td>
              <td style="text-align: center; vertical-align: middle;"><img src="${
                product.image
              }" alt="${
                product.name
              }" style="width: 100px; height: auto;" /></td>
              <td style="text-align: center; vertical-align: middle;">${
                product.quantity
              }</td>
              <td style="text-align: center; vertical-align: middle;">${product.price.toLocaleString()}</td>
              <td style="text-align: center; vertical-align: middle;">${product.total.toLocaleString()}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p>Tổng cộng: <strong>${order.totalPrice.toLocaleString()} VNĐ</strong></p>
    `;

    // Gửi email
    await axios.post("/send-email", {
      to,
      subject: `mã đơn hàng ${order.orderCode}`,
      htmlContent: emailContent,
    });
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    throw new Error("Lỗi khi gửi email.");
  }
};

export default sendOrderHuyConfirmationEmail;
