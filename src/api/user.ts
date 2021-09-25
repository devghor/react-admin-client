import { axios } from "../plugins";

class User {
  get() {
    return axios.get("/users");
  }
}

export default new User();
