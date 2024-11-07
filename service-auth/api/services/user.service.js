const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.Register = async (req, res) => {
    const checkEmail = await User.findOne({ where : { email: req.body.email } });
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hashPass = await bcrypt.hash(req.body.password, 10);

    if(!regexEmail.test(req.body.email)) {
        return res.status(409).json({ message : "L'email n'a pas le bon format." })
    }

    if(checkEmail == null){
        return await User.create({...req.body, password: hashPass, exist: true});
    } else {
        res.status(401).json({message: "Un compte est déjà lié à cet email."});
    }
}

exports.Login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(!user)
        return res.status(404).json({ message: 'Aucun compte ne correspond à cet email.' });
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if(user.email === req.body.email && comparePass) {
        const userData = {
            email: user.email,
            role: user.role,
        }
        return jwt.sign(userData, process.env.JWT_KEY, { expiresIn: '10d' });
    } else {
        res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
}