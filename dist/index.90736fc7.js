var t=globalThis,a={},e={},i=t.parcelRequire06c3;null==i&&((i=function(t){if(t in a)return a[t].exports;if(t in e){var i=e[t];delete e[t];var s={id:t,exports:{}};return a[t]=s,i.call(s.exports,s,s.exports),s.exports}var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,a){e[t]=a},t.parcelRequire06c3=i),(0,i.register)("594Pg",function(t,a){Object.defineProperty(t.exports,"default",{get:()=>s,set:void 0,enumerable:!0,configurable:!0});var e=i("fmRoT"),s=class{constructor(t){this.collectionName="products",this.endPoint=t}findAllProducts=async()=>(await (0,e.default).get(this.endPoint+this.collectionName)).data;addAllProducts=async t=>(await (0,e.default).post(this.endPoint+this.collectionName,t)).data;getProductById=async t=>(await (0,e.default).get(this.endPoint+this.collectionName+"/"+t)).data;getlastId=async()=>{try{let t=(await (0,e.default).get(`${this.endPoint}${this.collectionName}`)).data;if(0===t.length)return"0";return(parseInt(t[t.length-1].id,10)+1).toString()}catch(t){console.error("Error getting last product ID:",t)}};deleteProduct=async t=>(await (0,e.default).delete(`${this.endPoint}${this.collectionName}/${t}`)).data;updateProduct=async(t,a)=>(await (0,e.default).put(`${this.endPoint}${this.collectionName}/${t}`,a)).data}});var s=i("594Pg"),r=i("3610C");const l=new s.default(r.default.EndPoint),d=document.querySelector(".special-list"),c=document.querySelector("#hot");d.addEventListener("click",async t=>{if(t.target.matches("#orderBtn")){let a=t.target.getAttribute("data-id");console.log(a);let e=await l.getProductById(a);console.log(e);let i=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],s=i.findIndex(t=>t.id==e.id);-1==s?(e.qty=1,i.push(e)):i[s].qty+=1,localStorage.setItem("cart",JSON.stringify(i)),console.log(JSON.parse(localStorage.getItem("cart")))}}),c.addEventListener("click",async t=>{if(t.target.matches("#orderBtn")){let a=t.target.getAttribute("data-id");console.log(a);let e=await l.getProductById(a);console.log(e);let i=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],s=i.findIndex(t=>t.id==e.id);-1==s?(e.qty=1,i.push(e)):i[s].qty+=1,localStorage.setItem("cart",JSON.stringify(i)),console.log(JSON.parse(localStorage.getItem("cart")))}}),l.findAllProducts().then(t=>{console.log(t);let a=t.filter(t=>"special"===t.category),e=t.filter(t=>"hot"===t.category);a.forEach(t=>{!function(t){let a=`<div class="special-item">
  <div class="special-image">
    <a href="/public/pages/product-detail.html?id=${t.id}">
      <img src="${t.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${t.name}</div>
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
    <div class="special-price">$ ${t.price}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn" data-id="${t.id}" >ORDER NOW</button>
    </div>
  </div>
</div>`;d.insertAdjacentHTML("beforeend",a)}(t)}),e.forEach(t=>{!function(t){let a=`<div class="special-item">
    <div class="special-image">
      <a href="/public/pages/product-detail.html?id=${t.id}">
        <img src="${t.image}" alt="" />
      </a>
      <i class="fa fa-heart" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
    </div>
    <div class="special-title">${t.name}</div>
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
      <div class="special-price">$ ${t.price}</div>
      <div class="special-button">
        <button class="button-primary" id="orderBtn" data-id="${t.id}">ORDER NOW</button>
      </div>
    </div>
  </div>`;c.insertAdjacentHTML("beforeend",a)}(t)})});
//# sourceMappingURL=index.90736fc7.js.map
