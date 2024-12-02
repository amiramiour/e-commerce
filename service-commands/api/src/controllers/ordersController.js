const Order = require('../models/orderModel');

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;
    try {
        // Création de la commande dans la base de données
        const order = await Order.create({ product_id, quantity, total_price, user_id: req.params.id_user });
        res.status(201).json({ message: 'Commande créée avec succès', data: order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
};

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        // Récupération de toutes les commandes
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: error.message });
    }
};

// Récupérer une commande par ID
exports.getOrderById = async (req, res) => {
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

// Récupérer une commande par ID
exports.getOrdersOfAUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Recherche de la commande par son ID
        const orders = await Order.findAll({ where: { user_id: id_user } });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error: error.message });
    }
};