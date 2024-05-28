import productsFireBaseService from "./services/productsFireBase";
import fireBaseConstants from "./constants/fireBaseConstants";
const productFireBaseApi = new productsFireBaseService(fireBaseConstants.FireBaseEndPoint);
productFireBaseApi.getProduct().then((data) => {
  console.log(data);
});
