require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const sequelize = new Sequelize(
    database,                  
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST, 
        dialect: process.env.DB_DIALECT,
        port: 3306,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`Connexion à la base de données ${database} réussie.`);
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }

    return sequelize; 
};

module.exports = { connectDB, sequelize };
