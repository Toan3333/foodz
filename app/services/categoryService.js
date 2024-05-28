import axios from "axios";
class CategoryService {
  constructor(endPoint) {
    this.collectionName = "categories";
    this.endPoint = endPoint;
  }
  getCategory = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  addCategories = async (newCategory) => {
    const response = await axios.post(this.endPoint + this.collectionName, newCategory);
    return response.data;
  };
  getCategoryById = async (categoryId) => {
    const response = await axios.get(this.endPoint + this.collectionName + "/" + categoryId);
    return response.data;
  };
  getlastId = async () => {
    try {
      const response = await axios.get(`${this.endPoint}${this.collectionName}`);
      const category = response.data;
      if (category.length === 0) {
        return "0";
      }
      return (parseInt(category[category.length - 1].id, 10) + 1).toString();
    } catch (error) {
      console.log(error);
    }
  };
  deleteCategories = async (id) => {
    const response = await axios.delete(`${this.endPoint}${this.collectionName}/${id}`);
    return response.data;
  };

  editCategory = async (categoryId, newUpdateCategory) => {
    try {
      const response = await axios.put(
        `${this.endPoint}${this.collectionName}/${categoryId}`,
        newUpdateCategory
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
export default CategoryService;
