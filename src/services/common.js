/*
 * @file: common.js
 * @description: It Contain function layer for common controller.
 * @author: romykundal
 */

// import pathpkg from "path";
var Jimp = require("jimp");
import {generateRandom} from "../utilities/universal";
const imagePath = "./public/images/";


var filePath = "./data/file.txt";


/*
 * imageUpload file
 * Single and multiple both file
 */

export const createSlug = async req => {
  req = req.replace(/\s+/g, "-");
  req = req
    .replace(/[`~!@#$%^&*()_\+=\[\]{};:"\\|\/,'.<>?\s]/g, "")
    .toLowerCase();
  return req;
};

export const singleImageUpload = async (myFile, imageLocation) => {
  try {
    let pathFile = `${imagePath}${imageLocation}/`;
    let imgNameArray = "";
    /* Handle multiple file upload */
      let fileName = myFile.name;
      fileName = fileName.replace(/\s+/g, "-").toLowerCase();
      fileName = Date.now() + generateRandom(4,true) + "-" + fileName;
      let path = pathFile + fileName;
      let data = await myFile.mv(path);
      try {
        await createDimensions(pathFile, fileName);
        imgNameArray =fileName;
      } catch (err) {
      }
   return imgNameArray
  } catch (error) {
    return error
  }
};

export const multipleImageUpload = async (myFile, imageLocation) => {
  try {
    let pathFile = `${imagePath}${imageLocation}/`;
    let imgNameArray = [];
    // let myFile = req.files.images;
    /* Handle multiple file upload */
    if (!!myFile.length) {
      for (let i = 0; i < myFile.length; i++) {
        let myfile = myFile[i];
        let fileName = myfile.name;
        fileName = fileName.replace(/\s+/g, "-").toLowerCase();
        fileName = Date.now() + generateRandom(4,true) + "-" + fileName;
        let path = pathFile + fileName;
        let data = await myfile.mv(path);
        try {
          await createDimensions(pathFile, fileName);
          imgNameArray.push(fileName);
        } catch (err) {
        }
      }
    } 
    return imgNameArray
  } catch (error) {
    return error
  }
};

export const uploadImagebase64 = async (myFile, imageLocation) => {
  try {
    let imgNameArray = "";
    let pathFile = `${imagePath}${imageLocation}/`;
    var matches = myFile.base64image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = "image." + extension;    
    /* Handle multiple file upload */
      // let fileName = myFile.name;
      // fileName = fileName.replace(/\s+/g, "-").toLowerCase();
      fileName = Date.now() + generateRandom(4,true) + "-" + fileName;
      let path = pathFile + fileName;
      let data = await myFile.mv(path);
      try {
        await createDimensions(pathFile, fileName);
        imgNameArray =fileName;
      } catch (err) {
      }
   return imgNameArray
  } catch (error) {
    return error
  }
};

let createDimensions = async (path, fileName) => {
  return await Promise.all([
    // Jimp.read(path + fileName).then(lenna => {
    //   lenna.scaleToFit(310, 290).quality(100).write(`${path}/310x290/${fileName}`);
    // }),

    Jimp.read(path + fileName).then(lenna => {
      lenna.scaleToFit(350, 220).quality(100).write(`${path}/350x220/${fileName}`);
    })
  ]);
};

