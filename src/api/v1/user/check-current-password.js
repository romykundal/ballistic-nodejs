/*
 * @file: check-current-password.js
 * @description: It Contain login router/api.
 * @author: romykundal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { checkCurrentPassword } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkTokenCommon } from "../../../utilities/universal";
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/check-current-password:
 *  post:
 *   tags: ["User"]
 *   summary: Check current password
 *   description: api used Check current password
 *   parameters:
 *      - in: header
 *        name: authorization
 *        required: true
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
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  currentpwd: Joi.string()
  .trim()
    .required()
    .label("Password")
});

app.post(
  "/user/check-current-password",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkTokenCommon,
  checkCurrentPassword
);

export default app;
