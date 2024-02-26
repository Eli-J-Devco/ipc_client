/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

const LoginErrorsList = {
  400: "Missing Username or Password",
  401: "Username or Password is incorrect",
  403: "Username or Password is incorrect",
  500: "Login Failed",
};

const TokenErrorsList = {
  400: "Invalid Token",
  401: "Invalid Token",
};

/**
 * Get the error message from the server response
 * @author nhan.tran 2024-02-26
 * @param {err} error object
 * @return String
 */
export const LoginErrors = (err) => {
  if (!err?.response) {
    return "No Server Response";
  }
  return LoginErrorsList[err.response.status] || "Login Failed";
};
