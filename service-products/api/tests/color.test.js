const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const colorRoutes = require('../src/routes/colorRoutes');
const { connectDB } = require('../config/database');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/api/colors', colorRoutes);

let token;
let sequelize;

// Exécuter avant tous les tests
beforeAll(async () => {
  sequelize = await connectDB();
  await sequelize.sync({ force: true });

  // Générer un token JWT pour les tests
  token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });
});

// Exécuter après tous les tests
afterAll(async () => {
  await sequelize.close();
});

describe('Color API', () => {
  // Test POST /api/colors
  describe('POST /api/colors', () => {
    test('should create a new color and return 201 status', async () => {
      const response = await request(app)
        .post('/api/colors')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Red' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Red');
    });

    test('should return 403 if no token is provided', async () => {
      const response = await request(app)
        .post('/api/colors')
        .send({ name: 'Blue' });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Accès interdit: token manquant');
    });
  });

  // Test GET /api/colors
  describe('GET /api/colors', () => {
    test('should return all colors with a 200 status', async () => {
      const response = await request(app)
        .get('/api/colors')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  // Test PUT /api/colors/:id
  describe('PUT /api/colors/:id', () => {
    test('should update an existing color and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/colors')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Green' });

      const colorId = createResponse.body.id;

      const updateResponse = await request(app)
        .put(`/api/colors/${colorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Yellow' });

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body.message).toBe('Color updated successfully');
    });
  });

  // Test DELETE /api/colors/:id
  describe('DELETE /api/colors/:id', () => {
    test('should delete an existing color and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/colors')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Purple' });

      const colorId = createResponse.body.id;

      const deleteResponse = await request(app)
        .delete(`/api/colors/${colorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.message).toBe('Color deleted successfully');
    });
  });
});
