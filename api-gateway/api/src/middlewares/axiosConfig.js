const axios = require('axios');

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3002';
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';
const commandServiceUrl = process.env.COMMAND_SERVICE_URL || 'http://localhost:3004';
const paimentServiceUrl = process.env.PAIMENT_SERVICE_URL || 'http://localhost:3005';

exports.axiosAuth = axios.create({
    baseURL: `${authServiceUrl}/auth`
});

exports.axiosUser = axios.create({
    baseURL: `${userServiceUrl}/users`
});

exports.axiosProduct = axios.create({
    baseURL: `${productServiceUrl}/`
});

exports.axiosOrder = axios.create({
    baseURL: `${commandServiceUrl}/`
});


exports.axiosPaiment = axios.create({
    baseURL: `${paimentServiceUrl}/`
});

