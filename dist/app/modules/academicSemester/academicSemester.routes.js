'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SemesterRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../../middleware/validateRequest')
);
const academicSemester_validate_1 = require('./academicSemester.validate');
const academicSemester_controller_1 = require('./academicSemester.controller');
const router = express_1.default.Router();
// Create semester
router.post(
  '/create-semester',
  (0, validateRequest_1.default)(
    academicSemester_validate_1.AcademicSemesterValidate
      .academicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademySemesterController.createAcademicSemester
);
// Get single semester
router.get(
  '/:id',
  academicSemester_controller_1.AcademySemesterController.getSingleSemester
);
//Update  semesters
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicSemester_validate_1.AcademicSemesterValidate
      .updateAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademySemesterController.updateSemester
);
// delete semester
router.delete(
  '/:id',
  academicSemester_controller_1.AcademySemesterController.deleteSemester
);
//Get semesters
router.get(
  '/',
  academicSemester_controller_1.AcademySemesterController.getAllSemesters
);
exports.SemesterRoute = router;
