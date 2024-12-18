const express = require('express');
const swaggerUi = require('swagger-ui-express');
const configSwagger = require('../docs/config');
const cors = require('cors');

const configureServices = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors());

    // Ensuite, configure les routes
    const userRoute = require('../routes/user.route');
    app.use('/auth', userRoute);

    app.get('/', (req, res) => {
        res.json({ message: 'Auth is running!' });
      });

    // Documentation API
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));
};

module.exports = configureServices;
