/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { toast } from "react-toastify";
import Constants from "./Constants";

var LibToast = {};

/**
 * string
 * @param str
 * @returns
 */
LibToast.toast = (message, type, pos = "top-right") => {
  let posistion = "top-right";
  if (typeof pos != "undefined") {
    posistion = pos;
  }
  switch (type) {
    case "info":
      toast.info(message, {
        position: posistion,
        autoClose: Constants.TOAST_AUTO_CLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 10,
      });
      break;
    case "error":
      toast.error(message, {
        position: posistion,
        autoClose: Constants.TOAST_AUTO_CLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 10,
      });
      break;
    case "warn":
      toast.warn(message, {
        position: posistion,
        autoClose: Constants.TOAST_AUTO_CLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 10,
      });
      break;
    case "expired":
      toast.warn(message, {
        position: posistion,
        autoClose: Constants.TOAST_AUTO_CLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        draggablePercent: 10,
      });
      break;
    default:
      break;
  }
};

export default LibToast;
