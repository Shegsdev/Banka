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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'x-access-token']);
  res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT', 'DELETE']);
  next();
});

const swaggerDefinition = {
  info: {
    title: 'Banka API',
    version: '2.0.0',
    // eslint-disable-next-line comma-dangle
    description: 'API docs for Banka Application'
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'x-access-token',
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

app.get('/api/v2', (req, res) => {
  res.status(200).send({
    status: 200,
    data: 'success',
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v2', [usersRoute, accountsRoute, authRoute, transactionsRoute]);

// Custom 404 route
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

app.listen(app.get('port'), () => log(`LISTENING ON PORT ${app.get('port')}`));
