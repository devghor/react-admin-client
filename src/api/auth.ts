import { axios } from "../plugins";

class Auth {
  login(payload) {
    return axios.post("/login", payload)
  }
}

export default new Auth();