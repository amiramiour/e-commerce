// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.NODE_ENV === 'test' ? `${process.env.DB_NAME}_test` : process.env.DB_NAME;
const dbHost = process.env.DB_HOST || 'db'; // Utiliser 'db' comme hôte par défaut (ou celui défini dans .env)
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
  dbName,    
  dbUser,    
  dbPassword, 
  {
    host: dbHost,  // Hôte de la base de données
    dialect: 'mysql',
    port: 3306, 
    retry: {
      max: 5,
      match: [
        /ETIMEDOUT/,
        /ECONNREFUSED/,
        /ECONNRESET/,
      ],
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connecté');
    
    await sequelize.sync();
  } catch (err) {
    console.error('Erreur de connexion MySQL:', err);
    process.exit(1);
  }

  return sequelize;
};

module.exports = { sequelize, connectDB };
