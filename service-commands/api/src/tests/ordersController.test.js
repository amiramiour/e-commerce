const request = require('supertest');
const app = require('../app'); // Fichier principal de l'application
const { sequelize } = require('../config/connectDb');

// Avant tous les tests, synchronise la base de données
beforeAll(async () => {
    await sequelize.sync({ force: true }); // Réinitialise la base pour chaque test
});

// Après tous les tests, ferme la connexion à la base de données
afterAll(async () => {
    await sequelize.close();
});

describe('Tests d\'intégration des routes de commandes', () => {

    test('Créer une commande (POST /api/orders)', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                product_id: 101,
                quantity: 2,
                total_price: 30.0
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Commande créée avec succès');
        expect(response.body.data).toMatchObject({
            product_id: 101,
            quantity: 2,
            total_price: 30.0
        });
    });

    test('Récupérer toutes les commandes (GET /api/orders)', async () => {
        const response = await request(app).get('/api/orders');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1); // Vérifie qu'il y a une commande
    });

    test('Récupérer une commande par ID (GET /api/orders/:id)', async () => {
        const response = await request(app).get('/api/orders/1');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            product_id: 101,
            quantity: 2,
            total_price: 30.0
        });
    });

    test('Mettre à jour une commande (PUT /api/orders/:id)', async () => {
        const response = await request(app)
            .put('/api/orders/1')
            .send({
                product_id: 102,
                quantity: 3,
                total_price: 45.0
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Commande mise à jour avec succès');
    });

    test('Supprimer une commande (DELETE /api/orders/:id)', async () => {
        const response = await request(app).delete('/api/orders/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Commande supprimée avec succès');
    });
});
