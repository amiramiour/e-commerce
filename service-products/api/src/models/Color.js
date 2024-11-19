// models/Color.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Color', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        createdAt: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        updatedAt: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        }
    }, {
        tableName: 'color',
        timestamps: true
    });
};
