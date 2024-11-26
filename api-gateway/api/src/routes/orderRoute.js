const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/orders', jwtMiddleware.verifyTokenUser, ordersController.createOrder);
router.get('/orders/user', jwtMiddleware.verifyTokenUser, ordersController.getUserOrders);


module.exports = router;
