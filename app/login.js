import userService from "./services/userService";
import JsonServerConstants from "./constants/JsonServerConstants";
const userApi = new userService(JsonServerConstants.EndPoint);

const loginForm = document.querySelector("#form-login");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username === "" || password === "") {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
  } else {
    try {
      // Lấy tất cả người dùng từ JSON Server
      const users = await userApi.getUsers();

      // Kiểm tra thông tin đăng nhập và quyền truy cập
      const authenticatedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (authenticatedUser) {
        if (authenticatedUser.role === "admin") {
          // Nếu là admin, chuyển hướng đến trang quản trị admin
          window.location.href = "/admin/admin.html";
        } else if (authenticatedUser.role === "user") {
          // Nếu là user, chuyển hướng đến trang người dùng thông thường
          window.location.href = "index.html";
        } else {
          // Xử lý quyền truy cập khác nếu cần thiết
        }
      } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
    }
  }
});

userApi.getUsers().then((data) => {
  console.log(data);
});
