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

/**
 * Verify existing user token and keep user logged in
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const persist = window.localStorage.getItem("persist");

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        const msg = LoginErrors(err, "Pleases login to continue.");
        LibToast.toast(msg, "info");
        clearToken();
        setAuth({
          accessToken: null,
          isAuthenticated: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.isAuthenticated && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? <p>Loading</p> : <Outlet />;
};

export default PersistLogin;
