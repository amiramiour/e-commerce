const supertest = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const checkoutController = require('../../controllers/checkoutController');
const configureServices = require('../../config/configureServices');
const dotenv = require('dotenv');
const connectDb = require('../../config/connectDb');
dotenv.config();


describe('Checkout controller', () => {
    let token;
    const app = express();

    beforeAll(async() => {
        configureServices(app);
        await connectDb();

        //Génération du token
        token = jwt.sign({ id: 1, role: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    describe('POST /create-checkout-session', () => {
        it('should return 200 and create a checkout session', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .set('Authorization', token)
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 10,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBeDefined();
        });
        
        it('should return 403 if the token is missing', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 10,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Accès interdit: token manquant');
        });

        it('should return 403 if the token is invalid', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .set('Authorization', 'invalidtoken')
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 10,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Accès interdit: token invalide');
        });

        it('should return 500 if there is an internal server error', async () => {
            const originalCreate = stripe.checkout.sessions.create;
            stripe.checkout.sessions.create = jest.fn().mockImplementation(() => {
                throw new Error('Internal server error');
            });

            const response = await supertest(app)
                .post('/checkout')
                .set('Authorization', token)
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 10,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(500);
            expect(response.body.error).toBe('Internal server error');

            stripe.checkout.sessions.create = originalCreate;
        });
    });
    
});
