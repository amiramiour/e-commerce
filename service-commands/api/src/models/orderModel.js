// api/src/models/orderModel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDb');

const Order = sequelize.define('Order', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'orders',
    timestamps: true, 
});

module.exports = Order;
