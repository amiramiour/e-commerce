const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importer l'instance de sequelize

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'users', 
  timestamps: true, 
});

const sync = async () => {
  try {
    await User.sync(); // Synchronisation du modèle User
    console.log('User model synchronized with the database.');
  } catch (error) {
    console.error('Error synchronizing the User model:', error);
  }
};

sync();

module.exports = User;