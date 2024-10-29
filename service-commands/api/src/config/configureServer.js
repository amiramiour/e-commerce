import express from 'express';
import swaggerUi from 'swagger-ui-express';
import configSwagger from '../config/swagger-config';

const configureServices = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

export default configureServices;
