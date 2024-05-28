var t=globalThis,e={},i={},a=t.parcelRequire06c3;null==a&&((a=function(t){if(t in e)return e[t].exports;if(t in i){var a=i[t];delete i[t];var d={id:t,exports:{}};return e[t]=d,a.call(d.exports,d,d.exports),d.exports}var s=Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){i[t]=e},t.parcelRequire06c3=a),(0,a.register)("594Pg",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>d,set:void 0,enumerable:!0,configurable:!0});var i=a("fmRoT"),d=class{constructor(t){this.collectionName="products",this.endPoint=t}findAllProducts=async()=>(await (0,i.default).get(this.endPoint+this.collectionName)).data;addAllProducts=async t=>(await (0,i.default).post(this.endPoint+this.collectionName,t)).data;getProductById=async t=>(await (0,i.default).get(this.endPoint+this.collectionName+"/"+t)).data;getlastId=async()=>{try{let t=(await (0,i.default).get(`${this.endPoint}${this.collectionName}`)).data;if(0===t.length)return"0";return(parseInt(t[t.length-1].id,10)+1).toString()}catch(t){console.error("Error getting last product ID:",t)}};deleteProduct=async t=>(await (0,i.default).delete(`${this.endPoint}${this.collectionName}/${t}`)).data;updateProduct=async(t,e)=>(await (0,i.default).put(`${this.endPoint}${this.collectionName}/${t}`,e)).data}});var d=a("594Pg"),s=a("3610C");const c=new d.default(s.default.EndPoint),r=document.querySelector(".product-detail__main"),o=document.querySelector(".food-list");c.findAllProducts().then(t=>{t.filter(t=>"new"===t.category).forEach(t=>{!function(t){let e=`<div class="food-item">
    <div class="food-image">
      <img src="${t.image}" alt="" />
    </div>
    <div class="food-body">
      <div class="food-name">${t.name}</div>
      <div class="food-price">$ ${t.price}</div>
    </div>
  </div>`;o.insertAdjacentHTML("beforeend",e)}(t)})});const n=new URLSearchParams(window.location.search).get("id");async function l(t){try{let e=`<div class="product-detail__image">
    <img src="${t.image}" alt="" />
  </div>
  <div class="product-detail__content">
    <div class="product-detail__heading">Best seller</div>
    <h3 class="product-detail__title">${t.name}</h3>
    <div class="product-detail__price">$ ${t.price}</div>
    <div class="product-detail__review">
      <div class="product-detail__list">
        <div class="product-detail__rating">
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        <div class="product-detail__view">214 Reviews</div>
      </div>
      <div class="product-detail__viewall">View all</div>
    </div>
    <div class="product-detail__text">Description:</div>
    <p class="product-detail__desc">
      Yangnyeom chicken (Korean: \u{C591}\u{B150}\u{CE58}\u{D0A8}) is a variety of Korean fried chicken seasoned
      with a sweet and spicy sauce of gochujang, garlic, sugar, and other spices. It is
      often eaten as anju, food consumed while drinking, in South Korea.
    </p>
    <div class="product-detail__container">
      <div class="product-detail__quantity">
        <input type="text" value="1" min="1" max="10" />
        <div class="product-detail__item">
          <i class="fa fa-minus" aria-hidden="true"></i>
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
      <div class="product-detail__btn">
        <button class="button-primary">ORDER NOW</button>
      </div>
    </div>
  </div>`;r.insertAdjacentHTML("beforeend",e)}catch(t){console.log(t)}}c.getProductById(n).then(t=>{l(t)});
//# sourceMappingURL=product-detail.27421f42.js.map
