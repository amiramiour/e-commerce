const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;

/****************** REGISTER A USER ******************/
/* 
    This function allow a user to create an account

    Checking :
        - Check if the email isn't already in db
        - The user can choice if he create a company account or student account

*/

exports.userRegister = async (req, res) => {
    try {
        const checkEmail = await User.findOne({ where : { email: req.body.email } });
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        if(!regex.test(req.body.email)) {
            return res.status(409).json({ message : "L'email n'a pas le bon format." })
        }

        if(checkEmail == null){
            await User.create({...req.body, password: hashPass, exist: true});
            res.status(201).json({message: 'Votre compte a bien été créé.'});
        } else {
            res.status(401).json({message: "Un compte est déjà lié à cet email."});
        }
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err });
    }
}


/****************** CONNECT A USER ******************/
/* 
    This function allow a user to connect him to his account

    Checking :
        - Check if the email and password is in db

*/
exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if(!user)
            return res.status(404).json({ message: 'Aucun compte ne correspond à cet email.' });
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if(user.email === req.body.email && comparePass) {
            const userData = {
                email: user.email,
                role: user.role,
            }
            const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: '10d' });
            res.status(201).json({ message: 'Connecté.', token });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des données.', err });
    }
}
