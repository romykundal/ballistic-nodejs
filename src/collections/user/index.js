/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: romykundal
 */

import mongoose from "mongoose";
import userSchema from "./db-schema";

class UserClass {
  static checkEmail(email) {
    var obj = { email }
    return this.findOne(obj);
  }
  static checkPhone(phoneNumber) {
    var obj = { phone }
    return this.findOne(obj);
  }
  static saveUser(payload) {
    return this(payload).save();
  }
  static login(email, password) {
    return this.findOne({
      email,
      password,
      isDeleted: true
    });
  }

  static findone(query) {
    return this.findOne(query);
  }
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }

  static findByCondition(condition) {
    return this.find(condition);
  }

  static updateUserInfo(userId, payload) {
    const updateData = {
      $set: {
        ...payload,
        updatedAt: Date.now()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static logout(userId, token) {
    let updateData = {
      $set: {
        updatedAt: Date.now()
      },
      $pull: { _id: { userId } }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }

  static getExpireDate(month) {
    var dt = new Date();
    return new Date(dt.setMonth(dt.getMonth() + month));
  }

  static checkParticipantId(participentId) {
    var obj = { participentId }
    return this.findOne(obj);
  }
}

userSchema.loadClass(UserClass);

export default mongoose.model("User", userSchema);
