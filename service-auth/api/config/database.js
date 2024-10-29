const { Sequelize } = require('sequelize');

const dbName = (process.env.NODE_ENV === "test") ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const sequelize = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "db",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: console.log,
    retry: {
        max: 5,
        match: [
            /ETIMEDOUT/,
            /ECONNREFUSED/,
            /ECONNRESET/,
        ],
    },
})

module.exports = sequelize;