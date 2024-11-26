const express = require('express');
const configureServices = require('./services/configureService');
const startServices = require('./services/startService');

const app = express();
configureServices(app);
startServices(app);