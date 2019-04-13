import { Router } from 'express';
import AccountsController from '../controllers/accounts.controller';

const router = Router();

router
  .get('/accounts/:accountNumber', AccountsController.findOne)
  .get('/accounts', AccountsController.findAll)
  .post('/accounts', AccountsController.create)
  .patch('/accounts/:accountNumber', AccountsController.changeStatus)
  .delete('/accounts/:accountNumber', AccountsController.delete);

export default router;
