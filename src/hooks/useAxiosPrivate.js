/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import apiUser from "../api/axios";
import { useEffect } from "react";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axios from "../api/axios";

/**
 * Create private call for axios
 * @author nhan.tran 2024-02-26
 * @return Object
 */
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiUser.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = apiUser.interceptors.response.use(
      (response) => response,
      async (error) => {
        var prevRequest = error?.config;

        console.log("Refreshing token", prevRequest?.sent ? 2 : 1, "time");
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("Retry refreshing token");
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          console.log("New access token", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        throw new Error(error);
      }
    );

    return () => {
      apiUser.interceptors.request.eject(requestIntercept);
      apiUser.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiUser;
};

export default useAxiosPrivate;
