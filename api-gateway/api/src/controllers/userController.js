const axios = require('../middlewares/axiosConfig');

exports.getUserById = async (req, res) => {
    try {
        await axios.axiosUser.get(`/users/${req.user.id}`).then((response) => {
            res.status(response.status).json(response.data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
    
exports.updateUser = async (req, res) => {
    try {
        await axios.axiosUser.put(`/users/${req.user.id}`, req.body).then((response) => {
            res.status(response.status).json(response.data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await axios.axiosUser.delete(`/users/${req.user.id}`).then((response) => {
            res.status(response.status).json(response.data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}