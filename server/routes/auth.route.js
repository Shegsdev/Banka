import { Router } from 'express';
import SignupController from '../controllers/auth/signup.controller';
import SigninController from '../controllers/auth/signin.controller';

const router = Router();

router
  .post('/auth/signup', SignupController.signup)
  .post('/auth/signin', SigninController.signin);

export default router;
