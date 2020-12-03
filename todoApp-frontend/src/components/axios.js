import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((requestConfig) => {
    const XAuthToken = sessionStorage.getItem("XAuthToken");
    requestConfig.headers["X-Auth-Token"] = XAuthToken;
  return requestConfig;
});

API.interceptors.response.use(
  (response) => {
    const authorization = response.headers["x-auth-token"];
    if (authorization) {
      sessionStorage.setItem("XAuthToken", authorization);
    }
    return response;
  },
  (error) => {
    if (error.response) {
    //   console.warn(error.response);
    //   console.log(error.response.data ? error.response.data.message : "");
    }
  }
);

export { API };