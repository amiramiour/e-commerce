const AuthService = require('../services/user.service');
const { errorHandler } = require('../utils/error.util');

exports.userRegister = async (req, res) => {
    try {
        await AuthService.Register(req.body);
        res.status(201).json({ message: 'Votre compte a bien été créé.' });
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.userLogin = async (req, res) => {
    try {
        const token = await AuthService.Login(req.body.email, req.body.password);
        res.status(200).json({ message: 'Connecté.', token });
    } catch (err) {
        errorHandler(err, res);
    }
};
