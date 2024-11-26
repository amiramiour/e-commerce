const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', categoryController.getAllCategories);

router.post('/', jwtMiddleware.verifyTokenAdmin, categoryController.createCategory);
router.put('/:id', jwtMiddleware.verifyTokenAdmin, categoryController.updateCategory);
router.delete('/:id', jwtMiddleware.verifyTokenAdmin, categoryController.deleteCategory);

module.exports = router;
