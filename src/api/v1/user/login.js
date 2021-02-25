/*
 * @file: signinUser.js
 * @description: It Contain login router/api.
 * @author: romykundal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { login } from "../../../controllers/user";
import { DEVICE } from "../../../utilities/constants";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   tags: ["User"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required: true
 *           password:
 *             type: string
 *             required: true
 *           role:
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password"),
  role: Joi.string()
    .required()
    .label("Role"),
  deviceToken: Joi.string()
    .optional()
    .allow("")
    .label("DeviceToken"),
  deviceType: Joi.string()
    .optional()
    .allow("")
    .label("DeviceType"),
});

app.post(
  "/user/login",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  login
);

export default app;
