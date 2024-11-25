const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { AppError } = require('../utils/error.util');
const errorMessages = require("../utils/errorMessage.util");
require('dotenv').config();

exports.Register = async (userData) => {
    const checkEmail = await User.findOne({ where: { email: userData.email } });
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const [key, value] of Object.entries(userData)) {
        if (!value || value.trim() === '') {
            throw new AppError(400, `Le champ ${key} est vide`);
        }
    }

    if (!regexEmail.test(userData.email))
        throw new AppError(400, errorMessages.INVALID_EMAIL_FORMAT);

    if (checkEmail !== null)
        throw new AppError(409, errorMessages.EMAIL_ALREADY_USE);

    const hashPass = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashPass, exist: true });
};

exports.Login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user)
        throw new AppError(404, errorMessages.NOT_FOUND);

    const comparePass = await bcrypt.compare(password, user.password);
    if (user.email === email && !comparePass)
        throw new AppError(401, errorMessages.INVALID_EMAIL_PASS);

    const userData = { email: user.id, role: user.role };
    return jwt.sign(userData, process.env.JWT_KEY, { expiresIn: '10d' });
};
