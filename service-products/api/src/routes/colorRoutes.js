// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/ColorController');
const jwtMiddleware = require('../../middleware/jwtMiddleware'); // Chemin vers le middleware JWT



// Routes pour les couleurs avec authentification
router.get('/', jwtMiddleware.verifyToken, colorController.getAllColors); // Protège cette route
router.post('/', jwtMiddleware.verifyToken, colorController.createColor); // Protège cette route
router.put('/:id', jwtMiddleware.verifyToken, colorController.updateColor); // Protège cette route
router.delete('/:id', jwtMiddleware.verifyToken, colorController.deleteColor); // Protège cette route


module.exports = router;
