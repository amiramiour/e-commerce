const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes pour les tailles
router.get('/', sizeController.getAllSizes); 
router.post('/', jwtMiddleware.verifyTokenAdmin, sizeController.createSize); 
router.put('/:id', jwtMiddleware.verifyTokenAdmin, sizeController.updateSize); 
router.delete('/:id', jwtMiddleware.verifyTokenAdmin, sizeController.deleteSize);

module.exports = router;
