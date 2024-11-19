const { Category } = require('../models');

// Afficher toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter une nouvelle catégorie
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une catégorie existante
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Category.update({ name }, { where: { id } });
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.destroy({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
