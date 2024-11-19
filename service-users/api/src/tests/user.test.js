const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes'); 
const { connectDB } = require('../config/db'); 
const User = require('../models/user');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

describe('User API', () => {
    let userId;

    beforeAll(async () => {
        await connectDB();
        await User.destroy({ where: {} });

        const email = `john.doe.${Math.random().toString(36).substring(7)}@example.com`;
        const user = await User.create({
            firstname: 'John',
            lastname: 'Doe',
            email: email,
            password: 'password123',
            role: true,
        });

        userId = user.id;
        console.log('User created with ID:', userId); // Log pour vérifier l'ID de l'utilisateur
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
    });

    describe('GET /profile/:id', () => {
        it('should retrieve the user profile by ID', async () => {
            const res = await request(app)
                .get(`/api/users/profile/${userId}`);
            
            console.log('Response status:', res.statusCode); // Log pour vérifier le statut de la réponse
            console.log('Response body:', res.body); // Log pour vérifier le corps de la réponse

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('firstname', 'John');
            expect(res.body).toHaveProperty('lastname', 'Doe');
            expect(res.body).toHaveProperty('email');
        });

        it('should return 404 if user profile is not found', async () => {
            const res = await request(app)
                .get('/api/users/profile/999999');
            
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('PUT /update/:id', () => {
        it('should update the user profile by ID', async () => {
            const res = await request(app)
                .put(`/api/users/update/${userId}`)
                .send({
                    firstname: 'Jane',
                    lastname: 'Doe',
                    email: 'jane.doe@example.com',
                    password: 'newpassword123',
                    role: false,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('firstname', 'Jane');
            expect(res.body).toHaveProperty('lastname', 'Doe');
            expect(res.body).toHaveProperty('email', 'jane.doe@example.com');
        });

        it('should return 400 if updating profile with invalid data', async () => {
            const res = await request(app)
                .put(`/api/users/update/${userId}`)
                .send({
                    email: 'notanemail'
                });

            expect(res.statusCode).toEqual(400);
        });

        it('should return 404 if updating profile for non-existent user', async () => {
            const res = await request(app)
                .put('/api/users/update/999999')
                .send({
                    firstname: 'Jane',
                    lastname: 'Doe',
                    email: 'jane.doe@example.com',
                    password: 'newpassword123',
                    role: false,
                });

            expect(res.statusCode).toEqual(404);
        });

        it('should partially update the user profile by ID', async () => {
            const res = await request(app)
                .put(`/api/users/update/${userId}`)
                .send({
                    firstname: 'Janet'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('firstname', 'Janet');
        });
    });

    describe('DELETE /delete/:id', () => {
        it('should delete the user by ID', async () => {
            const res = await request(app)
                .delete(`/api/users/delete/${userId}`);
            
            expect(res.statusCode).toEqual(204);

            // Vérifier que l'utilisateur n'existe plus
            const checkRes = await request(app)
                .get(`/api/users/profile/${userId}`);
            expect(checkRes.statusCode).toEqual(404);
        });

        it('should return 404 if deleting a non-existent user', async () => {
            const res = await request(app)
                .delete('/api/users/delete/999999');
            
            expect(res.statusCode).toEqual(404);
        });
    });
});