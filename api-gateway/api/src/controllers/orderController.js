
const axios = require('../middlewares/axiosConfig');

exports.createOrder = async (req, res) => {
    try {
        await axios.axiosOrder.post(`/orders/${req.user.id}`, req.body).thne((response) => {
            res.status(response.status).json(response.data);
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
}


exports.getUserOrders = async (req, res) => {
    try {
        const response = await axios.axiosOrder.get(`/orders/usres/${req.user.id}`);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: error.message });
    }
}