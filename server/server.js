import debug from 'debug';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import {
  authRoute,
  usersRoute,
  accountsRoute,
  transactionsRoute,
} from './routes';

const log = debug('express:server');

const app = express();
app.set('port', process.env.PORT || 5000);

const swaggerDefinition = {
  info: {
    title: 'Banka API',
    version: '1.0.0',
    // eslint-disable-next-line comma-dangle
    description: 'API docs for Banka Application'
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./api-docs/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    status: 200,
    data: 'Welcome to Banka API',
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', [usersRoute, accountsRoute, authRoute, transactionsRoute]);

// Custom 404 route
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

app.listen(app.get('port'), () => log(`LISTENING ON PORT ${app.get('port')}`));
