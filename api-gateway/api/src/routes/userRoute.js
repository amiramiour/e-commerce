const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes utilisateur
router.get('/', jwtMiddleware.verifyTokenUser, userController.getUserById );
router.put('/', jwtMiddleware.verifyTokenUser, userController.updateUser );
router.delete('/', jwtMiddleware.verifyTokenUser, userController.deleteUser );
router.post('/register', userController.userRegister );
router.post('/login', userController.userLogin);

module.exports = router;