const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/config.js');

const app = express();
const port = 3002;

require('./models/userModel.js');

sequelize.authenticate()
    .then(async () => {
        console.log("Connecté à la base de données MySQL!");
        
        return await sequelize.sync();
    })
    .then(async () => {
        console.log('Model User synchronisé avec la bdd');
      })
    .then(() => {
        console.log(`Modèles synchronisés avec la base de données.${sequelize.config.database}`);
        
        app.listen(port, () => {
            console.log(`Serveur en écoute sur le port ${port}`);
        });
    })
    .catch(err => {
        console.error("Impossible de se connecter à la base de données:", err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User route
const userRoute = require('./routes/userRoute.js');
app.use('/users', userRoute);

// API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
