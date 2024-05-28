import blogService from "./services/blogService";
import JsonServerConstants from "./constants/JsonServerConstants";
const blogApi = new blogService(JsonServerConstants.EndPoint);
const blogList = document.querySelector(".blog-list");
function renderBlog(item) {
  const template = `<div class="blog-item">
  <div class="blog-image">
    <img src="${item.image}" alt="" />
  </div>
  <div class="blog-content">
    <h3 class="blog-title">${item.title}</h3>
    <div class="blog-desc">
    ${item.description}
    </div>
    <div class="blog-btn">
      <button class="button-primary">READ MORE</button>
    </div>
  </div>
</div>`;
  blogList.insertAdjacentHTML("beforeend", template);
}

blogApi.getBlog().then((data) => {
  data.forEach((item) => {
    renderBlog(item);
  });
});
