const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes utilisateur
router.get('/profile', authMiddleware.verifyTokenUser, userController.getUserById);
router.put('/update', authMiddleware.verifyTokenUser, userController.updateUser);
router.delete('/delete', authMiddleware.verifyTokenUser, userController.deleteUser);
module.exports = router;
