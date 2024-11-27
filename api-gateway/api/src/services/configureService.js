const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const cors = require('cors');

const userRoute = require('../routes/userRoute');
const paimentRoute = require('../routes/paimentRoute');
const categoryRoute = require('../routes/categoryRoute');
const productRoute = require('../routes/productRoutes');
const orderRoute = require('../routes/orderRoute');
const sizeRoute = require('../routes/sizeRoute');
const colorRoute = require('../routes/colorRoute');

const configureServices = async(app) => {
    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors());

    console.log('TTTTTTTTTTTTTTT')


    app.use('/users', userRoute); 
    app.use('/paiment', paimentRoute);
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    app.use('/order', orderRoute);
    app.use('/size', sizeRoute);
    app.use('/color', colorRoute);

    app.get('/', (req, res) => {
        res.json({ message: 'API Gateway is running!' });
    });
};

module.exports = configureServices;