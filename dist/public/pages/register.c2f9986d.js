var e=globalThis,t={},a={},r=e.parcelRequire06c3;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){a[e]=t},e.parcelRequire06c3=r),(0,r.register)("1X0hR",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>o,set:void 0,enumerable:!0,configurable:!0});var a=r("fmRoT"),o=class{constructor(e){this.collectionName="users",this.endPoint=e}getUsers=async()=>(await (0,a.default).get(this.endPoint+this.collectionName)).data;getUserId=async()=>{try{let e=(await (0,a.default).get(`${this.endPoint}${this.collectionName}`)).data;if(0===e.length)return"0";return(parseInt(e[e.length-1].id,10)+1).toString()}catch(e){console.log(e)}};getUserById=async e=>(await (0,a.default).get(this.endPoint+this.collectionName+"/"+e)).data;addUser=async e=>{try{return(await (0,a.default).post(this.endPoint+this.collectionName,e)).data}catch(e){console.log(e)}};deleteUser=async e=>{try{return(await (0,a.default).delete(`${this.endPoint}${this.collectionName}/${e}`)).data}catch(e){console.log(e)}};updateUser=async(e,t)=>{try{return(await (0,a.default).put(`${this.endPoint}${this.collectionName}/${e}`,t)).data}catch(e){console.log(e)}}}});var o=r("1X0hR"),n=r("3610C");const s=new o.default(n.default.EndPoint);document.querySelector("#registerForm").addEventListener("submit",async function(e){e.preventDefault();let t=document.querySelector("#username").value,a=document.querySelector("#password").value;try{let e=await s.getUserId();await s.addUser({id:e,username:t,password:a,role:"user"}),location.reload(!0)}catch(e){console.log(e)}}),s.getUsers().then(e=>{console.log(e)});
//# sourceMappingURL=register.c2f9986d.js.map
