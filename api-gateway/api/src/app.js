const express = require('express');
const configureServices = require('./services/configureService');
const configureRoutes = require('./services/startService');

const app = express();
configureServices(app);
configureRoutes(app);