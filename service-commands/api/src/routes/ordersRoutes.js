const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Route pour créer une nouvelle commande
router.post('/orders', ordersController.createOrder);

// Route pour récupérer toutes les commandes
router.get('/orders', ordersController.getAllOrders);

// Route pour récupérer une commande spécifique par ID
router.get('/orders/:id', ordersController.getOrderById);

// Route pour mettre à jour une commande par ID
router.put('/orders/:id', ordersController.updateOrder);

// Route pour supprimer une commande par ID
router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;
