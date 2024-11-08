const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = async (req, res, next)=> {
    try {
        let token = req.headers['authorization'];

        if (token) {
            token = token.split(' ')[1];  // Prendre la partie après 'Bearer'
            
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error); 
                    } else {
                        resolve(decoded); 
                    }
                });
            });

            // Attacher le payload à la requête
            req.user = payload;
            next(); // Passer à la prochaine middleware ou handler
        } else {
            // Si aucun token n'est trouvé dans l'en-tête
            return res.status(401).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        console.error(error); 
        res.status(403).json({ message: "Accès interdit: token invalide" });
    }
};