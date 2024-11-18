const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('../src/routes/categoryRoutes');
const { connectDB } = require('../config/database');

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/api/categories', categoryRoutes);

let sequelize;

// Exécuter avant tous les tests
beforeAll(async () => {
  sequelize = await connectDB();
  await sequelize.sync({ force: true });
});

// Exécuter après tous les tests
afterAll(async () => {
  await sequelize.close();
});

describe('Category API', () => {
  // Test POST /api/categories
  describe('POST /api/categories', () => {
    it('should create a new category and return 201 status', async () => {
      const response = await request(app)
        .post('/api/categories')
        .send({ name: 'vetements' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('vetements');
    });
  });

  // Test GET /api/categories
  describe('GET /api/categories', () => {
    it('should return all categories with a 200 status', async () => {
      const response = await request(app).get('/api/categories');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  // Test PUT /api/categories/:id
  describe('PUT /api/categories/:id', () => {
    it('should update an existing category and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'chaussures' });

      const categoryId = createResponse.body.id;

      const updateResponse = await request(app)
        .put(`/api/categories/${categoryId}`)
        .send({ name: 'chaussures enfant' });

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body.message).toBe('Category updated successfully');
    });
  });

  // Test DELETE /api/categories/:id
  describe('DELETE /api/categories/:id', () => {
    it('should delete an existing category and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'T-shirt' });

      const categoryId = createResponse.body.id;

      const deleteResponse = await request(app).delete(`/api/categories/${categoryId}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.message).toBe('Category deleted successfully');
    });
  });
});
