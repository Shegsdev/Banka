import { Router } from 'express';
import Auth from '../middleware/verifyToken';
import TransactionsController from '../controllers/transactionsController';

const router = Router();

router
  // .get('/transactions/account')
  .post('/transactions/:accountNumber/credit', Auth.tokenVerify, TransactionsController.creditAccount)
  .post('/transactions/:accountNumber/debit', Auth.tokenVerify, TransactionsController.debitAccount);

export default router;
