// api/src/controllers/ordersController.js

// Fonction pour créer une nouvelle commande
const createOrder = (req, res) => {
  const { product_id, quantity, total_price } = req.body;
  // Logique pour créer la commande dans la base de données (à ajouter plus tard)
  res.status(201).json({ message: 'Commande créée avec succès', data: { product_id, quantity, total_price } });
};

// Exporter le contrôleur
module.exports = { createOrder };
