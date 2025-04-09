import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { userValidation } from '../user/user.validation';
import { authController } from './auth.controller';

const authrouter = Router();

authrouter.post(
  '/register',
  validateRequest(userValidation.UserSchema),
  authController.register,
);

authrouter.get(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

export default authrouter;
