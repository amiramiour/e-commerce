const express = require('express');
const  swaggerUi = require('swagger-ui-express');
const configSwagger =  require('../config/swagger-config');
const ordersRoutes = require('../routes/ordersRoutes');
const Order = require('../models/orderModel');
const cors = require('cors');

const configureServices = async(app) => {
    // Swagger documentation route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));

    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors());
    
    app.use('/', ordersRoutes);

    app.get('/', (req, res) => {
        res.send('Service de gestion des commandes est opérationnel');
    });
    
    await Order.sync();
};

module.exports = configureServices;