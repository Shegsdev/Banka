import { Router } from 'express';
// import Auth from '../middleware/verifyToken';
import TransactionsController from '../controllers/transactions.controller';

const router = Router();

router
  .post('/transactions/:accountNumber/credit', TransactionsController.creditAccount)
  .post('/transactions/:accountNumber/debit', TransactionsController.debitAccount);

export default router;
