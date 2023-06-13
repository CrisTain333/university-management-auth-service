import express from 'express';
import { UserRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academiFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.routes';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/academy-semesters', SemesterRoute);
router.use('/academic-faculties', AcademicFacultyRoutes);
router.use('/academic-departments', AcademicDepartmentRoutes);
router.use('/students', StudentRoutes);

export default router;
