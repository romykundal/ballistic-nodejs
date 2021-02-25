/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: romykundal
 */
import validator from "validator";
import mongoose from "mongoose";
import {generateRandom} from "../../utilities/universal";
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // unique: true,
      required: true,
      // minlength: 1,
      trim: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: `Not a valid email`
      // }
    },
    firstName: {
      type: String,
      required: false,
      trim: true
    },
    image:
    {
      type: String,
      default: ""
    },
    password: {
      type: String,
      default: ""
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      required: false,
      enum: [1, 2, 3, 4],   // 1->super admin , 2->Owner, 3->user
      default: 3
    },
    status: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date,
      default: new Date()
    },
    createdBy: {
      type: Boolean,
      default: false
    },
    modifiedBy: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default userSchema;
