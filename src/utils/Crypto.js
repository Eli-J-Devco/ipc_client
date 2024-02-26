/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

// import CryptoJS from 'crypto-js';
var CryptoJS = require("crypto-js");

var CryptoLib = function () {};
module.exports = CryptoLib;

/**
 * AES Encrypt plain string to AES string
 * @param {*} str
 * @return string
 */
// CryptoLib.AESEncrypt = function AESEncrypt(str, salt) {
//     return CryptoJS.AES.encrypt(str, salt, { iv: Buffer.alloc(16,0), asBytes: true, }).toString();
// }

// /**
//  * AES Decrypt plain string to AES string
//  * @param {*} str
//  * @return string
//  */
// CryptoLib.AESDecrypt = function AESDecrypt(str, secretKey) {
//     var bytes = CryptoJS.AES.decrypt(str.toString('hex'), secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
// }

/**
 * AES Encrypt plain string to AES string
 * @param {*} str
 * @return string
 */
CryptoLib.AESEncrypt = function AESEncrypt(str, secretKey) {
  var string = CryptoJS.AES.encrypt(str, secretKey).toString();
  return string;
};

/**
 * AES Decrypt plain string to AES string
 * @param {*} str
 * @return string
 */
CryptoLib.AESDecrypt = function AESDecrypt(str, secretKey) {
  var bytes = CryptoJS.AES.decrypt(str.toString(), secretKey);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};
