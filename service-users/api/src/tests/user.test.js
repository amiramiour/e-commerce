const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes'); // Chemin vers tes routes
const { connectDB } = require('../config/db'); // Assure-toi d'importer ta fonction de connexion

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await connectDB(); 
});

afterAll(async () => {
});

describe('User API', () => {
  let userId;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: true,
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id; // Enregistre l'ID pour les tests suivants
  });

  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/users');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should retrieve a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'newpassword123',
        role: false,
      });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should delete a user by ID', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    
    expect(res.statusCode).toEqual(204);
  });
});
