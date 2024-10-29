import express from 'express';
import connectDb from './config/connectDB';
import configureServices from './config/configureServer';
import startServer from './config/startServer';

const app = express();

connectDb();
configureServices(app);
startServer(app);

export default app;
