import { Router } from 'express';
import Admin from '../middleware/admin';
import Auth from '../middleware/verifyToken';
import AccountsController from '../controllers/accountsController';
import TransactionsController from '../controllers/transactionsController';

const router = Router();

router
  .get('/accounts/:accountNumber', Auth.tokenVerify, AccountsController.findOne)
  .get('/accounts', /*Auth.tokenVerify, Admin.nonStaff,*/ AccountsController.findAll)
  .get('/accounts/:accountNumber/transactions', Auth.tokenVerify, TransactionsController.findAll)
  .post('/transactions/:accountNumber/credit', Auth.tokenVerify, AccountsController.creditAccount)
  .post('/transactions/:accountNumber/debit', Auth.tokenVerify, AccountsController.debitAccount)
  .post('/accounts', Auth.tokenVerify, AccountsController.create)
  .patch('/accounts/:accountNumber', Auth.tokenVerify, Admin.nonStaff, AccountsController.changeStatus)
  .delete('/accounts/:accountNumber', Auth.tokenVerify, Admin.nonStaff, AccountsController.delete);

export default router;
