// controllers/userController.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const argon2 = require('argon2');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erreur de validation: ' + error.message });
        }
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// Récupérer les informations de l'utilisateur connecté
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Utilise l'ID extrait du token
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Mettre à jour les informations de l'utilisateur connecté
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.user.id }, // Utilise l'ID extrait du token
        });
        if (!updated) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        const updatedUser = await User.findByPk(req.user.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erreur de validation: ' + error.message });
        }
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

// Supprimer l'utilisateur connecté
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.user.id }, // Utilise l'ID extrait du token
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

