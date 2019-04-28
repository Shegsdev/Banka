import { Router } from 'express';
import Auth from '../middleware/verifyToken';
import TransactionsController from '../controllers/transactionsController';

const router = Router();

router.get('/transactions/:transactionId', Auth.tokenVerify, TransactionsController.findOne);

export default router;
