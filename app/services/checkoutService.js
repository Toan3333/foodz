import axios from "axios";
class checkoutServer {
  constructor(endPoint) {
    this.collectionName = "checkout";
    this.endPoint = endPoint;
  }
  findAllCheckout = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  getProductDetail = async (id) => {
    try {
      const response = await axios.get(`${this.endPoint}cart/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product detail:", error);
      throw error;
    }
  };
  addToCheckout = async (id) => {
    try {
      const productDetail = await this.getProductDetail(id);
      const response = await axios.post(`${this.endPoint}${this.collectionName}`, {
        id: id.toString(),
        name: productDetail.name,
        image: productDetail.image,
        price: productDetail.price,
        category: productDetail.category,
      });
      return { ...response.data, productDetail };
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };
}
export default checkoutServer;
