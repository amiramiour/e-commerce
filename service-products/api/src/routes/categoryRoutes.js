const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// Routes pour les catégories
router.get('/list', categoryController.getAllCategories);

router.post('/admin', categoryController.createCategory);
router.put('/admin/:id', categoryController.updateCategory);
router.delete('/admin/:id', categoryController.deleteCategory);

module.exports = router;
