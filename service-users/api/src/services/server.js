const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
};

module.exports = startServer;
