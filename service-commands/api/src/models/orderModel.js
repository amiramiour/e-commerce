// api/src/models/orderModel.js

const db = require('../config/db');

// Fonction pour insérer une nouvelle commande dans la base de données
const createOrder = (orderData, callback) => {
  const { product_id, quantity, total_price } = orderData;
  const query = 'INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)';

  db.query(query, [product_id, quantity, total_price], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de la commande dans la base de données:', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { createOrder };
