const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// Routes pour les catégories
router.get('/', categoryController.getAllCategories); // Récupérer toutes les catégories
router.post('/', categoryController.createCategory); // Créer une nouvelle catégorie
router.put('/:id', categoryController.updateCategory); // Mettre à jour une catégorie existante
router.delete('/:id', categoryController.deleteCategory); // Supprimer une catégorie

module.exports = router;
