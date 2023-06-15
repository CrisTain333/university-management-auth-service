'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/users/user.route');
const academicSemester_routes_1 = require('../modules/academicSemester/academicSemester.routes');
const academiFaculty_routes_1 = require('../modules/academicFaculty/academiFaculty.routes');
const academicDepartment_routes_1 = require('../modules/academicDepartment/academicDepartment.routes');
const student_routes_1 = require('../modules/student/student.routes');
const router = express_1.default.Router();
router.use('/users', user_route_1.UserRoute);
router.use('/academy-semesters', academicSemester_routes_1.SemesterRoute);
router.use('/academic-faculties', academiFaculty_routes_1.AcademicFacultyRoutes);
router.use('/academic-departments', academicDepartment_routes_1.AcademicDepartmentRoutes);
router.use('/students', student_routes_1.StudentRoutes);
exports.default = router;
