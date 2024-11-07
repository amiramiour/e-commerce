require('dotenv').config();
const express = require('express');
const app = express();
const { connectDb, sequelize } = require('./config/connectDb');

app.use(express.json());

const ordersRoutes = require('./routes/ordersRoutes');
app.use('/api', ordersRoutes);

app.get('/', (req, res) => {
  res.send('Service de gestion des commandes est opérationnel');
});

const PORT = process.env.PORT || 3004;

const startServer = async () => {
  await connectDb(); // Connexion à la base de données
  await sequelize.sync(); // Synchronisation des modèles
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
};

startServer();
