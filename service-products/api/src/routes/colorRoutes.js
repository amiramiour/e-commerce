// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/ColorController');

// Routes pour les couleurs
router.get('/', colorController.getAllColors); // Route publique
router.post('/', colorController.createColor); // Route publique
router.put('/:id', colorController.updateColor); // Route publique
router.delete('/:id', colorController.deleteColor); // Route publique

module.exports = router;
