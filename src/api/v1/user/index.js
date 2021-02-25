/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: romykundal
 */

import addUser from "./add-user";
import getAllUser from "./get-all-user"
import login from "./login";
import logout from "./logout";
import updateProfile from "./updateProfile"
import forgotPassword from "./forgot-password"
import getProfile from "./get-profile";
import remove from "./remove";
import updateStatus from "./updateStatus";
import checkCurrentPassword from "./check-current-password"
import changePassword from "./change-password"
import getById from "./get-by-id";

export default [
  addUser,
  getAllUser,
  login,
  logout,
  updateProfile,
  forgotPassword,
  getProfile,
  checkCurrentPassword,
  changePassword,
  remove,
  updateStatus,
  getById
];
