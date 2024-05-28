import orderService from "./services/orderService";
import JsonServerConstants from "./constants/JsonServerConstants";
const orderAdminApi = new orderService(JsonServerConstants.EndPoint);
const showOrder = document.querySelector("#showOrder");
function renderOrderAdmin(item) {
  const template = `<tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td class="order-address">${item.address}</td>
  <td>${item.orderDate}</td>
  <td>$ ${item.totalAmount}</td>
  <td style="color: red">${item.status}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
    </div>
  </td>
</tr>`;
  showOrder.insertAdjacentHTML("beforeend", template);
}
showOrder.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await orderAdminApi.deleteOrder(id);
      const productRow = e.target.closest("tr");
      productRow.remove();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
});

orderAdminApi.getOrder().then((data) => {
  console.log(data);
  data.forEach((item) => {
    renderOrderAdmin(item);
  });
});
