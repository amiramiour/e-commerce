const supertest = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const configureServices = require('../config/configureServices');
const dotenv = require('dotenv');
const { connectDB, db } = require('../config/connectDb');
const PaimentModel = require('../models/paimentModel');
dotenv.config()

describe('Checkout controller', () => {
    const app = express();

    beforeAll(async() => {
        configureServices(app);
        await connectDB();
        await db.sync({ force: true });
    });

    afterAll(async () => {
        await db.sync({ force: true });
        await db.close();
    });

    describe('POST /create-checkout-session', () => {
        it('should return 200 and create a checkout session', async () => {
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

            expect(response.statusCode).toBe(200);
            expect(response.body.url).toBeDefined();

            const paymentLog = await PaimentModel.findOne({ where: { sessionId: response.body.id } });
            expect(paymentLog).not.toBeNull();
            expect(paymentLog.userId).toBe(1);
            expect(paymentLog.status).toBe('created');
            expect(paymentLog.amount_total).toBe(1000);
            expect(paymentLog.currency).toBe('eur');
        });

        it('should return 401 if products array is empty', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .send({
                    products: []
                });

            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe('Products array cannot be empty');
        });

        it('should return 200 and create a checkout session with empty product description', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: '',
                            price: 10,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.url).toBeDefined();

            const paymentLog = await PaimentModel.findOne({ where: { sessionId: response.body.id } });
            expect(paymentLog).not.toBeNull();
            expect(paymentLog.userId).toBe(1);
            expect(paymentLog.status).toBe('created');
            expect(paymentLog.amount_total).toBe(1000);
            expect(paymentLog.currency).toBe('eur');
        });

        it('should return 401 if price is not greater than 0', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 0,
                            quantity: 1
                        }
                    ]
                });

            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe('Price and quantity must be greater than 0');
        });

        it('should return 401 if quantity is not greater than 0', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .send({
                    products: [
                        {
                            name: 'Produit 1',
                            description: 'Description du produit 1',
                            price: 20,
                            quantity: 0
                        }
                    ]
                });

            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe('Price and quantity must be greater than 0');
        });
    });

    describe('POST /webhook', () => {
        it('should handle webhook events', async () => {
            const payload = {
                id: 'evt_test_webhook',
                type: 'checkout.session.completed',
                data: {
                    object: {
                        id: 'cs_test_session',
                        payment_status: 'paid',
                        amount_total: 1000,
                        currency: 'eur',
                        metadata: {
                            userId: 1
                        }
                    }
                }
            };

            const response = await supertest(app)
                .post('/webhook')
                .set('Stripe-Signature', 'test_signature')
                .send(payload);

            expect(response.statusCode).toBe(200);

            const paymentLog = await PaimentModel.findOne({ where: { sessionId: payload.data.object.id } });
            expect(paymentLog).not.toBeNull();
            expect(paymentLog.status).toBe('completed');
        });
    });
});