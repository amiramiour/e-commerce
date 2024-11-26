const axios = require('../middlewares/axiosConfig');

exports.getUserById = async (req, res) => {
    try {
        const response = await axios.axiosUser.get(`/${req.user.id}`);
        res.status(response.status).json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
    
exports.updateUser = async (req, res) => {
    try {
        const response = await axios.axiosUser.put(`/${req.user.id}`, req.body)
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const response = await axios.axiosUser.delete(`/${req.user.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.userRegister = async (req, res) => {
    try {
        const response = await axios.axiosAuth.post('/register', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
        
    }
}

exports.userLogin = async (req, res) => {
    try {
        const response = await axios.axiosAuth.post('/login', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}