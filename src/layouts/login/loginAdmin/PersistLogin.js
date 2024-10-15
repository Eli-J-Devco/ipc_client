/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../../../hooks/useRefreshToken";

import { loginService } from "../../../services/loginService";

/**
 * Verify existing user token and keep user logged in
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const persist = window.localStorage.getItem("persist");

  useEffect(() => {
    const output = document.getElementById("progress");
    const verifyRefreshToken = async () => {
      try {
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        await refresh();
      } catch (err) {
        loginService.handleMissingInfo(err);
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
