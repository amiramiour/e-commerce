const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../src/routes/productRoutes');
const { connectDB } = require('../config/database');
const { Category, Size, Color, Product } = require('../src/models'); // Assurez-vous que Product est inclus ici

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

let sequelize;
let createdProducts = []; // Tableau pour stocker les produits créés

beforeAll(async () => {
  sequelize = await connectDB();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product API', () => {
  beforeEach(async () => {
    // Créer des entrées de test pour les tables Category, Size et Color
    const category = await Category.create({ name: 'Electronics' });
    const size = await Size.create({ size: 'Large' });
    const color = await Color.create({ name: 'Red' });

    // Mettre à jour les IDs utilisés dans le test
    global.categoryId = category.id;
    global.sizeId = size.id;
    global.colorId = color.id;
  });

  afterEach(async () => {
    // Supprimer les produits créés pendant les tests
    if (createdProducts.length > 0) {
      await Product.destroy({
        where: {
          id: createdProducts,
        },
      });
      createdProducts = []; // Réinitialiser la liste après suppression
    }

    // Supprimer les entrées de test des tables Category, Size et Color
    await Category.destroy({ where: {} });
    await Size.destroy({ where: {} });
    await Color.destroy({ where: {} });
  });

  describe('POST /api/products', () => {
    it('should create a new product and return 201 status', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Smartphone',
          price: 299.99,
          category_id: global.categoryId,
          size_id: global.sizeId,
          color_id: global.colorId,
          availability: true,
          stock: 50,
        });

      createdProducts.push(response.body.id); // Ajouter l'ID du produit créé pour la suppression

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Smartphone');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update an existing product and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/products')
        .send({
          name: 'polo shirt',
          price: 199.99,
          category_id: global.categoryId,
          size_id: global.sizeId,
          color_id: global.colorId,
          availability: true,
          stock: 30,
        });

      const productId = createResponse.body.id;
      createdProducts.push(productId); // Ajouter à la liste des produits créés

      const updateResponse = await request(app)
        .put(`/api/products/${productId}`)
        .send({ price: 189.99 });

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body.message).toBe('Product updated successfully');
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete an existing product and return 200 status', async () => {
      const createResponse = await request(app)
        .post('/api/products')
        .send({
          name: 'jeans',
          price: 399.99,
          category_id: global.categoryId,
          size_id: global.sizeId,
          color_id: global.colorId,
          availability: true,
          stock: 15,
        });

      const productId = createResponse.body.id;
      createdProducts.push(productId); // Ajouter à la liste des produits créés

      const deleteResponse = await request(app).delete(`/api/products/${productId}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.message).toBe('Product deleted successfully');
    });
  });

  describe('GET /api/products/:id/similar', () => {
    it('should return similar products with a 200 status', async () => {
      // Créer deux produits similaires
      const product1 = await request(app)
        .post('/api/products')
        .send({
          name: 'jeans1',
          price: 399.99,
          category_id: global.categoryId,
          size_id: global.sizeId,
          color_id: global.colorId,
          availability: true,
          stock: 15,
        });

      const product2 = await request(app)
        .post('/api/products')
        .send({
          name: 'jeans2',
          price: 399.99,
          category_id: global.categoryId,
          size_id: global.sizeId,
          color_id: global.colorId,
          availability: true,
          stock: 15,
        });

      createdProducts.push(product1.body.id, product2.body.id); // Ajouter les IDs à la liste des produits créés

      const response = await request(app).get(`/api/products/${product1.body.id}/similar`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
});
