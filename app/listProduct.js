import productService from "./services/productService";
import JsonServerConstants from "./constants/JsonServerConstants";

const productsApi = new productService(JsonServerConstants.EndPoint);
const specialList = document.querySelector(".special-list");
const hotList = document.querySelector("#hot");

function renderProducts(product) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="/public/pages/product-detail.html?id=${product.id}">
      <img src="${product.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${product.name}</div>
  <div class="special-rating">
    <div class="special-icon">
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
    </div>
    <div class="special-views">214 Reviews</div>
  </div>
  <div class="special-bottom">
    <div class="special-price">$ ${product.price}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn" data-id="${product.id}" >ORDER NOW</button>
    </div>
  </div>
</div>`;
  specialList.insertAdjacentHTML("beforeend", template);
}
// thêm vào giỏ hàng
specialList.addEventListener("click", async (e) => {
  if (e.target.matches("#orderBtn")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    const product = await productsApi.getProductById(id);
    console.log(product);
    // Kiểm tra có cart ở trong local storage hay không? nếu có lấy nó còn không thì là mãng rỗng
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const index = cart.findIndex((item) => item.id == product.id);
    if (index == -1) {
      product.qty = 1;
      cart.push(product);
    } else {
      cart[index].qty += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
  }
});

function renderProductHot(product) {
  const template = `<div class="special-item">
    <div class="special-image">
      <a href="/public/pages/product-detail.html?id=${product.id}">
        <img src="${product.image}" alt="" />
      </a>
      <i class="fa fa-heart" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
    </div>
    <div class="special-title">${product.name}</div>
    <div class="special-rating">
      <div class="special-icon">
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
      <div class="special-views">214 Reviews</div>
    </div>
    <div class="special-bottom">
      <div class="special-price">$ ${product.price}</div>
      <div class="special-button">
        <button class="button-primary" id="orderBtn" data-id="${product.id}">ORDER NOW</button>
      </div>
    </div>
  </div>`;

  hotList.insertAdjacentHTML("beforeend", template);
}
hotList.addEventListener("click", async (e) => {
  if (e.target.matches("#orderBtn")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    const product = await productsApi.getProductById(id);
    console.log(product);
    // Kiểm tra có cart ở trong local storage hay không? nếu có lấy nó còn không thì là mãng rỗng
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const index = cart.findIndex((item) => item.id == product.id);
    if (index == -1) {
      product.qty = 1;
      cart.push(product);
    } else {
      cart[index].qty += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
  }
});

productsApi.findAllProducts().then((data) => {
  console.log(data);
  const specialProduct = data.filter((item) => {
    return item.category === "special";
  });
  const hotProduct = data.filter((item) => {
    return item.category === "hot";
  });

  specialProduct.forEach((product) => {
    renderProducts(product);
  });
  hotProduct.forEach((product) => {
    renderProductHot(product);
  });
});
