/*
 * @file: register.js
 * @description: It Contain register User  router/api.
 * @author: romykundal
 */
import express from "express";
import { addParticipants } from "../../../controllers/user";
import { checkTokenAdmin } from "../../../utilities/universal";

import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/addParticipents:
 *  post:
 *   tags: ["User"]
 *   summary: add Dealar api
 *   description: api used to add Participants
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user register
 *         properties:
 *           fname:
 *             type: string
 *             required:
 *           participentId:
 *             type: string
 *             required:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           role:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = Joi.object({
  fname: Joi.string()
    .required()
    .label("First name"),
  participentId: Joi.string()
    .required()
    .label("Participant Id"),
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
    .label("Role")
});

app.post(
  "/user/addParticipents",
  validator.body(Schema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkTokenAdmin,
  addParticipants
);

export default app;
