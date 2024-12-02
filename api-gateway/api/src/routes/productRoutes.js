const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes pour les produits
router.get('/', productController.getAllProducts); 
router.post('/', jwtMiddleware.verifyTokenAdmin, productController.createProduct); 
router.put('/:id', jwtMiddleware.verifyTokenAdmin, productController.updateProduct); 
router.delete('/:id', jwtMiddleware.verifyTokenAdmin, productController.deleteProduct); 
router.get('/:name', productController.getProductByName);
router.get('/:id/similar', productController.getSimilarProducts);

module.exports = router;
