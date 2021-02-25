/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: romykundal
 */
import express from "express";
import { imgUpload } from "../../../controllers/common";

const app = express();

app.post(
  "/common/imgUpload",
  imgUpload
);

export default app;
