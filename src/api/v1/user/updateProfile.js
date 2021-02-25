/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: romykundal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateProfile } from "../../../controllers/user";
import { checkTokenCommon } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

app.post(
  "/user/updateProfile",
  // validator.body(userSchema, {
  //   joi: { convert: true, allowUnknown: false }
  // }),
  checkTokenCommon,
  updateProfile
);

export default app;
