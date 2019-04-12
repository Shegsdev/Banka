import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router
  .get('/users', UsersController.findAll)
  .get('/users/:id', UsersController.findOne)
  .post('/admin/new', UsersController.addStaff);

export default router;
