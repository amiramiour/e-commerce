const express = require('express');
const paimentController = require('../controllers/paimentController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.post('/create-checkout-session', jwtMiddleware.verifyTokenUser, paimentController.createCheckout);

module.exports = router;