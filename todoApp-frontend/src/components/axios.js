import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((requestConfig) => {
  const xAuthToken = sessionStorage.getItem("xAuthToken");
  requestConfig.headers["X-AUTH-TOKEN"] = `${xAuthToken}`;
  return requestConfig;
});

API.interceptors.response.use(
  (response) => {
    const authorization = response.headers["x-auth-token"];
    if (authorization) {
      sessionStorage.setItem("xAuthToken", authorization);
    }
    return response;
  },
  (error) => {
    const response = error.response;
    if (response) {
      if (response.status === 403) {
        alert(response.data.message);
        sessionStorage.setItem("xAuthToken", "");
        window.location.href = "/login";
      } else if (response.status === 404) {
        alert("파일이 존재하지 않습니다");
        return Promise.reject(error);
      } else {
        alert(response.data.message);
        return Promise.reject(error);
      }
    }
  }
);

export { API };