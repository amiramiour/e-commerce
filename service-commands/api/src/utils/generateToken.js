/*// api/src/utils/generateToken.js

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Utilisation d'un utilisateur fictif pour générer le token
const userPayload = {
  id: 1,
  username: 'testuser',
  role: 'user' // Utilise le rôle que tu veux pour tester
};

const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Token généré :', token);*/
