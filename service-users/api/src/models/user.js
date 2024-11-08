const { DataTypes } = require('sequelize');
const argon2 = require('argon2'); // Importer bcrypt pour le hachage
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
    defaultValue: 1,
  },
}, {
  tableName: 'users', 
  timestamps: true, 
});

User.beforeCreate(async (user) => {
  user.password = await argon2.hash(user.password, 10);
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
