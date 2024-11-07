// api/src/config/connectDb.js
const { Sequelize } = require('sequelize');

// Crée une nouvelle instance Sequelize en utilisant les variables d'environnement
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, 
});

// Fonction pour tester la connexion
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
        throw error;
    }
};

module.exports = { sequelize, connectDb };
