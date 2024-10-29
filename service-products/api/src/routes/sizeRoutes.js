const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/SizeController');

// Routes pour les tailles
router.get('/', sizeController.getAllSizes); // Récupérer toutes les tailles
router.post('/', sizeController.createSize); // Créer une nouvelle taille
router.put('/:id', sizeController.updateSize); // Mettre à jour une taille existante
router.delete('/:id', sizeController.deleteSize); // Supprimer une taille

module.exports = router;
