const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes pour les couleurs
router.get('/', colorController.getAllColors);
router.post('/', jwtMiddleware.verifyTokenAdmin, colorController.createColor); 
router.put('/:id', jwtMiddleware.verifyTokenAdmin, colorController.updateColor); 
router.delete('/:id', jwtMiddleware.verifyTokenAdmin, colorController.deleteColor);

module.exports = router;
