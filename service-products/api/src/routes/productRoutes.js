const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtMiddleware = require('../../middleware/jwtMiddleware'); // Chemin vers le middleware JWT



// Routes pour les produits avec authentification
router.get('/', jwtMiddleware.verifyToken, productController.getAllProducts); 
router.post('/', jwtMiddleware.verifyToken, productController.createProduct); 
router.put('/:id', jwtMiddleware.verifyToken, productController.updateProduct); 
router.delete('/:id', jwtMiddleware.verifyToken, productController.deleteProduct); 
router.get('/:id/similar', jwtMiddleware.verifyToken, productController.getSimilarProducts); // Protège cette route


module.exports = router;
