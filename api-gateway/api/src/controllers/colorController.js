const axios = require('../middlewares/axiosConfig');

exports.getAllColors = async (req, res) => {
    try {
        const response = await axios.axiosProduct.get('/gestion/colors');
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des couleurs', error: error.message });
    }
}

exports.createColor = async (req, res) => {
    try {
        const response = await axios.axiosProduct.post('/gestion/colors', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la couleur', error: error.message });
    }
}

exports.updateColor = async (req, res) => {
    try {
        const response = await axios.axiosProduct.put(`/gestion/colors/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la couleur', error: error.message });
    }
}

exports.deleteColor = async (req, res) => {
    try {
        const response = await axios.axiosProduct.delete(`/gestion/colors/${req.params.id}`);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la couleur', error: error.message});
    }
}