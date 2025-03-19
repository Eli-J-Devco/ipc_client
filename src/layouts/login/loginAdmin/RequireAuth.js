/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useEffect } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Constants from "../../../utils/Constants";
import useAuth from "../../../hooks/useAuth";
import { clearToken, getToken } from "../../../utils/Token";

/**
 * Verify authenticated user
 * @author nhan.tran 2024-02-26
 * @return JSX UI
 */
const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const persist = JSON.parse(localStorage.getItem("persist"));
  const project_id = getToken("project_id");
  const navigate = useNavigate()

  const axiosPrivate = useAxiosPrivate();
  /**
   * Check if user is authenticated and project is existed and persist is existed
   * If not, clear token and redirect to login page
   * @author nhan.tran 2024-03-07
   */
  useEffect(() => {
    if (!auth?.isAuthenticated || !persist || !project_id) {
      clearToken();
      <Navigate to={"/"} state={{ from: location }} replace />
    }
  }, []);

  useEffect(() => {
    const intervaler = setInterval(async () => {
      try {
        const { data } = await axiosPrivate.post(
          Constants.API_URL.AUTH.ME
        );
        if (data && data.status === 0) {
          clearToken()
          navigate("/");
        }
        if (!data) {
          clearToken()
          navigate("/");
        }
        if (localStorage.getItem("email") === null) {
          navigate("/");
        }
      } catch (e) {
        console.log(e)
      }
    }, 3000)
    return () => clearInterval(intervaler)
  }, [])

  return auth?.isAuthenticated && persist && project_id ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
