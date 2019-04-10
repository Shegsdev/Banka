import { Router } from 'express';
import Account from '../controllers/accounts.controller';

const router = Router();

router
  .get('/accounts/:accountNumber', Account.findOne)
  .get('/accounts', Account.findAll)
  .post('/accounts', Account.create)
  .patch('/account/:accountNumber', Account.changeStatus)
  .delete('/accounts/:accountNumber', Account.delete);

export default router;
