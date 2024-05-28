const productApi = "http://localhost:3000/products";
const specialList = document.querySelector(".special-list");
const hotList = document.querySelector("#hot");

function renderSpecialProduct(item) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="./public/pages/product-detail.html">
      <img src="./public/images/${item.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${item.name}</div>
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
    <div class="special-price">$ ${item.price}</div>
    <div class="special-button">
      <button class="button-primary">ORDER NOW</button>
    </div>
  </div>
</div>`;
  specialList.insertAdjacentHTML("beforeend", template);
}
function renderHotProduct(item) {
  const template = `<div class="special-item">
    <div class="special-image">
      <a href="./public/pages/product-detail.html">
        <img src="./public/images/${item.image}" alt="" />
      </a>
      <i class="fa fa-heart" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
    </div>
    <div class="special-title">${item.name}</div>
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
      <div class="special-price">$ ${item.price}</div>
      <div class="special-button">
        <button class="button-primary">ORDER NOW</button>
      </div>
    </div>
  </div>`;
  hotList.insertAdjacentHTML("beforeend", template);
}

async function getproducts() {
  const response = await fetch(productApi);
  const data = await response.json();
  console.log(data);
  const specialProduct = data.filter((item) => {
    return item.category === "special";
  });

  const hotProduct = data.filter((item) => {
    return item.category === "hot";
  });

  specialProduct.forEach((item) => {
    renderSpecialProduct(item);
  });

  hotProduct.forEach((item) => {
    renderHotProduct(item);
  });
}

getproducts();
