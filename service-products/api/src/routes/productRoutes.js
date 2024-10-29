const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



// Product routes
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/:id/similar', productController.getSimilarProducts); 

module.exports = router;
