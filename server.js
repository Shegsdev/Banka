import express from 'express';
import bodyParser from 'body-parser';

import { usersRoute, accountsRoute } from './server/routes';

const app = express();
app.set('port', process.env.PORT || 5000);

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    status: 200,
    data: 'Welcome to Banka API',
  });
});

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// append /api to http requests
app.use('/api/v1', [usersRoute, accountsRoute]);

app.listen(app.get('port'), () => console.log(`LISTENING ON PORT ${app.get('port')}`));
