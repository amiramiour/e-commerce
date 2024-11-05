// api/src/controllers/ordersController.js

const { createOrder } = require('../models/orderModel'); // Importe le modèle de commandes

// Fonction pour créer une nouvelle commande
const createOrderController = (req, res) => {
  const orderData = req.body;

  createOrder(orderData, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la commande:', err);
      return res.status(500).json({ message: 'Erreur lors de la création de la commande', error: err });
    }
    res.status(201).json({ message: 'Commande créée avec succès', data: result });
  });
};

// Exporter le contrôleur
module.exports = { createOrderController };
