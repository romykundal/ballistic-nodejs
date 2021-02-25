/*
 * @file: get-all.js
 * @description: It Contain get user list router/api.
 * @author: romykundal
 */
import express from "express";
import { checkTokenAdmin } from "../../../utilities/universal";
import { createValidator } from "express-joi-validation";
import { getAllUser } from "../../../controllers/user";
import Joi from "@hapi/joi";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/get-all-participent:
 *  get:
 *   tags: ["User"]
 *   summary: get-all list api
 *   description: api used to get all participant type
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       type: string
 *       required: true
 *     - in: query
 *       name: count
 *       required: true
 *     - in: query
 *       name: search
 *       required:
 *     - in: query
 *       name: sortBy
 *       required:
 *     - in: query
 *       name: page
 *       required: true
 *     - in: query
 *       name: sort
 *       required:
 *       enum: ["ASC", "DESC"]
 *     - in: query
 *       name: status
 *       required:
 *       enum: ["true", "false"]
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const Schema = Joi.object({
  count: Joi.number()
    .min(1)
    .required()
    .label("count"),
  search: Joi.string()
    .optional()
    .allow("")
    .label("Search"),
  sort: Joi.string()
    .valid("ASC", "DESC")
    .optional()
    .allow("")
    .label("Sort"),
  status: Joi.string()
    .valid("true", "false")
    .optional()
    .allow("")
    .label("Status"),
  sortBy: Joi.string()
    .optional()
    .allow("")
    .label("Sort by"),
  page: Joi.number()
    .min(1)
    .required()
    .label("Page number"),
});

app.get("/user/get-all-user",
  validator.query(Schema, {
    joi: { convert: true, allowUnknown: false }
  }),
  // checkTokenAdmin,
  getAllUser
  );

export default app;
