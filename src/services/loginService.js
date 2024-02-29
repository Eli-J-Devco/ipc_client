/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import axios from "../api/axios";
import Constants from "../utils/Constants";
import { LogoutErrors } from "../utils/Errors";
import { clearToken } from "../utils/Token";

import { jwtDecode } from "jwt-decode";

export const loginService = {
  /**
   * Login to the system
   * @author nhan.tran 2024-02-26
   * @param {data} username and password
   * @param {output} progress tag in html
   * @return Object{user, screen, role, accessToken}
   */
  async login(data, output) {
    const response = await axios.post(Constants.API_URL.AUTH.LOGIN, data, {
      onUploadProgress: ({ loaded, total, progress }) => {
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
      },
    });

    if (response.data.access_token) {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const claim = jwtDecode(access_token);

      window.sessionStorage.setItem("claim", JSON.stringify(claim));
      window.sessionStorage.setItem("rft", refresh_token);

      return {
        userName: `${response.data.first_name} ${response.data.last_name}`,
        email: response.data.email,
        permissions: response.data.permissions,
        accessToken: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
    }
    return false;
  },

  /**
   * Get new access token by refresh token
   * @author nhan.tran 2024-02-26
   * @param {data} refresh token
   * @return Object
   */
  refreshToken(params) {
    const response = axios({
      method: "post",
      url: Constants.API_URL.AUTH.REFRESH,
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  /**
   * Log out of the system
   * @author nhan.tran 2024-02-26
   * @param {output} progress tag in html
   * @return Boolean
   */
  async logout(output) {
    try {
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
      const res = await axios.post(Constants.API_URL.AUTH.LOGOUT);
      if (res.status === 200) {
        clearToken();
      }
      return true;
    } catch (error) {
      throw new Error(LogoutErrors(error));
    }
  },
};
