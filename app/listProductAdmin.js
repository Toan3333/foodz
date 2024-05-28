import productService from "./services/productService";
import JsonServerConstants from "./constants/JsonServerConstants";
const productsApi = new productService(JsonServerConstants.EndPoint);
const showSp = document.querySelector("#showsp");
const addBtn = document.getElementById("addProductBtn");
const updatePro = document.getElementById("updatePro");
// Thêm biến global để lưu trữ thông tin sản phẩm hiện tại
let currentProduct = null;
addBtn.addEventListener("click", addProduct);
showSp.addEventListener("click", handleDelete);
updatePro.addEventListener("click", handleUpdate);

function renderProductAdmin(item) {
  const kq = `<tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td class="admin-img"><img src="${item.image}" alt="" /></td>
    <td>$ ${item.price}</td>
    <td>${item.category}</td>
    <td>
      <div class="edit-auth">
        <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
        <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
      </div>
    </td>
  </tr>`;
  showSp.insertAdjacentHTML("beforeend", kq);
}
async function addProduct() {
  // Lấy giá trị từ các trường input
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var image = document.getElementById("img").value;
  var category = document.getElementById("category").value;

  try {
    // Lấy ID mới từ server
    const lastId = await productsApi.getlastId();
    // Tạo đối tượng chứa dữ liệu sản phẩm
    var newProduct = {
      id: lastId,
      name: name,
      price: price,
      image: image,
      category: category,
    };
    // Thực hiện thêm sản phẩm và đợi cho đến khi hoàn thành
    const addedProduct = await productsApi.addAllProducts(newProduct);

    // Sau khi thêm thành công, render lại danh sách sản phẩm
    closeModal();
    renderProductAdmin(addedProduct);

    // Sau khi thêm thành công, render lại danh sách sản phẩm
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
async function handleDelete(event) {
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.dataset.id;
    try {
      await productsApi.deleteProduct(productId);
      const productRow = event.target.closest("tr");
      productRow.remove();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}

showSp.addEventListener("click", handleEdit);
async function handleEdit(event) {
  if (event.target.classList.contains("edit-btn")) {
    const productId = event.target.getAttribute("data-id");
    try {
      // Tìm nạp dữ liệu hiện có cho sản phẩm đã chọn
      currentProduct = await productsApi.getProductById(productId);
      // Điền vào các trường biểu mẫu với dữ liệu hiện có
      document.getElementById("nameUpdate").value = currentProduct.name;
      document.getElementById("priceUpdate").value = currentProduct.price;
      document.getElementById("imageUpdate").value = currentProduct.image;
      document.getElementById("categoryUpdate").value = currentProduct.category;
      // Đặt ProductId trong trường ẩn
      document.getElementById("productId").value = productId;
      // Show the edit form
      showEditForm();
    } catch (error) {
      console.error("Error fetching product data for edit:", error);
    }
  }
}
async function handleUpdate() {
  // Kiểm tra xem có dữ liệu sản phẩm hiện tại không
  if (currentProduct) {
    // Lấy giá trị từ các trường input
    var nameUpdate = document.getElementById("nameUpdate").value;
    var priceUpdate = document.getElementById("priceUpdate").value;
    var imageUpdate = document.getElementById("imageUpdate").value;
    var categoryUpdate = document.getElementById("categoryUpdate").value;

    // Lấy giá trị productId từ trường ẩn
    const productId = document.getElementById("productId").value;

    // Tạo đối tượng chứa dữ liệu sản phẩm
    const updatedProduct = {
      name: nameUpdate,
      image: imageUpdate,
      category: categoryUpdate,
      price: priceUpdate,
    };

    try {
      // Thực hiện cập nhật sản phẩm và đợi cho đến khi hoàn thành
      const updatedProducted = await productsApi.updateProduct(productId, updatedProduct);
      // Sau khi cập nhật thành công, render lại danh sách sản phẩm
      closeModalUpdate();
      renderProductAdmin(updatedProducted);

      // Cập nhật lại dữ liệu sản phẩm hiện tại
      currentProduct = updatedProducted;
    } catch (error) {
      console.log(error);
    }
  }
}

// Lấy danh sách sản phẩm và render khi trang được load
productsApi.findAllProducts().then((data) => {
  console.log(data);
  data.forEach((item) => {
    renderProductAdmin(item);
  });
});
