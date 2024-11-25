const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration des services
const SERVICES = {
  auth: 'http://localhost:3001/auth',
  users: 'http://localhost:3002/users',
  products: 'http://localhost:3003/products',
  commands: 'http://localhost:3004/commands',
  paiment: 'http://localhost:3005/paiment',
};

const jwtMiddleware = require('./middlewares/jwtMiddleware');

const userRoute = require('./routes/userRoute');

// Middleware de proxy pour rediriger les requêtes vers les services  
//route pour login et register user
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001/auth', changeOrigin: true }));
//CRUD pour les users
app.use('/users', userRoute);
// route pour get all products
app.use('/gestion/categories/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/categories/list', changeOrigin: true }));
// CRUD pour les catégories
app.use('/gestion/categories/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/categories/admin', changeOrigin: true }));
// route pour get all colors
app.use('/gestion/colors/list', createProxyMiddleware({ target: 'http://localhost:3003/gestion/colors/list', changeOrigin: true }));
// CRUD pour les colors
app.use('/gestion/colors/admin', jwtMiddleware.verifyTokenAdmin, createProxyMiddleware({ target: 'http://localhost:3003/gestion/colors/admin', changeOrigin: true }));



app.use('/commands', createProxyMiddleware({ target: SERVICES.commands, changeOrigin: true }));
app.use('/paiment', createProxyMiddleware({ target: SERVICES.paiment, changeOrigin: true }));

// Endpoint de base pour tester
app.get('/', (req, res) => {
  res.json({ message: 'API Gateway is running!' });
});

// Port d'écoute
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is listening on port ${PORT}`);
});
