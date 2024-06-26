import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 명명된 익스포트로 변경


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // 토큰이 만료되었으므로 갱신
        try {
          const res = await axios.post("/refresh-token", { refreshToken });
          token = res.data.accessToken;
          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Unable to refresh token:", error);
          // 토큰 갱신 실패 시 로그아웃 등의 처리
        }
      }
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
