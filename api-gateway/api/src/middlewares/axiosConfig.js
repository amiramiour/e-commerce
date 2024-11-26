const axios = require('axios');

exports.axiosAuth = axios.create({
    baseURL: 'http://localhost:3001/auth'
});

exports.axiosUser = axios.create({
    baseURL: 'http://localhost:3002/users'
});

exports.axiosProduct = axios.create({
    baseURL: 'http://localhost:3003'
});

exports.axiosOrder = axios.create({
    baseURL: 'http://localhost:3004'
});


exports.axiosPaiment = axios.create({
    baseURL: 'http://localhost:3005'
});

