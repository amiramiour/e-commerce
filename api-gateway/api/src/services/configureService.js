const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userRoute = require('../routes/userRoute');
const paimentRoute = require('../routes/paimentRoute');

const configureServices = async(app) => {
    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Middleware de proxy pour rediriger les requêtes vers les services 
    //CRUD pour les users 
    app.use('/users', userRoute); 
    // create checkout session
    app.use('/paiment', paimentRoute);
    //route pour login et register user
    app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001/auth', changeOrigin: true }));
    // route pour get all products
    app.use('/gestion/categories/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/categories/list', changeOrigin: true }));
    // CRUD pour les catégories
    app.use('/gestion/categories/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/categories/admin', changeOrigin: true }));
    // route pour get all colors
    app.use('/gestion/colors/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/colors/list', changeOrigin: true }));
    // CRUD pour les colors
    app.use('/gestion/colors/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/colors/admin', changeOrigin: true }));
    // route pour get all colors
    app.use('/gestion/sizes/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/sizes/list', changeOrigin: true }));
    // CRUD pour les colors
    app.use('/gestion/sizes/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/sizes/admin', changeOrigin: true }));
    // route pour get all colors
    app.use('/gestion/products/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/sizes/list', changeOrigin: true }));
    // CRUD pour les colors
    app.use('/gestion/products/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/sizes/admin', changeOrigin: true }));
    // Endpoint de base pour tester
    app.get('/', (req, res) => {
        res.json({ message: 'API Gateway is running!' });
    });
};

module.exports = configureServices;