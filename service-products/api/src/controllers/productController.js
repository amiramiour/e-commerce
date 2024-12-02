const { Product, Category, Size } = require('../models'); // N'oubliez pas d'importer Op
const { Op } = require('sequelize');

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
    const { name, price, category_id, size_id, color_id, availability, stock } = req.body; // Ajout de color_id
    try {
        const product = await Product.create({ 
            name, 
            price, 
            category_id, 
            size_id, 
            color_id, // Inclure color_id lors de la création
            availability, 
            stock 
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category_id, size_id, color_id, availability, stock } = req.body; // Ajout de color_id
    try {
        await Product.update({ 
            name, 
            price, 
            category_id, 
            size_id, 
            color_id, // Inclure color_id lors de la mise à jour
            availability, 
            stock 
        }, { where: { id } });
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

// Récupérer les produits similaires
exports.getSimilarProducts = async (req, res) => {
    const { id } = req.params; // ID du produit sélectionné

    try {
        // Récupérer le produit sélectionné pour obtenir ses attributs
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Trouver des produits similaires (ex: même catégorie et taille)
        const similarProducts = await Product.findAll({
            where: {
                category_id: product.category_id,
                size_id: product.size_id,
                id: { [Op.ne]: id } // Exclure le produit lui-même
            },
            include: [{ model: Category }, { model: Size }] // Inclure les modèles associés si nécessaire
        });

        res.json(similarProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductByName = async (req, res) => {
    try {
       const product = await Product.findOne({ where: { name: req.params.name } });
       if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
