import axios from "../api/axios";
import Constants from "../utils/Constants";
import { clearToken } from "../utils/Token";

import { jwtDecode } from "jwt-decode";

export const loginService = {
  async login(data, output) {
    const response = await axios.post(Constants.API_URL.AUTH, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total, progress }) => {
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
      },
    });

    if (response.data.access_token) {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const claim = jwtDecode(access_token);

      window.sessionStorage.setItem("claim", JSON.stringify(claim));
      window.sessionStorage.setItem("refresh", JSON.stringify(refresh_token));

      return {
        user: response.data.user,
        screen: response.data.screen,
        role: response.data.role,
        accessToken: response.data.access_token,
      };
    }
    return false;
  },

  async refreshToken(data) {
    return axios.post(Constants.API_URL.REFRESH, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },

  logout() {
    clearToken();
  },
};
