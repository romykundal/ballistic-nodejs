/*
 * @file: promotions.js
 * @description: It Contain function layer for promotions controller.
 * @author: romykundal
 */

import Message from "../utilities/messages";
import { successAction, failAction } from "../utilities/response";
import * as COMMON from "../services/common";

export const imgUpload = async (req, res, next) => {
  try {
    let imgesdata = "";
    let imgLocation = "users";
    if (req.body.imgLocation) {
      imgLocation = req.body.imgLocation;
    }
    if (req.files && req.files.images) {
      imgesdata = await COMMON.singleImageUpload(req.files.images, imgLocation);
    }
    if (imgesdata) {
      res.json(successAction(imgesdata, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const imgMultipleUpload = async (req, res, next) => {
  try {
    let imgesdata = "";
    let imgLocation = "products";
    if (req.body.imgLocation) {
      imgLocation = req.body.imgLocation;
    }

    if (req.files && req.files.images) {
      imgesdata = await COMMON.multipleImageUpload(req.files.images, imgLocation);
    }
    if (imgesdata) {
      res.json(successAction(imgesdata, Message.success));
    } else {
      res.json(successAction([]));
    }
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
