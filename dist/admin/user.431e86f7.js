var e=globalThis,t={},a={},r=e.parcelRequire06c3;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){a[e]=t},e.parcelRequire06c3=r),(0,r.register)("1X0hR",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>o,set:void 0,enumerable:!0,configurable:!0});var a=r("fmRoT"),o=class{constructor(e){this.collectionName="users",this.endPoint=e}getUsers=async()=>(await (0,a.default).get(this.endPoint+this.collectionName)).data;getUserId=async()=>{try{let e=(await (0,a.default).get(`${this.endPoint}${this.collectionName}`)).data;if(0===e.length)return"0";return(parseInt(e[e.length-1].id,10)+1).toString()}catch(e){console.log(e)}};getUserById=async e=>(await (0,a.default).get(this.endPoint+this.collectionName+"/"+e)).data;addUser=async e=>{try{return(await (0,a.default).post(this.endPoint+this.collectionName,e)).data}catch(e){console.log(e)}};deleteUser=async e=>{try{return(await (0,a.default).delete(`${this.endPoint}${this.collectionName}/${e}`)).data}catch(e){console.log(e)}};updateUser=async(e,t)=>{try{return(await (0,a.default).put(`${this.endPoint}${this.collectionName}/${e}`,t)).data}catch(e){console.log(e)}}}});var o=r("1X0hR"),n=r("3610C");const l=new o.default(n.default.EndPoint),d=document.querySelector("#showUser"),s=document.querySelector(".form-user-post"),c=document.querySelector("#formUserEdit");let i=null;async function u(e){i=await l.getUserById(e),document.getElementById("usernameUpdate").value=i.username,document.getElementById("passwordUpdate").value=i.password,document.getElementById("roleUpdate").value=i.role,document.getElementById("userId").value=e,showEditForm()}function m(e){let t=`<tr>
    <td>${e.id}</td>
    <td>${e.username}</td>
    <td>${e.password}</td>
    <td>${e.role}</td>
    <td>
        <div class="edit-auth">
            <a href="#" class="edit-btn" data-id="${e.id}">Edit</a>
            <a href="#" class="delete-btn" data-id="${e.id}">Delete</a>
        </div>
    </td> 
</tr>`;d.insertAdjacentHTML("beforeend",t)}d.addEventListener("click",async function(e){if(e.preventDefault(),e.target.matches(".delete-btn")){let t=e.target.getAttribute("data-id");try{await l.deleteUser(t);let a=e.target.closest("tr");console.log(a),a.remove()}catch(e){console.log(e)}}else if(e.target.matches(".edit-btn")){let t=e.target.getAttribute("data-id");try{await u(t)}catch(e){console.log(e)}}}),c.addEventListener("submit",async function(e){e.preventDefault();let t=document.querySelector("#usernameUpdate").value,a=document.querySelector("#passwordUpdate").value,r=document.querySelector("#roleUpdate").value,o=document.querySelector("#userId").value;try{let e=await l.updateUser(o,{username:t,password:a,role:r});closeModalUpdate(),m(e),location.reload(!0)}catch(e){console.log(e)}}),s.addEventListener("submit",async function(e){e.preventDefault();let t=document.querySelector("#username").value,a=document.querySelector("#password").value,r=document.querySelector("#role").value;try{let e=await l.getUserId(),o=await l.addUser({id:e,username:t,password:a,role:r});m(o),closeModal()}catch(e){console.log(e)}}),l.getUsers().then(e=>{console.log(e),e.forEach(e=>{m(e)})});
//# sourceMappingURL=user.431e86f7.js.map
