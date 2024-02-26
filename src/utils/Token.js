/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
export const TOKEN_STORAGE_KEY = "token";

/**
 * Set token to session storage
 * @author nhan.tran 2024-02-26
 * @param {data} token
 */
export const setToken = (data) => {
  window.sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data));
};

/**
 * Get token from session storage
 * @author nhan.tran 2024-02-26
 * @return String
 */
export const getToken = () => {
  if (typeof window !== "undefined") {
    let token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      token = JSON.parse(token);
    }

    return token;
  } else {
    return null;
  }
};

/**
 * Get refresh token from session storage
 * @author nhan.tran 2024-02-26
 * @return String
 */
export const getRefresh = () => {
  if (typeof window !== "undefined") {
    let token = window.sessionStorage.getItem("refresh");
    if (token) {
      token = JSON.parse(token);
    }
    return token;
  } else {
    return null;
  }
};

/**
 * Clear token from session storage and local storage
 * @author nhan.tran 2024-02-26
 */
export const clearToken = () => {
  window.localStorage.removeItem("persist");
  window.sessionStorage.removeItem("claim");
  window.sessionStorage.removeItem("refresh");
};
