const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes utilisateur
router.get('/', jwtMiddleware.verifyToken, userController.getUserByIdetUserById );
router.put('/', jwtMiddleware.verifyToken, userController.updateUser );
router.delete('/', jwtMiddleware.verifyToken, userController.deleteUser );

module.exports = router;