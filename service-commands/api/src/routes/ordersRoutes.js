// api/src/routes/ordersRoutes.js

const express = require('express');
const router = express.Router();
const { createOrderController } = require('../controllers/ordersController'); // Vérifie l'importation ici

// Route pour créer une nouvelle commande
router.post('/orders', createOrderController);

// Exporter le routeur
module.exports = router;
