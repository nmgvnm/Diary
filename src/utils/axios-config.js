import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh-token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // 토큰이 만료되었으므로 갱신
        try {
          const res = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/auth/refresh-token`, { refreshToken });
          token = res.data.accessToken;
          localStorage.setItem("token", token);
          config.headers["x-auth-token"] = token;
        } catch (error) {
          console.error("Unable to refresh token:", error);
          localStorage.removeItem("token"); // 토큰 제거
          localStorage.removeItem("refresh-token"); // 리프레시 토큰 제거
          alert("세션 만료. 재로그인 해주세요.");
          window.location.href = "/login";
        }
      } else {
        config.headers["x-auth-token"] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
