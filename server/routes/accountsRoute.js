import { Router } from 'express';
import AccountsController from '../controllers/accountsController';

const router = Router();

router
  .get('/accounts/:accountNumber', AccountsController.findOne)
  .get('/accounts', AccountsController.findAll)
  .get('/accounts/:accountNumber/transactions', AccountsController.getTransactions)
  .post('/accounts', AccountsController.create)
  .patch('/accounts/:accountNumber', AccountsController.changeStatus)
  .delete('/accounts/:accountNumber', AccountsController.delete);

export default router;
