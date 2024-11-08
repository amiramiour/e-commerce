const express = require('express');
const  swaggerUi = require('swagger-ui-express');
const configSwagger =  require('../config/swagger-config');
const checkoutRoute = require('../routes/checkoutRoute');
const Paiment = require('../models/paimentModel');

const configureServices = async(app) => {
  // Swagger documentation route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Checkout route
  app.use('/', checkoutRoute);

  await Paiment.sync();
};

module.exports = configureServices;