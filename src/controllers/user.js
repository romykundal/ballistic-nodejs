/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: romykundal
 */

import { successAction, failAction } from "../utilities/response";
import * as SERVICE from "../services/user";
import Message from "../utilities/messages";


export const getAllUser = async (req, res, next) => {
  res.status(200).json({"message":"ok"})
};

/**************** Add User ***********/
export const addParticipants = async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  try {
    const result = await SERVICE.save(payload, user);
    res.status(200).json(successAction(result, Message.userAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Login user ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await SERVICE.onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/** Forgot pasword **/
export const forgotPassword = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await SERVICE.paswordForgot(payload);
    res.json(successAction(data, Message.emailSend));
  } catch (error) {
    res.json(failAction(error.message));
  }
};
/**************** Logout user ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await SERVICE.logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update User ***********/
export const updateProfile = async (req, res, next) => {
  const payload = req.body;
  const user = req.user
  try {
    const rest = await SERVICE.updateProfile(payload, user);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const getProfile = async (req, res, next) => {
  const payload = req.user;
  try {
    const rest = await SERVICE.getProfile(payload);
    res.status(200).json(successAction(rest, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
}

export const checkCurrentPassword = async (req, res, next) => {
  try {
    const payload = req.body;
    payload['_id'] = req.user.userId;
    const data = await SERVICE.checkCurrentPassword(payload);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(failAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};


/*** chnage pasword **/
export const changePassword = async (req, res, next) => {
  let payload = req.body;
  let query = { _id: req.user.userId };
  try {
    const data = await SERVICE.changePassword(query, payload);
    res.json(successAction(null, Message.passwordUpdated));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/* Update User based on id */
export const updateStatus = async (req, res, next) => {
  try {
    const data = await SERVICE.updateStatus(req.body);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};

/* Remove Promotion based on id */
export const remove = async (req, res, next) => {
  try {
    const data = await SERVICE.remove(req.params);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};


export const getById = async (req, res, next) => {
  try {
    const data = await SERVICE.get(req.params);
    if (data) {
      res.json(successAction(data, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.json(failAction(error.message));
  }
};
