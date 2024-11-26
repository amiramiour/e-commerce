// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/ColorController');

// Routes pour les couleurs
router.get('/', colorController.getAllColors);
router.post('/', colorController.createColor); 
router.put('/:id', colorController.updateColor); 
router.delete('/:id', colorController.deleteColor);

module.exports = router;
