const axios = require('../middlewares/axiosConfig');

exports.createCheckout = async (req, res) => {
    try {
        await axios.axiosPaiment.post(`/paiment/${req.user.id}/create-checkout-session`, req.body).then((response) => {
            res.status(response.status).json(response.data);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}