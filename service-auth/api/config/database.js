const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = (process.env.NODE_ENV === "test") ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const sequelize = new Sequelize(
    dbName, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST || "auth-db",
        dialect: "mysql",
        port: process.env.DB_PORT || 3306,
        retry: {
            max: 5,
            match: [
                /ETIMEDOUT/,
                /ECONNREFUSED/,
                /ECONNRESET/,
            ],
        },
    }
)

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('MySQL connecté');
    } catch (err) {
      console.error('Erreur de connexion MySQL:', err);
      process.exit(1);
    }
  
    return sequelize; 
  };

module.exports = { sequelize, connectDB };