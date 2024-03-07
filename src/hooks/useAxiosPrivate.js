/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { apiUser } from "../api/axios";
import { useEffect } from "react";
import { AxiosError, HttpStatusCode } from "axios";

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
    /**
     * Add token to header request
     * @author nhan.tran 2024-03-01
     * @param {config} config
     * @return Object
     */
    const requestIntercept = apiUser.interceptors.request.use(
      (config) => {
        var project_id = sessionStorage.getItem("project_id");
        const controller = new AbortController();
        config.signal = controller.signal;
        if (!project_id) {
          controller.abort(new AxiosError("Project ID is not found", HttpStatusCode.NotFound));
        }
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    /** 
     * Refresh token when 401 error occurs
     * @author nhan.tran 2024-03-01
     * @param {error} error
     * @return Object
    */
    const responseIntercept = apiUser.interceptors.response.use(
      (response) => response,
      async (error) => {
        var prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
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
