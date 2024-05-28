let t=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];const e=document.querySelector("#showCart"),a=document.querySelector("#sumMoney");function r(){e.innerHTML="",t.forEach(t=>{let a=`<tr id="carts">
      <td class="pro-thumnail">
        <img src="${t.image}" alt="" />
      </td>
      <td class="pro-title">
        <a href="#">${t.name}</a>
      </td>
      <td class="pro-price">$ ${t.price}</td>
      <td class="pro-quantity">
        <button class="sub" data-id="${t.id}">-</button>
        <span>${t.qty}</span>
        <button class="plus" data-id="${t.id}">+</button>
      </td>
      <td class="pro-subtotal">$ ${t.qty*t.price}</td>
      <td class="pro-remove">
        <button class="delete-btn" data-id="${t.id}">
          <i class="fa fa-trash-o" aria-hidden="true"></i> Remove
        </button>
      </td>
    </tr>`;e.insertAdjacentHTML("beforeend",a)}),i()}function i(){let e=0;t.forEach(t=>{e+=t.price*t.qty}),a.innerHTML=`Grand total: $${e}`}r(),e.addEventListener("click",e=>{if(e.target.matches(".delete-btn")){let a=e.target.getAttribute("data-id");console.log(a);let d=t.findIndex(t=>t.id==a);t.splice(d,1),localStorage.setItem("cart",JSON.stringify(t)),r(),i()}}),e.addEventListener("click",e=>{if(e.target.matches(".plus")){let a=e.target.getAttribute("data-id");console.log(a);let d=t.findIndex(t=>t.id==a);t[d].qty+=1,localStorage.setItem("cart",JSON.stringify(t)),r(),i()}}),e.addEventListener("click",e=>{if(e.target.matches(".sub")){let a=e.target.getAttribute("data-id");console.log(a);let d=t.findIndex(t=>t.id==a);t[d].qty>1?t[d].qty-=1:t.splice(d,1),localStorage.setItem("cart",JSON.stringify(t)),r(),i()}});
//# sourceMappingURL=cart.c5dbc849.js.map
