// controllers/userController.js

const User = require('../models/user');
const argon2 = require('argon2');

// Récupérer les informations de l'utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Utilise l'ID passé en paramètre
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Mettre à jour les informations de l'utilisateur par ID
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }, // Utilise l'ID passé en paramètre
        });
        if (!updated) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erreur de validation: ' + error.message });
        }
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

// Supprimer l'utilisateur par ID
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }, // Utilise l'ID passé en paramètre
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(204).json(); // Pas de contenu
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};