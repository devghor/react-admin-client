import * as xhr from "axios";
import { constValue, statusValue } from "../values";

import { store } from "../redux/store"; 
import { logout } from "../redux/authSlice";

const axios = xhr.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers.authorization =
      "Bearer " + localStorage.getItem(constValue.TOKEN_KEY);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === statusValue.HTTP_UNAUTHORIZED) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axios;
