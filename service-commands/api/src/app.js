// api/src/app.js

require('dotenv').config();
const express = require('express');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Importer et utiliser la route des commandes
const ordersRoutes = require('./routes/ordersRoutes');
app.use('/api', ordersRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Service de gestion des commandes est opérationnel');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
