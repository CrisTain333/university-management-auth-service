import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicSemesterValidate } from './academicSemester.validate';
import { AcademySemesterController } from './academicSemester.controller';
const router = express.Router();
// Create semester
router.post(
    '/create-semester',
    validateRequest(AcademicSemesterValidate.academicSemesterZodSchema),
    AcademySemesterController.createAcademicSemester
);

// Get single semester
router.get('/:id', AcademySemesterController.getSingleSemester);

//Update  semesters
router.patch(
    '/:id',
    validateRequest(AcademicSemesterValidate.updateAcademicSemesterZodSchema),
    AcademySemesterController.updateSemester
);

// delete semester
router.delete('/:id', AcademySemesterController.deleteSemester);

//Get semesters
router.get('/', AcademySemesterController.getAllSemesters);
export const SemesterRoute = router;
