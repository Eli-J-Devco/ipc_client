/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../../../hooks/useRefreshToken";
import useAuth from "../../../hooks/useAuth";

import LibToast from "../../../utils/LibToast";
import { LoginErrors } from "../../../utils/Errors";
import { clearToken } from "../../../utils/Token";
import { loginService } from "../../../services/loginService";

/**
 * Verify existing user token and keep user logged in
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuth } = useAuth();
  const refresh = useRefreshToken();
  const persist = window.localStorage.getItem("persist");

  useEffect(() => {
    const output = document.getElementById("progress");
    const verifyRefreshToken = async () => {
      try {
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        await refresh();
      } catch (err) {
        if (!loginService.handleMissingInfo(err)) {
          LibToast.toast(LoginErrors(err), "error");
          // setAuth({
          //   accessToken: null,
          //   isAuthenticated: false,
          // });
          // clearToken();
        }
      } finally {
        setIsLoading(false);
        output.innerHTML = "";
      }
    };

    persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <p></p> : <Outlet />;
};

export default PersistLogin;
