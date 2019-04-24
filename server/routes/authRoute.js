import { Router } from 'express';
import SignupController from '../controllers/auth/signupController';
import SigninController from '../controllers/auth/signinController';

const router = Router();

router
  .post('/auth/signup', SignupController.signup)
  .post('/auth/signin', SigninController.signin);

export default router;
