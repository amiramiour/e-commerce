const axios = require('../middlewares/axiosConfig');

exports.GetUserById = async (req, res) => {
    try {
        await axios.axiosUser.get(`/users/${req.user.id}`).then((response) => {
            res.status(response.status).json(response.data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
    