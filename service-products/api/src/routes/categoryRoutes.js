const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const jwtMiddleware = require('../../middleware/jwtMiddleware'); // Chemin vers le middleware JWT

// Routes pour les catégories
router.get('/', jwtMiddleware.verifyToken, categoryController.getAllCategories);
router.post('/', jwtMiddleware.verifyToken, categoryController.createCategory);
router.put('/:id', jwtMiddleware.verifyToken, categoryController.updateCategory);
router.delete('/:id', jwtMiddleware.verifyToken, categoryController.deleteCategory);

module.exports = router;
