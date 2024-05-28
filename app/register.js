import userService from "./services/userService";
import JsonServerConstants from "./constants/JsonServerConstants";
const userApi = new userService(JsonServerConstants.EndPoint);

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  try {
    const userId = await userApi.getUserId();
    const newUser = {
      id: userId,
      username: username,
      password: password,
      role: "user",
    };
    await userApi.addUser(newUser);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

userApi.getUsers().then((data) => {
  console.log(data);
});
