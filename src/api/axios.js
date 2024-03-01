/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import axios from "axios";
import Constants from "../utils/Constants";

// axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: Constants.API_HOST,
  headers: {
    accept: "application/json",
  },
});

export default api;

export const apiUser = axios.create({
  baseURL: Constants.API_HOST,
  headers: {
    accept: "application/json",
  },
});
