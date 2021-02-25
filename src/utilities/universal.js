/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: romykundal
 */
import md5 from "md5";
import jwt from "jsonwebtoken";
import config from "config";
import { failAction } from "./response";
import Message from "./messages";
import USERMODEL from "./../collections/user"
const { jwtAlgo, jwtKey, encryptedKey } = config.get("app");
import CryptoJS from "crypto-js";

export const getTimeStamp = () => {
  return Date.now();
};

// password encryption.
export const encryptpassword = password => {
  return md5(password);
};
// Generate random strings.
export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = "",
    keys = "";

  if (alphanumeric) {
    keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@!#$%^&*";
  } else {
    keys = "0123456789";
  }

  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};
/*********** Generate JWT token *************/
export const generateToken = data =>
  jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: "90d" });
/*********** Decode JWT token *************/
export const decodeToken = token => jwt.verify(token, jwtKey);


/*********** Verify token *************/
export const checkTokenAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await USERMODEL.checkToken(token);
  if (user && user.role=="1") {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};

export const checkTokenParticipant = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await USERMODEL.checkToken(token);
  if (user && user.role=="2") {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};

export const checkTokenStaff = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await USERMODEL.checkToken(token);
  if (user && user.role==3) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};


export const checkTokenCommon = async (req, res, next) => {
  const token = req.headers["authorization"];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await USERMODEL.checkToken(token);
  if (user) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};


// data encryption.
export const encryptFunction = data => {

  const key = encryptedKey;
  const keyutf = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Base64.parse(key);
  const enc = CryptoJS.AES.encrypt(data, keyutf, { iv: iv });
  const encStr = enc.toString()

  return encStr;
};

// data decryption.
export const decryptFunction = data => {

  const key = encryptedKey;
  const keyutf = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Base64.parse(key);


  const dec = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(data) },
    keyutf,
    {
        iv: iv
    });
  const decStr = CryptoJS.enc.Utf8.stringify(dec)
  return decStr;
}
