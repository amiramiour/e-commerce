const supertest = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const configureServices = require('../config/configureServices');
const dotenv = require('dotenv');
const { connectDB, db } = require('../config/connectDb');
const PaimentModel = require('../models/paimentModel');
dotenv.config()


describe('Checkout controller', () => {
    let token;
    const app = express();

    beforeAll(async() => {
        configureServices(app);
        await connectDB();
        await db.sync({ force: true });

        //Génération du token
        token = jwt.sign({ id: 1, role: 1 }, process.env.JWT_KEY, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await db.sync({ force: true });
        await db.close();
    });

    describe('POST /create-checkout-session', () => {
        it('should return 200 and create a checkout session', async () => {
            const response = await supertest(app)
                .post('/create-checkout-session')
                .set('Authorization', `Bearer ${token}`)
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

            const paymentLog = await PaimentModel.findOne({ where: { sessionId: response.body.id } });
            expect(paymentLog).not.toBeNull();
            expect(paymentLog.userId).toBe(1);
            expect(paymentLog.status).toBe('created');
            expect(paymentLog.amount_total).toBe(1000);
            expect(paymentLog.currency).toBe('eur');
        });
        
        // it('should return 403 if the token is missing', async () => {
        //     const response = await supertest(app)
        //         .post('/create-checkout-session')
        //         .send({
        //             products: [
        //                 {
        //                     name: 'Produit 1',
        //                     description: 'Description du produit 1',
        //                     price: 10,
        //                     quantity: 1
        //                 }
        //             ]
        //         });

        //     expect(response.statusCode).toBe(403);
        //     expect(response.body.message).toBe('Accès interdit: token manquant');
        // });

        // it('should return 403 if the token is invalid', async () => {
        //     const response = await supertest(app)
        //         .post('/create-checkout-session')
        //         .set('Authorization', 'invalidtoken')
        //         .send({
        //             products: [
        //                 {
        //                     name: 'Produit 1',
        //                     description: 'Description du produit 1',
        //                     price: 10,
        //                     quantity: 1
        //                 }
        //             ]
        //         });

        //     expect(response.statusCode).toBe(403);
        //     expect(response.body.message).toBe('Accès interdit: token invalide');
        // });
    });
    
});
