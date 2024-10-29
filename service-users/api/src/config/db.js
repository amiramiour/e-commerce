//config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // doit être 'db'
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connecté');
  } catch (err) {
    console.error('Erreur de connexion MySQL:', err);
    process.exit(1);
  }

  return sequelize; 
};

module.exports = { sequelize, connectDB };
