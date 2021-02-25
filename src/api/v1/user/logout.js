/*
 * @file: logout.js
 * @description: It Contain logout router/api.
 * @author: romykundal
 */
import express from "express";
import { logout } from "../../../controllers/user";
import { checkTokenCommon } from "../../../utilities/universal";

const app = express();

/**
 * @swagger
 * /api/v1/user/logout:
 *  delete:
 *   tags: ["User"]
 *   summary: user logout api
 *   description: api used to logout users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/user/logout", 
checkTokenCommon,
 logout);

export default app;
