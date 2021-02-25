/*
 * @file: app.js
 * @description: It Contain server setup function.
 * @author: project
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import * as DB from './src/db';
import SwaggerJsDocs from './swagger-config';
import api from './src/api';
import { failAction } from './src/utilities/response';
const { port } = config.get('app');
import fileUpload from "express-fileupload";
const imagePath = "./public/uploads/images/";
import scheduler from './src/utilities/scheduler';

const app = express();
const http = require('http');
app.use(fileUpload());
// Access-Control-Allow-Origin
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// parse application/json
app.use(bodyParser.json());
/*********** Swagger UI setup ********************/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));
/*********** All Routes ********************/
app.use('/api/v1', api);
console.log("__dirname", __dirname);
app.use(express.static(path.join(__dirname, "public/images")));
// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
    } else {
        // pass on to another error handler
        next(err);
    }
});
// Run static setup
// app.use(express.static(__dirname + '/'));
// app.get('/*', function (req, res) {
//     return res.sendFile(path.join(__dirname + '/', 'index.html'));
// });
// app.use(express.static(path.join(__dirname, 'views/dist')));
app.get('*', function (req, res) {
    // return res.sendFile(path.join(__dirname, 'views/dist', 'index.html'));
    res.status(200).json("Welcome to Romy World")
});
// check mongose connection
DB.connection();

// starting the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
