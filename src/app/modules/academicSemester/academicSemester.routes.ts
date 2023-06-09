import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicSemesterValidate } from './academicSemester.validate';
import { AcademySemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
    '/create-semester',
    validateRequest(AcademicSemesterValidate.academicSemesterZodSchema),
    AcademySemesterController.createAcademicSemester
);

export const SemesterRoute = router;
