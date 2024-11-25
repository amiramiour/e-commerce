const app = require('../app');

// Fonction pour démarrer le serveur
const startServer = async () => {
    const PORT = process.env.PORT || 3004; // Définit le port du serveur depuis l'environnement ou 3004 par défaut

    try {
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur :', error);
        throw error;
    }
};

module.exports = startServer;
