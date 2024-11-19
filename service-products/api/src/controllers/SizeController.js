const { Size } = require('../models');

// Afficher toutes les tailles
exports.getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.findAll();
        res.json(sizes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter une nouvelle taille
exports.createSize = async (req, res) => {
    const { size } = req.body;
    try {
        const newSize = await Size.create({ size });
        res.status(201).json(newSize);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une taille existante
exports.updateSize = async (req, res) => {
    const { id } = req.params;
    const { size } = req.body;
    try {
        await Size.update({ size }, { where: { id } });
        res.json({ message: 'Size updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une taille
exports.deleteSize = async (req, res) => {
    const { id } = req.params;
    try {
        await Size.destroy({ where: { id } });
        res.json({ message: 'Size deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
