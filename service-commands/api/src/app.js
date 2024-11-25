// api/src/app.js

require('dotenv').config();
const express = require('express');
const app = express();
const { connectDb, sequelize } = require('./config/connectDb');
const ordersRoutes = require('./routes/ordersRoutes');

// Middleware pour parser les données JSON
app.use(express.json());

// Routes pour les commandes
app.use('/api', ordersRoutes);

// Route de base pour vérifier si le service est en cours d'exécution
app.get('/', (req, res) => {
    res.send('Service de gestion des commandes est opérationnel');
});

// Fonction principale pour démarrer le serveur
const startServer = async () => {
    try {
        await connectDb(); // Connexion à la base de données
        if (process.env.NODE_ENV !== 'test') {
            await sequelize.sync(); // Synchronisation des modèles uniquement en production
        }
        const PORT = process.env.PORT || 3004;
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur :', error);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = app;
