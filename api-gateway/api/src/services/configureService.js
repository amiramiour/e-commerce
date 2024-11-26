const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userRoute = require('../routes/userRoute');
const paimentRoute = require('../routes/paimentRoute');

const configureServices = async(app) => {
    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //CRUD pour les users 
    app.use('/users', userRoute); 
    // create checkout session
    app.use('/paiment', paimentRoute);

    app.get('/', (req, res) => {
        res.json({ message: 'API Gateway is running!' });
    });
};

module.exports = configureServices;