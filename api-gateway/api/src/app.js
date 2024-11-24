const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration des services
const SERVICES = {
  auth: 'http://service-auth:3001',
  users: 'http://service-users:3002',
  products: 'http://service-products:3003',
  paiment: 'http://service-paiment:3005',
};

// Middleware de proxy
app.use('/auth', createProxyMiddleware({ target: SERVICES.auth, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: SERVICES.users, changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: SERVICES.products, changeOrigin: true }));
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
