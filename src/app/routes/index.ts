import express from 'express';
import { UserRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/academy-semesters', SemesterRoute);

export default router;
