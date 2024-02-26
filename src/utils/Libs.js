/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

var Libs = {};

/**
 * trim string
 * @param str
 * @returns
 */
Libs.safeTrim = (str) => {
  try {
    return typeof str === "string" ? str.trim() : str.toString();
  } catch (e) {
    return "";
  }
};

/**
 * check blank object or string
 * @param str
 * @returns {Boolean}
 */
Libs.isBlank = (str) => {
  if (typeof str === undefined || str === null || Libs.safeTrim(str) === "") {
    return true;
  }

  return false;
};

/**
 * Check valid object
 * @param {*} obj
 */
Libs.isObjectEmpty = (obj) => {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj !== "object") return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

/**
 * Find objects in arrays by value and field
 * @param items
 * @param field
 * @param value
 * @returns
 */
Libs.find = function (items, field, value) {
  if (!items) return null;
  for (var i = 0; i < items.length; i++) {
    if (value === items[i][field]) {
      return items[i];
    }
  }
  return null;
};

/**
 * @description Check the array data
 * @param Array arr
 * @author: Luyen Nguyen
 * @return boolean
 */
Libs.isArrayData = function (arr) {
  if (Libs.isBlank(arr)) return false;
  if (!Array.isArray(arr) || arr.length <= 0) return false;
  return true;
};

Libs.AESEncrypt = function (plainText, secretKey) {
  if (typeof plainText === "undefined" || typeof secretKey === "undefined") {
    return plainText;
  }
  var CryptoLib = require("./Crypto.js");
  return CryptoLib.AESEncrypt(plainText, secretKey);
};

Libs.AESDecrypt = function (plainText, secretKey) {
  if (typeof plainText === "undefined" || typeof secretKey === "undefined") {
    return plainText;
  }
  var CryptoLib = require("./Crypto.js");
  return CryptoLib.AESDecrypt(plainText, secretKey);
};

export default Libs;
