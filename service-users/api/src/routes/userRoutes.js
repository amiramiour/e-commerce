const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes utilisateur
router.get('/profile/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;