require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dbUser = process.env.NODE_ENV === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER;
const dbPassword = process.env.NODE_ENV === 'test' ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD;
const dbHost = process.env.NODE_ENV === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST;

const db = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: process.env.DB_DIALECT,
            logging: (msg) => console.log(`SQL Query: ${msg}`) 
    },
);

const connectDB = async () => {
    try {
            await db.authenticate();
            console.log(`Connected to the ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database!`);
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }

    return db;
};

module.exports = {connectDB, db};
