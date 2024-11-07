// api/src/routes/ordersRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const verifyToken = require('../middleware/jwtMiddleware');

// Route pour créer une nouvelle commande (protection par token)
router.post('/orders', verifyToken, ordersController.createOrder);

// Route pour récupérer toutes les commandes
router.get('/orders', ordersController.getAllOrders);

// Route pour récupérer une commande spécifique par ID (protection par token)
router.get('/orders/:id', verifyToken, ordersController.getOrderById);

// Route pour mettre à jour une commande par ID (protection par token)
router.put('/orders/:id', verifyToken, ordersController.updateOrder);

// Route pour supprimer une commande par ID (protection par token)
router.delete('/orders/:id', verifyToken, ordersController.deleteOrder);

module.exports = router;
