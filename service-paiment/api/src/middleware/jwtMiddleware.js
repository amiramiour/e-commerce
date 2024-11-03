const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export const verifyToken = async (req, res, next)=> {
    try {
        const token = req.headers['authorization'];

        if (token) {
            const payload = await new Promise<any>((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            req.user = payload; 
            next();
        } else {
            res.status(403).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        console.error(error); 
        res.status(403).json({ message: "Accès interdit: token invalide" });
    }
};