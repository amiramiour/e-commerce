const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/SizeController');

// Routes pour les tailles
router.get('/list', sizeController.getAllSizes); 
router.post('/admin', sizeController.createSize); 
router.put('/admin/:id', sizeController.updateSize); 
router.delete('/admin/:id', sizeController.deleteSize);

module.exports = router;
