import blogService from "./services/blogService";
import JsonServerConstants from "./constants/JsonServerConstants";
const blogApi = new blogService(JsonServerConstants.EndPoint);
const showBlog = document.querySelector("#showBlog");
let currentBlog = null;
function renderBlogAdmin(item) {
  const template = `<tr>
  <td>${item.id}</td>
  <td>${item.title}</td>
  <td style="width: 120px;"><img src="${item.image}" alt="" /></td>
  <td>${item.description}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
      <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
    </div>
  </td>
</tr>`;
  showBlog.insertAdjacentHTML("beforeend", template);
}
const formBlogPost = document.querySelector(".form-blog-post");
formBlogPost.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const desc = document.getElementById("desc").value;
  console.log(title);
  try {
    const lastId = await blogApi.getlastId();
    // // Cách 1
    // var newBlog = {
    //   id: lastId,
    //   title: title,
    //   image: image,
    //   description: desc,
    // };
    // const addBlog = await blogApi.addBlog(newBlog);

    // cách 2
    const addBlog = await blogApi.addBlog({
      id: lastId,
      title: title,
      image: image,
      description: desc,
    });
    renderBlogAdmin(addBlog);
    closeModal();
  } catch (error) {
    console.log(error);
  }
});
showBlog.addEventListener("click", async (e) => {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    await blogApi.deleteBlog(id);
    const productRow = e.target.closest("tr");
    productRow.remove();
    try {
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.matches(".edit-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      handleEdit(id);
    } catch (error) {
      console.log(error);
    }
  }
});
async function handleEdit(id) {
  currentBlog = await blogApi.getBlogById(id);
  document.getElementById("titleUpdate").value = currentBlog.title;
  document.getElementById("imageUpdate").value = currentBlog.image;
  document.getElementById("descUpdate").value = currentBlog.description;
  document.getElementById("blogId").value = id;
  showEditForm();
}

const formEditBlog = document.querySelector("#formEditBlog");
formEditBlog.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titleUpdate = document.getElementById("titleUpdate").value;
  const imageUpdate = document.getElementById("imageUpdate").value;
  const descUpdate = document.getElementById("descUpdate").value;
  const id = document.getElementById("blogId").value;
  try {
    const updateBlog = await blogApi.editBlog(id, {
      title: titleUpdate,
      image: imageUpdate,
      description: descUpdate,
    });
    closeModalUpdate();
    renderBlogAdmin(updateBlog);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

blogApi.getBlog().then((data) => {
  console.log(data);
  data.forEach((item) => {
    renderBlogAdmin(item);
  });
});
