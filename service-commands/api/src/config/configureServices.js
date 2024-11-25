const express = require('express');
const  swaggerUi = require('swagger-ui-express');
const configSwagger =  require('../config/swagger-config');
const ordersRoutes = require('../routes/ordersRoutes');

const configureServices = async(app) => {
  // Swagger documentation route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/api', ordersRoutes);

  app.get('/', (req, res) => {
    res.send('Service de gestion des commandes est opérationnel');
});
};

module.exports = configureServices;