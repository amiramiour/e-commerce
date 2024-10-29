const jwt = require('jsonwebtoken');
require('dotenv').config();

//fonction pour vérifier le token d'un utilisateur
exports.verifyTokenUser = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            next();
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
        next();
    } catch (error) {
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}