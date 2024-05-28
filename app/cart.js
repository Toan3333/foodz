let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const showCart = document.querySelector("#showCart");
const sumMoney = document.querySelector("#sumMoney");
// show cart
function renderCart() {
  showCart.innerHTML = "";
  cart.forEach((item) => {
    const template = `<tr id="carts">
      <td class="pro-thumnail">
        <img src="${item.image}" alt="" />
      </td>
      <td class="pro-title">
        <a href="#">${item.name}</a>
      </td>
      <td class="pro-price">$ ${item.price}</td>
      <td class="pro-quantity">
        <button class="sub" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="plus" data-id="${item.id}">+</button>
      </td>
      <td class="pro-subtotal">$ ${item.qty * item.price}</td>
      <td class="pro-remove">
        <button class="delete-btn" data-id="${item.id}">
          <i class="fa fa-trash-o" aria-hidden="true"></i> Remove
        </button>
      </td>
    </tr>`;
    showCart.insertAdjacentHTML("beforeend", template);
  });
  total();
}
renderCart();

// tổng tiền
function total() {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.qty;
  });
  sumMoney.innerHTML = `Grand total: $${sum}`;
}
// xoá sản phẩm
showCart.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    // tìm index
    const index = cart.findIndex((item) => item.id == id);
    cart.splice(index, 1);
    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});
// Tăng số lượng
showCart.addEventListener("click", (e) => {
  if (e.target.matches(".plus")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    const index = cart.findIndex((item) => item.id == id);
    cart[index].qty += 1;
    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});
// Giảm số lượng
showCart.addEventListener("click", (e) => {
  if (e.target.matches(".sub")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    const index = cart.findIndex((item) => item.id == id);
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      cart.splice(index, 1);
    }

    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});

// import cartService from "./services/cartService";
// import JsonServerConstants from "./constants/JsonServerConstants";

// const cartApi = new cartService(JsonServerConstants.EndPoint);
// const showCart = document.querySelector("#showCart");
// let totalPrice = 0;

// let totalShow = document.querySelector("#total");

// showCart.addEventListener("click", handleDeleteCart);
// showCart.addEventListener("change", handleQuantityChange);

// function updateTotalPrice() {
//   totalPrice = calculateTotalPrice(); // Uncomment this line
//   console.log("Total Price:", totalPrice);

//   // Set the formatted total price to the total.textContent
//   totalShow.textContent = `Grand Total: ${totalPrice}`;
// }

// async function handleDeleteCart(e) {
//   if (e.target.classList.contains("delete-btn")) {
//     const id = e.target.getAttribute("data-id");
//     try {
//       const deletedItem = await cartApi.DeleteCart(id);
//       const productRow = e.target.closest("tr");
//       productRow.remove();
//       totalPrice -= deletedItem.price;
//       updateTotalPrice();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   }
// }

// function renderCart(item) {
//   const template = `<tr id="carts">
//     <td class="pro-thumnail">
//       <img src="${item.image}" alt="" />
//     </td>
//     <td class="pro-title">
//       <a href="#">${item.name}</a>
//     </td>
//     <td class="pro-price">$ ${item.price}</td>
//     <td class="pro-quantity">
//       <div class="product-detail__quantity">
//         <div class="quantity cart-quantity">
//           <input type="number" value="1" min="1" max="10" data-id="${item.id}" class="quantity-input" />
//         </div>
//       </div>
//     </td>
//     <td class="pro-subtotal">$ ${item.price}</td>
//     <td class="pro-remove">
//       <button class="delete-btn"  data-id="${item.id}">
//         <i class="fa fa-trash-o" aria-hidden="true"></i> Remove
//       </button>
//     </td>
//   </tr>`;
//   showCart.insertAdjacentHTML("beforeend", template);
//   totalPrice += item.price;
//   updateTotalPrice();
// }

// function handleQuantityChange(e) {
//   if (e.target.matches(".quantity-input")) {
//     const newQuantity = parseInt(e.target.value, 10);
//     const itemId = e.target.getAttribute("data-id");

//     cartApi.updateCartItemQuantity(itemId, newQuantity).then((updatedItem) => {
//       const productRow = e.target.closest("tr");
//       const priceElement = productRow.querySelector(".pro-price");
//       const subtotalElement = productRow.querySelector(".pro-subtotal");

//       priceElement.textContent = `$ ${updatedItem.price}`;
//       subtotalElement.textContent = `$ ${(updatedItem.price * newQuantity).toFixed(2)}`;
//       updateTotalPrice();
//     });
//   }
// }

// async function calculateTotalPrice() {
//   let total = 0;
//   const quantityInputs = Array.from(document.querySelectorAll(".quantity-input"));

//   console.log("Quantity Inputs:", quantityInputs);

//   // Use Promise.all to await all promises before continuing
//   await Promise.all(
//     quantityInputs.map(async (input) => {
//       const itemId = input.getAttribute("data-id");
//       const quantity = parseInt(input.value, 10);

//       // Await the promise returned by getCartItemById
//       const item = await cartApi.getCartItemById(itemId);

//       console.log("Item ID:", itemId);
//       console.log("Quantity:", quantity);
//       console.log("Item:", item);

//       // Check if item.price and quantity are valid numbers
//       if (item && !isNaN(item.price) && !isNaN(quantity)) {
//         total += quantity * parseFloat(item.price);
//       }
//     })
//   );

//   console.log("Calculated Total:", total);

//   return total;
// }

// cartApi.findAllCart().then((data) => {
//   data.forEach((item) => {
//     renderCart(item);
//   });
//   // Sau khi đã thêm tất cả sản phẩm vào giỏ hàng, cập nhật tổng tiền
//   updateTotalPrice();
// });
