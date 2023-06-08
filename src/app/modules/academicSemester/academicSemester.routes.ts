import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicSemesterValidate } from './academicSemester.validate';
// import usersController from './user.controller';
const router = express.Router();

router.post(
    '/create-user',
    validateRequest(AcademicSemesterValidate.academicSemesterZodSchema)
    // UserController.createUser
);

export const AcademicSemesterRoute = router;
