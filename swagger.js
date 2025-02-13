import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local development server',
      },
      {
        url: 'https://node-js-crud-app-aute.onrender.com/api',
        description: 'production server on Render',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Gadget: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the gadget',
            },
            name: {
              type: 'string',
              description: 'The name of the gadget',
            },
            codename: {
              type: 'string',
              description: 'The codename of the gadget',
            },
            status: {
              type: 'string',
              description: 'The status of the gadget (e.g.,"Available", "Deployed", "Destroyed", "Decommissioned")',
            },
            successProbability: {
              type: 'number',
              description: 'The probability of mission success for the gadget',
            },
            decommissionedTimestamp: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the gadget was decommissioned else null',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the user',
            },
            username: {
              type: 'string',
              description: 'The username of the user',
            },
            role: {
              type: 'string',
              description: 'The role of the user (e.g., admin, user) default is user',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
