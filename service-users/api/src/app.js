const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Pour parser le JSON dans le corps de la requête

// Utiliser les routes
app.use('/api/users', userRoutes);

const initializeApp = async () => {
  try {
    await connectDB(); // Connexion à la base de données
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'application:', error);
    process.exit(1); 
  }
};

initializeApp();
