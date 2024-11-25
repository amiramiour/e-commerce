const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Size', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        size: { type: DataTypes.STRING, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'size',
        timestamps: true
    });
};