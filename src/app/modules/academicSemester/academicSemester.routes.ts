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

router.get('/', AcademySemesterController.getAllSemesters);

export const SemesterRoute = router;
