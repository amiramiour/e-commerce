const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes utilisateur
router.post('/create', authMiddleware.verifyToken, userController.createUser);
router.get('/profile', authMiddleware.verifyToken, userController.getUserById);
router.put('/update', authMiddleware.verifyToken, userController.updateUser);
router.delete('/delete', authMiddleware.verifyToken, userController.deleteUser);
module.exports = router;
