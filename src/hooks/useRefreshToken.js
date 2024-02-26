/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import useAuth from "./useAuth";
import { getRefresh } from "../utils/Token";
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
      const param = {
        refresh_token: getRefresh(),
      };

      if (!param.refresh_token) {
        throw new Error("Refresh token is not available");
      }

      const response = await loginService.refreshToken(param);
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.access_token,
          isAuthenticated: true,
        };
      });

      return response.data.accessToken;
    } catch (error) {
      setAuth({
        accessToken: null,
        isAuthenticated: false,
      });
      return false;
    }
  };
  return refresh;
};

export default useRefreshToken;
