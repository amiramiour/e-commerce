const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware.verifyTokenUser, ordersController.createOrder);
router.get('/user', jwtMiddleware.verifyTokenUser, ordersController.getUserOrders);
router.get('/', jwtMiddleware.verifyTokenAdmin, ordersController.getAllOrders);
router.get('/:id',jwtMiddleware.verifyTokenUser, ordersController.getOrderById);


module.exports = router;
