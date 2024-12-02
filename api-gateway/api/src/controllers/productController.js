const axios = require('../middlewares/axiosConfig');

exports.getAllProducts = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get('/gestion/products');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: error.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const response = await axios.axiosProduct.post('/gestion/products', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du produit', error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const response = await axios.axiosProduct.put(`/gestion/products/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const response = await axios.axiosProduct.delete(`/gestion/products/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: error.message });
    }
}

exports.getProductByName = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get(`/gestion/products/${req.params.name}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: error.message });
    }
}

exports.getSimilarProducts = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get(`/gestion/products/${req.params.id}/similar`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits similaires', error: error.message });
    }
}