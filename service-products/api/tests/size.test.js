const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const sizeRoutes = require('../src/routes/sizeRoutes'); // Chemin vers les routes des tailles
const { connectDB } = require('../config/database');

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/api/sizes', sizeRoutes); // Ajouter la route des tailles

let sequelize;

// Exécuter avant tous les tests
beforeAll(async () => {
  // Initialiser la connexion à la base de données
  sequelize = await connectDB();
  await sequelize.sync({ force: true }); // Synchroniser la base de données
});

// Exécuter après tous les tests
afterAll(async () => {
  // Fermer la connexion à la base de données après les tests
  await sequelize.close();
});

describe('Size API', () => {
  // Tests pour l'endpoint POST /api/sizes
  describe('POST /api/sizes', () => {
    test('should return 201 and create a new size', async () => {
      const response = await request(app)
        .post('/api/sizes')
        .send({
          size: 'M',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.size).toBe('M');
    });
  });

  // Tests pour l'endpoint GET /api/sizes
  describe('GET /api/sizes', () => {
    test('should return 200 and retrieve all sizes', async () => {
      // Créer une taille pour s'assurer qu'il y a au moins une entrée
      await request(app)
        .post('/api/sizes')
        .send({
          size: 'L',
        });

      const response = await request(app).get('/api/sizes');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
