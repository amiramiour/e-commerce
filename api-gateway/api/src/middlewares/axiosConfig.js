const axios = require('axios');

exports.axiosUser = axios.create({
    baseURL: 'http://localhost:3002'
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

