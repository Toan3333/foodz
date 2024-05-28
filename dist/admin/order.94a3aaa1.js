var e=globalThis,t={},r={},d=e.parcelRequire06c3;null==d&&((d=function(e){if(e in t)return t[e].exports;if(e in r){var d=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,d.call(a.exports,a,a.exports),a.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},e.parcelRequire06c3=d),(0,d.register)("emXng",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>a,set:void 0,enumerable:!0,configurable:!0});var r=d("fmRoT"),a=class{constructor(e){this.collectionName="order",this.endPoint=e}getOrder=async()=>(await (0,r.default).get(this.endPoint+this.collectionName)).data;addOrder=async e=>(await (0,r.default).post(this.endPoint+this.collectionName,e)).data;deleteOrder=async e=>(await (0,r.default).delete(`${this.endPoint}${this.collectionName}/${e}`)).data}});var a=d("emXng"),o=d("3610C");const n=new a.default(o.default.EndPoint),i=document.querySelector("#showOrder");i.addEventListener("click",async function(e){if(e.preventDefault(),e.target.matches(".delete-btn")){let t=e.target.getAttribute("data-id");try{await n.deleteOrder(t),e.target.closest("tr").remove()}catch(e){console.error("Error deleting product:",e)}}}),n.getOrder().then(e=>{console.log(e),e.forEach(e=>{!function(e){let t=`<tr>
  <td>${e.id}</td>
  <td>${e.name}</td>
  <td class="order-address">${e.address}</td>
  <td>${e.orderDate}</td>
  <td>$ ${e.totalAmount}</td>
  <td style="color: red">${e.status}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="delete-btn" data-id="${e.id}">Delete</a>
    </div>
  </td>
</tr>`;i.insertAdjacentHTML("beforeend",t)}(e)})});
//# sourceMappingURL=order.94a3aaa1.js.map
