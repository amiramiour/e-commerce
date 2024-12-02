const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Route pour créer une nouvelle commande
router.post('/orders/:id_user', ordersController.createOrder);

// Route pour récupérer toutes les commandes
router.get('/orders', ordersController.getAllOrders);

// Route pour récupérer une commande spécifique par ID
router.get('/orders/:id', ordersController.getOrderById);

// Route pour récupérer une commande spécifique par ID
router.get('/orders/user/:id_user', ordersController.getOrdersOfAUser);


module.exports = router;
