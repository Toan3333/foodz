import axios from "axios";
class cartService {
  constructor(endPoint) {
    this.collectionName = "cart";
    this.endPoint = endPoint;
  }
  findAllCart = async () => {
    try {
      const response = await axios.get(this.endPoint + this.collectionName);
      console.log("findAllCart response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in findAllCart:", error);
      throw error;
    }
  };

  async getCartItemById(itemId) {
    try {
      const response = await axios.get(`${this.endPoint}${this.collectionName}/${itemId}`);
      console.log(`getCartItemById response for ID ${itemId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in getCartItemById for ID ${itemId}:`, error);
      throw error;
    }
  }

  DeleteCart = async (id) => {
    const response = await axios.delete(this.endPoint + this.collectionName + "/" + id);
    return response.data;
  };

  // Phương thức mới để lấy thông tin chi tiết của sản phẩm
  getProductDetail = async (productId) => {
    try {
      const response = await axios.get(`${this.endPoint}products/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product detail:", error);
      throw error;
    }
  };
  addToCart = async (productId) => {
    try {
      const productDetailPromise = this.getProductDetail(productId);
      const productDetail = await productDetailPromise;

      const response = await axios.post(`${this.endPoint}${this.collectionName}`, {
        id: productId.toString(),
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

  async updateCartItemQuantity(itemId, newQuantity) {
    try {
      const response = await axios.patch(`${this.endPoint}${this.collectionName}/${itemId}`, {
        quantity: newQuantity,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  }
}
export default cartService;
