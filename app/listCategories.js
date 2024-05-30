import CategoryService from "./services/categoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
// Lấy địa chỉ api
const categoryApi = new CategoryService(JsonServerConstants.EndPoint);

// Khai báo biến
const showCategory = document.querySelector("#showCategory");
const formPost = document.querySelector(".form-post");
const formEdit = document.querySelector("#formEdit");
// Thêm biến global để lưu trữ thông tin sản phẩm hiện tại
let currentCategory = null;
// Xử lý sự kiện "click" một cách tách biệt
showCategory.addEventListener("click", async (e) => {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await categoryApi.deleteCategories(id);
      const productRow = e.target.closest("tr");
      productRow.remove();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  } else if (e.target.matches(".edit-btn")) {
    const categoryId = e.target.getAttribute("data-id");
    try {
      await handleEdit(categoryId);
    } catch (error) {
      console.error("Error fetching category data for edit:", error);
    }
  }
});

async function handleEdit(categoryId) {
  currentCategory = await categoryApi.getCategoryById(categoryId);
  document.getElementById("nameUpdate").value = currentCategory.name;
  document.getElementById("categoryId").value = categoryId;
  showEditForm();
}
// Xử lý sự kiện "submit" cho form chỉnh sửa
formEdit.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nameUpdate = document.getElementById("nameUpdate").value;
  const categoryId = document.getElementById("categoryId").value;
  try {
    const updatedCategory = await categoryApi.editCategory(categoryId, { name: nameUpdate });
    closeModalUpdate();
    renderCategories(updatedCategory);
    currentCategory = null;
    location.reload(true);
  } catch (error) {
    console.error("Error updating category:", error);
  }
});

// Lấy dữ liệu từ form thêm danh mục
formPost.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameCategori = document.getElementById("nameCategory").value;
  // Tạo đối tượng chứa dữ liệu danh mục
  try {
    const lastId = await categoryApi.getlastId();
    var newCategory = {
      id: lastId,
      name: nameCategori,
    };
    const addedCategory = await categoryApi.addCategories(newCategory);
    renderCategories(addedCategory);
    closeModal();
  } catch (error) {
    console.log(error);
  }
});

// show dữ liệu ra màn hình
function renderCategories(item) {
  const template = `<tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
      <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
    </div>
  </td>
</tr>`;
  showCategory.insertAdjacentHTML("beforeend", template);
}

// lấy data
categoryApi.getCategory().then((data) => {
  console.log(data);
  data.forEach((item) => {
    renderCategories(item);
  });
});
