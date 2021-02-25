/*
 * @file: USERMODEL.js
 * @description: It Contain function layer for user service.
 * @author: romykundal
 */

import mongoose from "mongoose";
import USERMODEL from "../collections/user";
import Message from "../utilities/messages";
import {
  encryptpassword,
  generateToken,
  generateRandom,
  getTimeStamp,
  encryptFunction,
  decryptFunction
} from "../utilities/universal";
import * as Mail from "../utilities/mail";


/********** Save users **********/
export const save = async (payload, user) => {
  if (payload && payload.role && payload.role == "1")
    throw new Error(Message.unauthorizedUser);
  const email = payload.email.toLowerCase();
  payload.email = payload.email.toLowerCase();
  const encryptemail = await encryptFunction(payload.email);
  const userExists = await USERMODEL.checkEmail(encryptemail);
  if (userExists) throw new Error(Message.emailAlreadyExists);
  const userExist = await USERMODEL.checkParticipantId(payload.participentId);
  if(userExist) throw new Error(Message.participantId);
  const pwd = payload.password;
  payload["email"] = await encryptFunction(payload.email.toLowerCase())
  payload["password"] = await encryptpassword(payload.password);
  payload["fname"] = await encryptFunction(payload.fname)
  let saveData = await USERMODEL.saveUser(payload);

  /***************** verificatiopn email ****************/
  const result = await Mail.htmlFromatWithObject({
    pwd: pwd,
    emailTemplate: "user-account",
    email: email, //newely added
    data: saveData,
    name:await decryptFunction(saveData.fname),

  });


  const emailData = {
    to:await decryptFunction(saveData.email),
    subject: Mail.subjects.registerRequest,
    html: result.html,
    templateId: "user-account",
  };

  Mail.SENDEMAIL(emailData, function (err, res) {
    if (err)
      console.log(
        "-----@@----- Error at sending verify mail to user -----@@-----",
        err
      );
    else
      console.log(
        "-----@@----- Response at sending verify mail to user -----@@-----",
        res
      );
  });

  return {
    _id: saveData._id,
    email:await decryptFunction(saveData.email),
    role: saveData.role,
    fname:await decryptFunction(saveData.fname),
    participentId: saveData.participentId
  };
};

/********** Login users **********/
export const onLogin = async payload => {
  payload["email"] = payload.email.toLowerCase();
  const userData = await USERMODEL.findOneByCondition({
    email:await encryptFunction(payload.email),
    role: payload.role,
    password:await encryptpassword(payload.password)
  });
  if (!userData) throw new Error(Message.invalidCredentials);

  const userData1 = await USERMODEL.findOneByCondition({email:await encryptFunction(payload.email), password:await encryptpassword(payload.password), isDeleted:true})
  if (userData1) throw new Error(Message.accountDeleted);

  const userData2 = await USERMODEL.findOneByCondition({email: await encryptFunction(payload.email), password:await encryptpassword(payload.password), status:false})
  if (userData2) throw new Error(Message.userBlocked);

  let loginToken = generateToken({
    when: getTimeStamp(),
    lastLogin: userData.lastLogin,
    userId: userData._id,
    role: userData.role,
  });
  const data = await USERMODEL.onLoginDone(userData._id, loginToken);
  const query = {user_id : userData._id };
  if (data1) {
    return {
      _id: data._id,
      email:await decryptFunction(data.email),
      loginToken:await data.loginToken[data.loginToken.length - 1].token,
      lastLogin: data.lastLogin,
      role: data.role,
      fname:await decryptFunction(data.fname),
      participentId: data.participentId,
      image: data.image,
      status: data.status,
      isDeleted: data.isDeleted,
      // rewardPoints: 0,
      question_status: data1.question_status ? data1.question_status : false
    };
  } else {
    return {
      _id: data._id,
      email:await decryptFunction(data.email),
      loginToken: data.loginToken[data.loginToken.length - 1].token,
      lastLogin: data.lastLogin,
      role: data.role,
      fname:await decryptFunction(data.fname),
      participentId: data.participentId,
      image: data.image,
      status: data.status,
      isDeleted: data.isDeleted,
      // rewardPoints: 0,
      question_status: false,
    };
  }
};

/********** Save users **********/
export const updateProfile = async (payload, user) => {
  let userId = payload.userId
  if (payload.userId) {
    userId = payload.userId;
  }
  const query = { _id: mongoose.Types.ObjectId(userId) }
  payload["fname"] = await encryptFunction(payload.fname)
  payload["email"] = await encryptFunction(payload.email)
  payload["participentId"] =  (payload.participentId)
  // let data = payload.body;
  let previousData = await USERMODEL.findOne(query)
  let savedata = await USERMODEL.findOneAndUpdate(query, payload, { new: true });

  return savedata;
};

// Forgot password function and send link to email for password generate
export const paswordForgot = async (payload) => {
  if (!payload.email) throw new Error(Message.validEmail);
  payload.email = payload.email.toLowerCase();
  const emailId=await encryptFunction(payload.email)
  const userData = await USERMODEL.checkEmail(emailId);
  if (!userData) throw new Error(Message.emailNotExists);
  const randomNumber = generateRandom(8, true)
  const password =await encryptpassword(randomNumber)
  let saveData = await USERMODEL.findOneAndUpdate({ _id: userData._id },
    { password: password }
  );
  /***************** verificatiopn email ****************/
  const result = await Mail.htmlFromatWithObject({
    name:await decryptFunction(userData.fname),
    password: randomNumber,
    email: payload.email, //newely added
    emailTemplate: "forgot-password",
  });

  const emailData = {
    to: payload.email,
    subject: Mail.subjects.forgetPassword,
    html: result.html,
    templateId: "forgot-password",
  };

  Mail.SENDEMAIL(emailData, function (err, res) {
    if (err)
      console.log(
        "-----@@----- Error at sending verify mail to user -----@@-----",
        err
      );
    else
      console.log(
        "-----@@----- Response at sending verify mail to user -----@@-----",
        res
      );
  });
  return saveData;
};


export const getProfile = async payload => {
  let matchObj = { _id: mongoose.Types.ObjectId(payload.userId) }
  const queryObj = USERMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, updatedAt: 0 });
  return await queryObj
};

/********** Logout users **********/
export const logoutUser = async payload => {
  return await USERMODEL.logout(payload.userId, payload.token);
};

export const checkCurrentPassword = async (payload) => {
  let matchObj = {
    _id: mongoose.Types.ObjectId(payload._id),
    password: encryptpassword(payload.currentpwd),
  };
  const queryObj = User.findOne(matchObj, { _id: 1 });
  let userData = await queryObj;
  if (!userData) throw new Error(Message.passwordNotMtchedError);
  return userData;
};


// change password function get otp
export const changePassword = async (query, payload) => {
  let matchObj = {
    _id: query._id,
    password:await encryptpassword(payload.currentpwd),
  };
  const userData = await USERMODEL.findOne(matchObj, { _id: 1 });
  if (!userData) throw new Error(Message.passwordNotMtchedError);
  let updateData = {
    password:await encryptpassword(payload.password)
  }
  return await USERMODEL.findOneAndUpdate(query, updateData);
};

/* Update USERMODEL based on id */
export const updateStatus = async (payload) => {
  return await USERMODEL.findOneAndUpdate({ _id: mongoose.Types.ObjectId(payload.id) }, payload, { fields: { _id: 1, status: 1 }, new: true });
};

/* Remove USERMODEL based on id */
export const remove = async (query) => {
  return await USERMODEL.findOneAndUpdate({ _id: mongoose.Types.ObjectId(query.id) }, { isDeleted: true, status: false }, { fields: { _id: 1 }, new: true });
};

export const get = async payload => {
  let query = { _id: mongoose.Types.ObjectId(payload.id), isDeleted: false };
  return await USERMODEL.findOne(query, {
    createdAt: 0,
    updatedAt: 0,
    loginToken: 0
  });
};
