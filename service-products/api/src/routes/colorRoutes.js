// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/ColorController');

// Routes pour les couleurs
router.get('/list', colorController.getAllColors);
router.post('/admin', colorController.createColor); 
router.put('/admin/:id', colorController.updateColor); 
router.delete('/admin/:id', colorController.deleteColor);

module.exports = router;
