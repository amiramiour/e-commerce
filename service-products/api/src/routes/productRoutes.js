const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category_id
 *         - size_id
 *         - color_id
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique du produit
 *         name:
 *           type: string
 *           description: Nom du produit
 *         price:
 *           type: number
 *           format: float
 *           description: Prix du produit
 *         category_id:
 *           type: integer
 *           description: ID de la catégorie
 *         size_id:
 *           type: integer
 *           description: ID de la taille
 *         color_id:
 *           type: integer
 *           description: ID de la couleur
 *         availability:
 *           type: boolean
 *           description: Disponibilité du produit
 *         stock:
 *           type: integer
 *           description: Stock du produit
 *       example:
 *         name: "T-shirt"
 *         price: 19.99
 *         category_id: 1
 *         size_id: 2
 *         color_id: 3
 *         availability: true
 *         stock: 100
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Affiche tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste de tous les produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Met à jour un produit existant
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprime un produit
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */

// Product routes
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
