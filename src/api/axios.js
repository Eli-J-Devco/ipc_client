/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import axios from "axios";
import Constants from "../utils/Constants";

axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: Constants.API_HOST,
});

export const privateAxios = axios.create({
  baseURL: Constants.API_HOST,
  headers: { "Content-Type": "application/json" },
});
