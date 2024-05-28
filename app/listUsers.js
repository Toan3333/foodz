import userService from "./services/userService";
import JsonServerConstants from "./constants/JsonServerConstants";
const userApi = new userService(JsonServerConstants.EndPoint);
const showUser = document.querySelector("#showUser");
const formUserPost = document.querySelector(".form-user-post");
const formUserEdit = document.querySelector("#formUserEdit");
// Thêm biến global để lưu trữ thông tin sản phẩm hiện tại
let currentUser = null;
showUser.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await userApi.deleteUser(id);
      const productRow = e.target.closest("tr");
      console.log(productRow);
      productRow.remove();
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.matches(".edit-btn")) {
    const id = e.target.getAttribute("data-id");

    try {
      await handleEdit(id);
    } catch (error) {
      console.log(error);
    }
  }
});
async function handleEdit(id) {
  currentUser = await userApi.getUserById(id);
  document.getElementById("usernameUpdate").value = currentUser.username;
  document.getElementById("passwordUpdate").value = currentUser.password;
  document.getElementById("roleUpdate").value = currentUser.role;
  document.getElementById("userId").value = id;
  showEditForm();
}
formUserEdit.addEventListener("submit", async function (e) {
  e.preventDefault();
  const usernameUpdate = document.querySelector("#usernameUpdate").value;
  const passwordUpdate = document.querySelector("#passwordUpdate").value;
  const roleUpdate = document.querySelector("#roleUpdate").value;
  const id = document.querySelector("#userId").value;
  try {
    const updatedUser = await userApi.updateUser(id, {
      username: usernameUpdate,
      password: passwordUpdate,
      role: roleUpdate,
    });
    closeModalUpdate();
    renderUsers(updatedUser);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

formUserPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#role").value;

  try {
    const userId = await userApi.getUserId();
    const addUsers = await userApi.addUser({
      id: userId,
      username: username,
      password: password,
      role: role,
    });
    renderUsers(addUsers);
    closeModal();
  } catch (error) {
    console.log(error);
  }
});
function renderUsers(item) {
  const template = `<tr>
    <td>${item.id}</td>
    <td>${item.username}</td>
    <td>${item.password}</td>
    <td>${item.role}</td>
    <td>
        <div class="edit-auth">
            <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
            <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
        </div>
    </td> 
</tr>`;
  showUser.insertAdjacentHTML("beforeend", template);
}

userApi.getUsers().then((data) => {
  console.log(data);
  data.forEach((item) => {
    renderUsers(item);
  });
});
