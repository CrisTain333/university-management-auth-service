import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { UserValidate } from './user.validate';
// import usersController from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidate.userZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidate.facultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidate.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoute = router;
