const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/orders', jwtMiddleware.verifyTokenUser, ordersController.createOrder);
router.get('/orders/user', jwtMiddleware.verifyTokenUser, ordersController.getUserOrders);
router.get('/orders', jwtMiddleware.verifyTokenAdmin, ordersController.getAllOrders);
router.get('/orders/:id',jwtMiddleware.verifyTokenUser, ordersController.getOrderById);


module.exports = router;
