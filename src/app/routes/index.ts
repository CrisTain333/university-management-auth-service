import express from 'express';
import { UserRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academiFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/academy-semesters', SemesterRoute);
router.use('/academic-faculties', AcademicFacultyRoutes);
router.use('/academic-departments', AcademicDepartmentRoutes);
router.use('/management-departments', ManagementDepartmentRoutes);
router.use('/students', StudentRoutes);
router.use('/faculties', FacultyRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);

export default router;
