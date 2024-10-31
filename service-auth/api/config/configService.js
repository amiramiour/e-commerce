const express = require('express');
const swaggerUi = require('swagger-ui-express');
const configSwagger = require('../docs/config');

const configureServices = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Ensuite, configure les routes
    const userRoute = require('../routes/userRoute');
    app.use('/users', userRoute);

    // Documentation API
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));
};

module.exports = configureServices;
