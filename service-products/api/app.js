const express = require('express');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const { sequelize } = require('./src/models');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const sizeRoutes = require('./src/routes/sizeRoutes');
const colorRoutes = require('./src/routes/colorRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/colors', colorRoutes);

// Sync models with the database and start the server
sequelize.sync({ force: true })
    .then(() => {
        app.listen(3001, () => console.log('Server started on port 3001'));
    })
    .catch(error => console.log('Error syncing database:', error));
