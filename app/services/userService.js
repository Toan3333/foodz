import axios from "axios";
class userService {
  constructor(endPoint) {
    this.collectionName = "users";
    this.endPoint = endPoint;
  }

  getUsers = async () => {
    const response = await axios.get(this.endPoint + this.collectionName);
    return response.data;
  };
  getUserId = async () => {
    try {
      const response = await axios.get(`${this.endPoint}${this.collectionName}`);
      const user = response.data;
      if (user.length === 0) {
        return "0";
      }
      return (parseInt(user[user.length - 1].id, 10) + 1).toString();
    } catch (error) {
      console.log(error);
    }
  };
  getUserById = async (id) => {
    const response = await axios.get(this.endPoint + this.collectionName + "/" + id);
    return response.data;
  };
  addUser = async (newUser) => {
    try {
      const response = await axios.post(this.endPoint + this.collectionName, newUser);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${this.endPoint}${this.collectionName}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  updateUser = async (id, newUserUpdate) => {
    try {
      const response = await axios.put(
        `${this.endPoint}${this.collectionName}/${id}`,
        newUserUpdate
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
export default userService;
