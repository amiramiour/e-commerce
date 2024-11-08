const express = require('express');
const { connectDB } = require('./config/database');
const configureServices = require('./config/configService');
const startServer = require('./config/startServer');

const app = express();

connectDB();
configureServices(app);
startServer(app);