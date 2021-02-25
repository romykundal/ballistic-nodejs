/*
 * @file: change-password.js
 * @description: It Contain login router/api.
 * @author: romykundal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { changePassword } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkTokenCommon } from "../../../utilities/universal";
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/change-password:
 *  post:
 *   tags: ["User"]
 *   summary: Check current password
 *   description: api used Check current password
 *   parameters:
 *      - in: header
 *        name: authorization
 *        required:
 *      - in: body
 *        name: user
 *        description: api used Check current password
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           currentpwd:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           confirmPassword:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  currentpwd: Joi.string()
  .required()
  .label("Old Password"),
  password: Joi.string()
  .required()
  .label("New Password"),
  confirmPassword: Joi.string()
  .required()
  .label("Confirm Password")
});

app.post(
  "/user/change-password",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkTokenCommon,
  changePassword
);

export default app;
