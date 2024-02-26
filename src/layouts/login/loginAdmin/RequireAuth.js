/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

/**
 * Verify authenticated user
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const persist = JSON.parse(localStorage.getItem("persist"));

  return auth?.isAuthenticated && persist ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
