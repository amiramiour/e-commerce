const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour vérifier le token d'un utilisateur
exports.verifyTokenUser = async (req, res, next) => {
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
            return res.status(403).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        // Si le token est invalide ou une autre erreur survient
        return res.status(403).json({ message: "Accès interdit: token invalide" });
    }
};
