const Sequelize = require('sequelize');

const connectDb = async () => {
    const isTestEnv = process.env.NODE_ENV === 'test';
    
    const dbName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;
    const dbUser = isTestEnv ? process.env.DB_USER_TEST : process.env.DB_USER;
    const dbPassword = isTestEnv ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD;
    const dbHost = isTestEnv ? process.env.DB_HOST_TEST : process.env.DB_HOST;

    console.log('dbName: ', dbName);
    console.log('dbUser: ', dbUser);
    console.log('dbPassword', dbPassword);

    const db = new Sequelize(dbName, dbUser, dbPassword, {
        host: process.env.dbHost,
        dialect: process.env.DB_DIALECT,
        logging: (msg) => console.log(`SQL Query: ${msg}`)
    });

    try {
        await db.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDb;
