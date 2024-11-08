const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/SizeController');
const jwtMiddleware = require('../../middleware/jwtMiddleware'); // Chemin vers le middleware JWT


// Routes pour les tailles avec authentification
router.get('/', jwtMiddleware.verifyToken, sizeController.getAllSizes); // Protège cette route
router.post('/', jwtMiddleware.verifyToken, sizeController.createSize); // Protège cette route
router.put('/:id', jwtMiddleware.verifyToken, sizeController.updateSize); // Protège cette route
router.delete('/:id', jwtMiddleware.verifyToken, sizeController.deleteSize); // Protège cette route

module.exports = router;
