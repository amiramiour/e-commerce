const axios = require('../middlewares/axiosConfig');

exports.getAllCategories = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get('/gestion/categories');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error: error.message });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const response = await axios.axiosProduct.post('/gestion/categories', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const response = await axios.axiosProduct.put(`/gestion/categories/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie', error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const response = await axios.axiosProduct.delete(`/gestion/categories/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error: error.message });
    }
}