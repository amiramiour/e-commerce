const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // 'db' correspond au nom du service dans docker-compose
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion MySQL:', err);
    throw err;
  }
  console.log('Connecté à MySQL');
});

module.exports = connection;
