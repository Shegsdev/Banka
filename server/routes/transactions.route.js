import { Router } from 'express';
import Auth from '../middleware/verifyToken';
import TransactionsController from '../controllers/transactions.controller';

const router = Router();

router
  .post('/transactions/:accountNumber/credit', Auth.tokenVerify, TransactionsController.creditAccount);

export default router;
