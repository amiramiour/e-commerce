// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API pour votre application',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Serveur local',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Chemin vers les fichiers de route pour générer la documentation automatiquement
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
