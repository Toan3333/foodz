var t=globalThis,e={},a={},i=t.parcelRequire06c3;null==i&&((i=function(t){if(t in e)return e[t].exports;if(t in a){var i=a[t];delete a[t];var o={id:t,exports:{}};return e[t]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){a[t]=e},t.parcelRequire06c3=i),(0,i.register)("e5SIn",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>o,set:void 0,enumerable:!0,configurable:!0});var a=i("fmRoT"),o=class{constructor(t){this.collectionName="blog",this.endPoint=t}getBlog=async()=>(await (0,a.default).get(this.endPoint+this.collectionName)).data;addBlog=async t=>(await (0,a.default).post(this.endPoint+this.collectionName,t)).data;deleteBlog=async t=>(await (0,a.default).delete(`${this.endPoint}${this.collectionName}/${t}`)).data;getBlogById=async t=>(await (0,a.default).get(this.endPoint+this.collectionName+"/"+t)).data;editBlog=async(t,e)=>{try{return(await (0,a.default).put(`${this.endPoint}${this.collectionName}/${t}`,e)).data}catch(t){console.log(t)}};getlastId=async()=>{try{let t=(await (0,a.default).get(`${this.endPoint}${this.collectionName}`)).data;if(0===t.length)return"0";return(parseInt(t[t.length-1].id,10)+1).toString()}catch(t){console.log(t)}}}});var o=i("e5SIn"),n=i("3610C");const l=new o.default(n.default.EndPoint),s=document.querySelector(".blog-list");l.getBlog().then(t=>{t.forEach(t=>{!function(t){let e=`<div class="blog-item">
  <div class="blog-image">
    <img src="${t.image}" alt="" />
  </div>
  <div class="blog-content">
    <h3 class="blog-title">${t.title}</h3>
    <div class="blog-desc">
    ${t.description}
    </div>
    <div class="blog-btn">
      <button class="button-primary">READ MORE</button>
    </div>
  </div>
</div>`;s.insertAdjacentHTML("beforeend",e)}(t)})});
//# sourceMappingURL=index.d10e313c.js.map
