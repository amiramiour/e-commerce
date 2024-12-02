const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
    }, {
      tableName: 'users',
      timestamps: true
});

module.exports = User;