const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.verifyTokenUser = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        // Vérifie si le token commence par "Bearer " et extrait le token
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Supprime "Bearer " du token
    }

        if (token) {
            // Utilisation de jwt.verify directement avec async/await
            const payload = jwt.verify(token, process.env.JWT_KEY);

            // Ajoute les informations de l'utilisateur à la requête
            req.user = payload;
            next();
        } else {
            // Si aucun token n'est trouvé
            return res.status(403).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        // Erreur lors de la vérification du token (par exemple, token invalide ou expiré)
        console.error(error);
        
        // Si le token est invalide ou expiré
        return res.status(403).json({ message: "Accès interdit: token invalide ou expiré" });
    }
};

exports.verifyTokenAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        // Vérifie si le token commence par "Bearer " et extrait le token
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); // Supprime "Bearer " du token
        }

        if (token) {
            // Utilisation de jwt.verify directement avec async/await
            const payload = jwt.verify(token, process.env.JWT_KEY);

            // Ajoute les informations de l'utilisateur à la requête
            req.user = payload;

            // role = 1 pour les administrateurs
            if(!req.user.role) {
                next();
            } else {
                return res.status(403).json({ message: "Accès interdit: rôle administrateur requis" });
            }
        } else {
            // Si aucun token n'est trouvé
            return res.status(403).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        // Erreur lors de la vérification du token (par exemple, token invalide ou expiré)
        console.error(error);
        
        // Si le token est invalide ou expiré
        return res.status(403).json({ message: "Accès interdit: token invalide ou expiré" });
    }
};