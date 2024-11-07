// api/src/controllers/ordersController.js

const Order = require('../models/orderModel');

// Créer une nouvelle commande
exports.createOrderController = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;
    try {
        const order = await Order.create({ product_id, quantity, total_price });
        res.status(201).json({ message: 'Commande créée avec succès', data: order });
    } catch (err) {
        console.error('Erreur lors de la création de la commande:', err);
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: err });
    }
};

// Récupérer toutes les commandes
exports.getAllOrdersController = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Erreur lors de la récupération des commandes:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: err });
    }
};

// Récupérer une commande par ID
exports.getOrderByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (err) {
        console.error('Erreur lors de la récupération de la commande:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error: err });
    }
};

// Mettre à jour une commande par ID
exports.updateOrderController = async (req, res) => {
    const { id } = req.params;
    const { product_id, quantity, total_price } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.update({ product_id, quantity, total_price });
            res.status(200).json({ message: 'Commande mise à jour avec succès', data: order });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la commande:', err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error: err });
    }
};

// Supprimer une commande par ID
exports.deleteOrderController = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.destroy();
            res.status(200).json({ message: 'Commande supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (err) {
        console.error('Erreur lors de la suppression de la commande:', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error: err });
    }
};
