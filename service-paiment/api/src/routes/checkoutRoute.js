const Router = require('express');
const checkoutController = require('../controllers/checkoutController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = Router();

router.post('/create-checkout-session', jwtMiddleware.verifyToken, checkoutController.createCheckout);