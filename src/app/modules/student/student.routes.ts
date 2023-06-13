import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// Get Single Student
// router.get('/:id', StudentController.getSingleStudent);

//Get All Students
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
