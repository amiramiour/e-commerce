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

const userRoute = require('./routes/userRoute');

// Middleware de proxy
app.use('/auth', createProxyMiddleware({ target: SERVICES.auth, changeOrigin: true }));
app.use('/users', userRoute);
app.use('/gestion', createProxyMiddleware({ target: SERVICES.products, changeOrigin: true }));
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
