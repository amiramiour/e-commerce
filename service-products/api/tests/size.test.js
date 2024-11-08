const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const sizeRoutes = require('../src/routes/sizeRoutes'); // Chemin vers les routes des tailles
const { connectDB } = require('../config/database');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/api/sizes', sizeRoutes); // Ajouter la route des tailles

let token;
let sequelize;

// Exécuter avant tous les tests
beforeAll(async () => {
  // Initialiser la connexion à la base de données
  sequelize = await connectDB();
  await sequelize.sync({ force: true }); // Synchroniser la base de données

  // Générer un token JWT pour les tests
  token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });

});

// Exécuter après tous les tests
afterAll(async () => {
  // Fermer la connexion à la base de données après les tests
  await sequelize.close();
});

describe('Size API', () => {
  // Tests pour l'endpoint POST /api/sizes
  describe('POST /api/sizes', () => {
    test('should return 201 and create a new size with valid token', async () => {
      const response = await request(app)
        .post('/api/sizes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          size: 'M',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.size).toBe('M');
    });

    test('should return 403 if the token is missing', async () => {
      const response = await request(app)
        .post('/api/sizes')
        .send({
          size: 'L',
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Accès interdit: token manquant');
    });

    test('should return 403 if the token is invalid', async () => {
      const response = await request(app)
        .post('/api/sizes')
        .set('Authorization', 'Bearer invalidtoken')
        .send({
          size: 'L',
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Accès interdit: token invalide ou expiré');
    });
  });

  // Tests pour l'endpoint GET /api/sizes
  describe('GET /api/sizes', () => {
    test('should return 200 and retrieve all sizes with valid token', async () => {
      const response = await request(app)
        .get('/api/sizes')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
});
