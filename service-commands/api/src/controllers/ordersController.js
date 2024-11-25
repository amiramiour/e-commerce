const Order = require('../models/orderModel');

// Créer une nouvelle commande
const createOrder = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;
    try {
        // Création de la commande dans la base de données
        const order = await Order.create({ product_id, quantity, total_price });
        res.status(201).json({ message: 'Commande créée avec succès', data: order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
};

// Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
    try {
        // Récupération de toutes les commandes
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: error.message });
    }
};

// Récupérer une commande par ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        // Recherche de la commande par son ID
        const order = await Order.findByPk(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error: error.message });
    }
};

// Mettre à jour une commande par ID
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { product_id, quantity, total_price } = req.body;
    try {
        // Mise à jour de la commande
        const [updated] = await Order.update(
            { product_id, quantity, total_price },
            { where: { id } }
        );
        if (updated) {
            res.status(200).json({ message: 'Commande mise à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error: error.message });
    }
};

// Supprimer une commande par ID
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression de la commande
        const deleted = await Order.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Commande supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
