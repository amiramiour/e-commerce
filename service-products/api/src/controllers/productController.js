const { Product, Category, Size } = require('../models');

// Display all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category }, { model: Size }]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new product
exports.createProduct = async (req, res) => {
    const { name, price, category_id, size_id, availability, stock } = req.body;
    try {
        const product = await Product.create({ name, price, category_id, size_id, availability, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category_id, size_id, availability, stock } = req.body;
    try {
        await Product.update({ name, price, category_id, size_id, availability, stock }, { where: { id } });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
