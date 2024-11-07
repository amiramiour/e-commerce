// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = async (req, res, next) => {
    if (req.originalUrl.includes('/create') || req.originalUrl === '/api/users/login') {
        return next(); 
    }

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(403).json({ message: "Accès interdit : token manquant" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; 

        next();
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        res.status(403).json({ message: "Accès interdit : token invalide" });
    }
};

