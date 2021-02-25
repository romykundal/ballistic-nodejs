/*
 * @file: updateProfile.js
 * @description: It Contain register User  router/api.
 * @author: romykundal
 */
import express from "express";
import { imgMultipleUpload } from "../../../controllers/common";

const app = express();

app.post(
  "/common/imgMultipleUpload",
  imgMultipleUpload
);

export default app;
