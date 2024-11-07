const express = require('express');
const { connectDB } = require('./config/connectDb');
const configureServices = require('./config/configureServices');
const startServeur = require('./config/startServeur');

const app = express();

connectDB();
configureServices(app);
startServeur(app);
