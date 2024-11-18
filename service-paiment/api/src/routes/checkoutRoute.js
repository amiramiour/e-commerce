const express = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/create-checkout-session', checkoutController.createCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), checkoutController.manageWebhook);

module.exports = router;