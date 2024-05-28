import axios from "axios";
class orderService {
  constructor(endPoint) {
    this.collectionName = "order";
    this.endPoint = endPoint;
  }
  getOrder = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  addOrder = async (createOrder) => {
    const response = await axios.post(this.endPoint + this.collectionName, createOrder);
    return response.data;
  };
  deleteOrder = async (id) => {
    const response = await axios.delete(`${this.endPoint}${this.collectionName}/${id}`);
    return response.data;
  };
}
export default orderService;
