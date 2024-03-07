/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

const LoginErrorsList = {
  400: "Missing Username or Password",
  403: "Username or Password is incorrect",
  // 403: "You do not have permission to access this resource",
  500: "Login Failed",
};

const LogoutErrorsList = {
  500: "Logout Failed. Please try again or clear browser cache to securely logout.",
};

const GeneralErrorsList = {
  Ethernet: {
    409: "Duplicate network interface card detected. Please check your network settings.",
  }
};

/**
 * Get the error message when log in from the server response
 * @author nhan.tran 2024-02-26
 * @param {err} error object
 * @return String
 */
export const LoginErrors = (err, msg = null) => {
  if (msg) {
    return msg;
  }
  console.log(err);
  if (!err?.response?.status && err?.message) {
    return err?.message;
  }

  if (!err?.response) {
    return "No Server Response";
  }

  return LoginErrorsList[err.response.status] || "Login Failed";
};

/**
 * Get the error message when log out from the server response
 * @author nhan.tran 2024-02-26
 * @param {err} error object
 * @return String
 */
export const LogoutErrors = (err) => {
  return LogoutErrorsList[500];
};

/**
 * Get the error message when general error from the server response
 * @author nhan.tran 2024-02-26
 * @param {err} error object
 * @param {type} string
 * @return String
 */
export const GeneralErrors = (err, type) => {
  if (!err?.response) {
    return "No Server Response";
  }
  return GeneralErrorsList[type][err.response.status] || "Error";
};