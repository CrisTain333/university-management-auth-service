'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateFacultyId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
    void 0;
const ApiError_1 = __importDefault(require('../../../error/ApiError'));
const user_model_1 = require('./user.model');
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne(
      {
        role: 'student',
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent.id.substring(4)
      : undefined;
  });
exports.findLastStudentId = findLastStudentId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    if (academicSemester) {
      incrementedId = `${academicSemester.year.substring(2)}${
        academicSemester.code
      }${incrementedId}`;
    } else {
      throw new ApiError_1.default(
        400,
        'Academic Semester is required to generate student id'
      );
    }
    return incrementedId;
    // incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`;
    // return incrementedId;
  });
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      { role: 'faculty' },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty.id.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
  });
exports.generateFacultyId = generateFacultyId;
