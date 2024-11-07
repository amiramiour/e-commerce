const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes'); 
const { connectDB } = require('../config/db'); 
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const argon2 = require('argon2'); 


const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

let token; // Stocker le token simulé pour les tests d'authentification

beforeAll(async () => {
  await connectDB();

  // Créer un utilisateur de test directement dans la base de données
  const email = `john.doe.${Math.random().toString(36).substring(7)}@example.com`;
  const user = await User.create({
    firstname: 'John',
    lastname: 'Doe',
    email: email,
    password: await argon2.hash('password123'), // Hash le mot de passe
    role: true,
  });

  token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await User.destroy({ where: {} });
});

describe('User API', () => {
  it('should create a new user', async () => {
    const email = `john.doe.${Math.random().toString(36).substring(7)}@example.com`;
    const res = await request(app)
      .post('/api/users/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'John',
        lastname: 'Doe',
        email: email,
        password: 'password123',
        role: true,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should retrieve the logged-in user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update the logged-in user profile', async () => {
    const res = await request(app)
      .put('/api/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'newpassword123',
        role: false,
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should delete the logged-in user', async () => {
    const res = await request(app)
      .delete('/api/users/delete')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(204);
  });
});
