const express = require('express');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const { sequelize } = require('./src/models');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const sizeRoutes = require('./src/routes/sizeRoutes');
const colorRoutes = require('./src/routes/colorRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/gestion/products', productRoutes);
app.use('/gestion/categories', categoryRoutes);
app.use('/gestion/sizes', sizeRoutes);
app.use('/gestion/colors', colorRoutes);

// Sync models with the database and start the server
sequelize.sync({ force: true })
    .then(() => {
        app.listen(3003, () => console.log('Server started on port 3001'));
    })
    .catch(error => console.log('Error syncing database:', error));
