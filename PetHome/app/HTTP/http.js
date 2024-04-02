import axios from "axios";
import API_URL from "../Constants/uri"; // https://localhost:7124, empty if docker compose

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImEzMjgxNWJhLTkyYWQtNDg2Ni1iNzIzLTA2MmRhZjYyZDEwYyIsImp0aSI6ImFkYzg5ZGRkLTUwNTItNDU4Yy1hNmY5LTAzMGI5OTkxNTIyNSIsImV4cCI6MTcxMjA3MDM0NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMjQifQ.4s9micvf1nINq5Fmq2R3UcOC-MXYAwQQ_mdk4aaEmek";

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
        console.log(response);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Non Authorized");
      }
    }
    throw error;
  }
);

export default $api;
