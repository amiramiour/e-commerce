// api/src/config/startServer.js
const app = require('../app');

// Fonction pour démarrer le serveur
const startServer = () => {
    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => {
        console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
};

module.exports = startServer;
