const { DataTypes } = require('sequelize');
const {db} = require('../config/connectDb');

const Paiment = db.define('paiment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_method_types: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Paiment;