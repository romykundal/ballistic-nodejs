/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: romykundal
 */
import swaggerJsDocs from "swagger-jsdoc";
import config from 'config';
const { swaggerURL,swaggerPort } = config.get('app');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Juthor Application project apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "romykundal"
      },
      servers: [`${swaggerURL}`]
    },
    produces: ["application/json"],
    host: `${swaggerPort}`
  },
  apis: [
    "./api/v1/user/*.js",
    "./api/v1/dealer/*.js",
    "./api/v1/participants/*.js"
  ],
  layout: "AugmentingLayout"
};
export default swaggerJsDocs(swaggerOptions);
