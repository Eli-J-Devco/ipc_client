import axios from "axios";
import Constants from "../utils/Constants";

export default axios.create({
  baseURL: Constants.API_HOST,
});

export const privateAxios = axios.create({
  baseURL: Constants.API_HOST,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
