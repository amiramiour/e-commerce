const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Assure-toi que le chemin est correct
const { connectDB } = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const configSwagger = require('./config/swagger-config');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json()); 
app.use('/users', userRoutes);

app.use(cors());

// Documenter l'API avec Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger.swaggerSpec));

const initializeApp = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'application:', error);
    process.exit(1); 
  }
};

initializeApp();
