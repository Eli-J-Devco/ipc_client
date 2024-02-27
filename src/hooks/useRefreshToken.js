/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import useAuth from "./useAuth";
import { loginService } from "../services/loginService";

/**
 * Refresh token
 * @author nhan.tran 2024-02-26
 * @return Object
 */
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await loginService.refreshToken();
      const userName = JSON.parse(window.sessionStorage.getItem("userName"));
      const permissions = JSON.parse(
        window.sessionStorage.getItem("permissions")
      );

      setAuth({
        userName: userName,
        permissions: permissions,
        accessToken: response.access_token,
        isAuthenticated: true,
      });

      return response.data.accessToken;
    } catch (error) {
      setAuth({
        accessToken: null,
        isAuthenticated: false,
      });
      throw error;
    }
  };
  return refresh;
};

export default useRefreshToken;
