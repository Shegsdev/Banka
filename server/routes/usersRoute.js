import { Router } from 'express';
import Admin from '../middleware/admin';
import Auth from '../middleware/verifyToken';
import UsersController from '../controllers/usersController';

const router = Router();

router
  .get('/users', Auth.tokenVerify, Admin.nonStaff, UsersController.findAll)
  .get('/users/:id', Auth.tokenVerify, Admin.nonStaff, UsersController.findOne)
  .post('/admin/new', UsersController.addStaff);

export default router;
