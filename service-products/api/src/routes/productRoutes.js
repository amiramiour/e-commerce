const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes pour les produits
router.get('/list', productController.getAllProducts); 
router.post('/admin', productController.createProduct); 
router.put('/admin/:id', productController.updateProduct); 
router.delete('/admin/:id', productController.deleteProduct); 
router.get('/admin/:name', productController.getProductByName);
router.get('/list/:id/similar', productController.getSimilarProducts);

module.exports = router;
