import orderService from "./services/orderService";
import JsonServerConstants from "./constants/JsonServerConstants";
const orderApi = new orderService(JsonServerConstants.EndPoint);
const currentDate = new Date();
const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getFullYear()}`;
// Định dạng ngày thành chuỗi

let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
console.log(cart);
const checkoutList = document.querySelector("#checkout-list");
const totalCheckout = document.querySelector("#totolCheckout");
console.log(checkoutList);

function renderCheckout() {
  cart.forEach((item) => {
    const template = `<div class="checkout-detail__box-item">
    <div class="checkout-detail__box-image">
      <img src="${item.image}" alt="" />
    </div>
    <div class="checkout-detail__box-body">
      <div class="checkout-detail__box-name">${item.name}</div>
      <div class="checkout-detail__box-price">$ ${item.price}</div>
      <div class="checkout-detail__box-quantity">
        <span class="quantity-checkout">Quantity: ${item.qty}</span>
      </div>
    </div>
  </div>`;
    checkoutList.insertAdjacentHTML("beforeend", template);
  });
  total();
}
renderCheckout();
function total() {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.qty;
  });
  totalCheckout.innerHTML = `$ ${sum}`;
}
const totalAmount = cart.reduce((total, item) => total + item.price * item.qty, 0);
const formOrder = document.querySelector(".form-order");
formOrder.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  // Lấy dữ liệu từ giỏ hàng
  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  try {
    // Tạo đơn hàng bằng cách gửi dữ liệu từ cả form và giỏ hàng lên server
    const createOrder = await orderApi.addOrder({
      name: name,
      phone: phone,
      address: address,
      orderDate: formattedDate,
      status: "Pending",
      totalAmount: totalAmount, // Thêm tổng tiền vào đơn hàng
      // Thêm danh sách sản phẩm trong giỏ hàng vào đơn hàng
      products: cart,
    });

    // Sau khi đơn hàng được tạo thành công, bạn có thể xử lý các bước tiếp theo ở đây,
    // như là hiển thị thông báo thành công, làm sạch giỏ hàng, chuyển hướng người dùng, vv.

    // Ví dụ: Làm sạch giỏ hàng sau khi đơn hàng được tạo
    localStorage.removeItem("cart");

    // Hiển thị thông báo hoặc thực hiện bất kỳ hành động khác tùy thuộc vào yêu cầu của bạn
    alert("Ok!");
  } catch (error) {
    console.log(error);
    // Xử lý lỗi nếu có
    alert("Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.");
  }
});
