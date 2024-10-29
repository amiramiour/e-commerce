// models/Product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Product', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        category_id: { type: DataTypes.INTEGER, allowNull: false },
        size_id: { type: DataTypes.INTEGER, allowNull: false },
        color_id: { type: DataTypes.INTEGER, allowNull: false },
        availability: { type: DataTypes.BOOLEAN, defaultValue: true },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'product',
        timestamps: true
    });
};
