const express = require('express');
const { sequelize } = require('./src/models');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Sync models with the database and start the server
sequelize.sync({ force: true })
    .then(() => {
        app.listen(3001, () => console.log('Server started on port 3001'));
    })
    .catch(error => console.log('Error syncing database:', error));
