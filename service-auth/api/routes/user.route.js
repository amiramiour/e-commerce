const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router
    .route('/register')
    .post(userController.userRegister)

router
    .route('/login')
    .post(userController.userLogin)


module.exports = router;