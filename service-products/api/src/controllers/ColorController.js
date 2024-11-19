// controllers/ColorController.js
const { Color } = require('../models');

// Get all colors
exports.getAllColors = async (req, res) => {
    try {
        const colors = await Color.findAll();
        res.json(colors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new color
exports.createColor = async (req, res) => {
    const { name } = req.body;
    try {
        const color = await Color.create({ name });
        res.status(201).json(color);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a color
exports.updateColor = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Color.update({ name }, { where: { id } });
        res.json({ message: 'Color updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a color
exports.deleteColor = async (req, res) => {
    const { id } = req.params;
    try {
        await Color.destroy({ where: { id } });
        res.json({ message: 'Color deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
