/* eslint-disable import/no-extraneous-dependencies */
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo-Server',
      version: '0.0.1',
    },
  },
  apis: ['./src/api/routes/*/*.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

export { swaggerUi, openapiSpecification };
