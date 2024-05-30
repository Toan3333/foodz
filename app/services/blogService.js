import axios from "axios";

class blogService {
  constructor(endPoint) {
    this.collectionName = "blog";
    this.endPoint = endPoint;
  }
  getBlog = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  addBlog = async (newBlog) => {
    const response = await axios.post(this.endPoint + this.collectionName, newBlog);
    return response.data;
  };
  deleteBlog = async (id) => {
    const response = await axios.delete(`${this.endPoint}${this.collectionName}/${id}`);
    return response.data;
  };
  getBlogById = async (id) => {
    const response = await axios.get(this.endPoint + this.collectionName + "/" + id);
    return response.data;
  };
  editBlog = async (id, newUpdateBlog) => {
    try {
      const response = await axios.put(
        `${this.endPoint}${this.collectionName}/${id}`,
        newUpdateBlog
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  getlastId = async () => {
    try {
      const response = await axios.get(`${this.endPoint}${this.collectionName}`);
      const blog = response.data;
      if (blog.length === 0) {
        return "0";
      }
      return (parseInt(blog[blog.length - 1].id, 10) + 1).toString();
    } catch (error) {
      console.log(error);
    }
  };
}
export default blogService;
