const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Test API",
      version: "0.1.0",
    },
  },
  apis: ["./src/docs/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);
exports.swaggerSpec = swaggerSpec;
