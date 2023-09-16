import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../../middleware/auth';
import { USER_ENUM_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    USER_ENUM_ROLE.SUPER_ADMIN,
    USER_ENUM_ROLE.ADMIN,
    USER_ENUM_ROLE.FACULTY,
    USER_ENUM_ROLE.STUDENT
  ),
  AuthController.changePassword
);

export const AuthRoutes = router;
