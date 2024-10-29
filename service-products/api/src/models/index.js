const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql'
});

// Import models
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const Size = require('./Size')(sequelize);

// Define relationships
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Size.hasMany(Product, { foreignKey: 'size_id' });
Product.belongsTo(Size, { foreignKey: 'size_id' });

module.exports = { sequelize, Category, Product, Size };
