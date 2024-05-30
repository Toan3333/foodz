import axios from "axios";

class productService {
  constructor(endPoint) {
    this.collectionName = "products";
    this.endPoint = endPoint;
  }
  findAllProducts = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  addAllProducts = async (newProduct) => {
    const response = await axios.post(this.endPoint + this.collectionName, newProduct);
    return response.data;
  };
  getProductById = async (id) => {
    const response = await axios.get(this.endPoint + this.collectionName + "/" + id);
    return response.data;
  };
  getlastId = async () => {
    try {
      const response = await axios.get(`${this.endPoint}${this.collectionName}`);
      const products = response.data;
      if (products.length === 0) {
        return "0";
      }
      return (parseInt(products[products.length - 1].id, 10) + 1).toString();
    } catch (error) {
      console.error("Error getting last product ID:", error);
    }
  };

  deleteProduct = async (productId) => {
    const response = await axios.delete(`${this.endPoint}${this.collectionName}/${productId}`);
    return response.data;
  };
  updateProduct = async (productId, updatedProduct) => {
    const response = await axios.put(
      `${this.endPoint}${this.collectionName}/${productId}`,
      updatedProduct
    );
    return response.data;
  };
}
export default productService;
