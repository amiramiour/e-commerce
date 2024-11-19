// models/index.js
const { Sequelize } = require('sequelize');

// verfier que la vaariable NODE_ENV est bien définie
const isTestEnv = process.env.NODE_ENV === 'test';

const dbName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const sequelize = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Import models
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const Size = require('./Size')(sequelize);
const Color = require('./Color')(sequelize); // Importer le modèle Color

// Define relationships
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Size.hasMany(Product, { foreignKey: 'size_id' });
Product.belongsTo(Size, { foreignKey: 'size_id' });

Color.hasMany(Product, { foreignKey: 'color_id' }); // Définir la relation entre Color et Product
Product.belongsTo(Color, { foreignKey: 'color_id' });

module.exports = { sequelize, Category, Product, Size, Color }; // Exporter le modèle Color
