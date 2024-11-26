const axios = require('../middlewares/axiosConfig');

exports.getAllSizes = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get('/gestion/sizes');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tailles', error: error.message });
    }
}

exports.createSize = async (req, res) => {
    try {
        const response = await axios.axiosProduct.post('/gestion/sizes', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la taille', error: error.message });
    }
}

exports.updateSize = async (req, res) => {
    try {
        const response = await axios.axiosProduct.put(`/gestion/sizes/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la taille', error: error.message });
    }
}

exports.deleteSize = async (req, res) => {
    try {
        const response = await axios.axiosProduct.delete(`/gestion/sizes/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la taille', error: error.message });
    }
}