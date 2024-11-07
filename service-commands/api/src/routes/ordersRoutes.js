// api/src/routes/ordersRoutes.js

const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')

// Route pour créer une nouvelle commande
router.post('/orders', ordersController.createOrderController);

// Route pour récupérer toutes les commandes
router.get('/orders', ordersController.getAllOrdersController);

// Route pour récupérer une commande par ID
router.get('/orders/:id', ordersController.getOrderByIdController);

// Route pour mettre à jour une commande par ID
router.put('/orders/:id', ordersController.updateOrderController);

// Route pour supprimer une commande par ID
router.delete('/orders/:id', ordersController.deleteOrderController);

module.exports = router;
