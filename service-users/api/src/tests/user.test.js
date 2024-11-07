const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes'); // Assurez-vous que le chemin est correct
const { connectDB } = require('../config/db'); // Modifier selon le chemin de votre config DB
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

let token; 

beforeAll(async () => {
    await connectDB();
    await User.destroy({ where: {} }); 

    const email = `john.doe.${Math.random().toString(36).substring(7)}@example.com`;
    const user = await User.create({
        firstname: 'John',
        lastname: 'Doe',
        email: email,
        password: await argon2.hash('password123'), 
        role: true,
    });

    token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_KEY,
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
            .set('Authorization', `Bearer ${token}`) // Authentification avec le token
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
