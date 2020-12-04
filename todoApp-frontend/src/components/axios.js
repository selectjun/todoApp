import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((requestConfig) => {
  const xAuthToken = sessionStorage.getItem("xAuthToken");
  requestConfig.headers["X-AUTH-TOKEN"] = xAuthToken;
  return requestConfig;
});

API.interceptors.response.use(
  (response) => {
    console.log(response);
    const authorization = response.headers["x-auth-token"];
    if (authorization) {
      sessionStorage.setItem("xAuthToken", authorization);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // console.warn(error.response);
      // console.log(error.response.data ? error.response.data.message : "");
    }
  }
);

export { API };