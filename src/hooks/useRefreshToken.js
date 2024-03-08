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
    const params = {
      refresh_token: window.localStorage.getItem("rft"),
    };

    const response = await loginService.refreshToken(params);
    const userName = JSON.parse(window.localStorage.getItem("userName"));
    const permissions = JSON.parse(
      window.localStorage.getItem("permissions")
    );
    setAuth({
      userName: userName,
      permissions: permissions,
      accessToken: response.data.access_token,
      isAuthenticated: response.data.access_token ? true : false,
    });

    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
