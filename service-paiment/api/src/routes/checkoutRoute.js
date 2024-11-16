const Router = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = Router();

router.post('/create-checkout-session', checkoutController.createCheckout);

module.exports = router;