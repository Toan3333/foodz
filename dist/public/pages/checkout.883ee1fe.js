let e;var t=globalThis,a={},o={},r=t.parcelRequire06c3;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var c=Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){o[e]=t},t.parcelRequire06c3=r),(0,r.register)("emXng",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>o,set:void 0,enumerable:!0,configurable:!0});var a=r("fmRoT"),o=class{constructor(e){this.collectionName="order",this.endPoint=e}getOrder=async()=>(await (0,a.default).get(this.endPoint+this.collectionName)).data;addOrder=async e=>(await (0,a.default).post(this.endPoint+this.collectionName,e)).data;deleteOrder=async e=>(await (0,a.default).delete(`${this.endPoint}${this.collectionName}/${e}`)).data}});var c=r("emXng"),n=r("3610C");const l=new c.default(n.default.EndPoint),i=new Date,d=`${i.getDate().toString().padStart(2,"0")}-${(i.getMonth()+1).toString().padStart(2,"0")}-${i.getFullYear()}`;let s=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];console.log(s);const u=document.querySelector("#checkout-list"),g=document.querySelector("#totolCheckout");console.log(u),s.forEach(e=>{let t=`<div class="checkout-detail__box-item">
    <div class="checkout-detail__box-image">
      <img src="${e.image}" alt="" />
    </div>
    <div class="checkout-detail__box-body">
      <div class="checkout-detail__box-name">${e.name}</div>
      <div class="checkout-detail__box-price">$ ${e.price}</div>
      <div class="checkout-detail__box-quantity">
        <span class="quantity-checkout">Quantity: ${e.qty}</span>
      </div>
    </div>
  </div>`;u.insertAdjacentHTML("beforeend",t)}),e=0,s.forEach(t=>{e+=t.price*t.qty}),g.innerHTML=`$ ${e}`;const m=s.reduce((e,t)=>e+t.price*t.qty,0);document.querySelector(".form-order").addEventListener("submit",async e=>{e.preventDefault();let t=document.getElementById("name").value,a=document.getElementById("phone").value,o=document.getElementById("address").value,r=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];try{await l.addOrder({name:t,phone:a,address:o,orderDate:d,status:"Pending",totalAmount:m,products:r}),localStorage.removeItem("cart"),alert("Đơn hàng đã được tạo thành công!")}catch(e){console.log(e),alert("Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.")}});
//# sourceMappingURL=checkout.883ee1fe.js.map
