/*
 * @file: get-by-id.js
 * @description: It Contain login router/api.
 * @author: romykundal
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getById } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
import { checkTokenAdmin } from "../../../utilities/universal";
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/get-by-id/{id}:
 *  get:
 *   tags: ["User"]
 *   summary: user update user status api
 *   description: Api to used remove
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       type: string
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *        type: string
 *        description: The user ID      
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = Joi.object({
  id: Joi.string()
        .required()
        .label("Id")
});

app.get(
  "/user/get-by-id/:id",
  validator.params(Schema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkTokenAdmin,
  getById
);

export default app;
