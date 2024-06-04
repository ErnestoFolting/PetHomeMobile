import axios from "axios";
import API_URL from "../Constants/uri"; // https://localhost:7124, empty if docker compose

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 404) {
      console.log('404');
    }
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios(API_URL + "/api/auth/refresh-token", {
          method: "post",
          withCredentials: true
        });
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Non Authorized");
      }
    }
    throw error;
  }
);

export default $api;
