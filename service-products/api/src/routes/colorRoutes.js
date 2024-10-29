// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/ColorController');



// Routes pour les couleurs
router.get('/', colorController.getAllColors); // Récupérer toutes les couleurs
router.post('/', colorController.createColor); // Créer une nouvelle couleur
router.put('/:id', colorController.updateColor); // Mettre à jour une couleur existante
router.delete('/:id', colorController.deleteColor); // Supprimer une couleur

module.exports = router;
