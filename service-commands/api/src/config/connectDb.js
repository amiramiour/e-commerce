const { Sequelize } = require('sequelize');

// Sélectionne la base de données en fonction de l'environnement
const dbName = process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;

// Crée une instance Sequelize avec les variables d'environnement
const sequelize = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactive les logs SQL pour rendre les tests plus propres
});

// Fonction pour tester la connexion
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connexion à la base de données "${dbName}" réussie.`);
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
        throw error;
    }
};

module.exports = { sequelize, connectDb };
