/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAuth from "../../../hooks/useAuth";

/**
 * Verify existing user token and keep user logged in
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.isAuthenticated ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <p>Loading</p> : <Outlet />;
};

export default PersistLogin;
