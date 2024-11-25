const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Configuration des options Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Spécification de l'API (OpenAPI 3.0)
        info: {
            title: 'Gestion des Commandes API', // Titre de la documentation
            version: '1.0.0', // Version de l'API
            description: 'API pour gérer les commandes', // Description de l'API
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3004}`, // URL de base de l'API
                description: 'Serveur local',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Les fichiers contenant des commentaires Swagger
};

// Génération de la documentation Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Fonction pour intégrer Swagger à l'application Express
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Route pour accéder à la documentation Swagger
};

module.exports = setupSwagger;
