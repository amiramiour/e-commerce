// api/src/routes/ordersRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/ordersController');

// Route pour créer une nouvelle commande
router.post('/orders', createOrder);

// Exporter le routeur
module.exports = router;
