// api/src/controllers/ordersController.js
const Order = require('../models/orderModel');

// Créer une nouvelle commande
const createOrder = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;
    try {
        const order = await Order.create({ product_id, quantity, total_price });
        res.status(201).json({ message: 'Commande créée avec succès', data: order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

// Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

// Récupérer une commande par ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
    }
};

// Mettre à jour une commande par ID
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { product_id, quantity, total_price } = req.body;
    try {
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
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
    }
};

// Supprimer une commande par ID
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Order.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Commande supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
