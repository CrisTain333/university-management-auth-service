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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const index_1 = __importDefault(require('../../../config/index'));
const academicSemesterModel_1 = require('../academicSemester/academicSemesterModel');
const user_model_1 = require('./user.model');
const user_utils_1 = require('./user.utils');
const student_model_1 = require('../student/student.model');
const ApiError_1 = __importDefault(require('../../../error/ApiError'));
const createStudent = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Default password
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    // Set role
    user.role = 'student';
    // Get academic semester
    const academicSemester =
      yield academicSemesterModel_1.AcademicSemester.findById(
        student.academicSemester
      );
    let newUserData = null;
    // Create session
    const session = yield mongoose_1.default.startSession();
    try {
      // start the session
      session.startTransaction();
      const studentId = yield (0, user_utils_1.generateStudentId)(
        academicSemester
      );
      user.id = studentId;
      student.id = studentId;
      //array
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(400, 'Failed to create student');
      }
      //set student -->  _id into user.student
      user.student = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], {
        session,
      });
      if (!newUser.length) {
        throw new ApiError_1.default(400, 'Failed to create user');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      newUserData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    //user --> student ---> academicSemester, academicDepartment , academicFaculty
    if (newUserData) {
      newUserData = yield user_model_1.User.findOne({
        id: newUserData.id,
      }).populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
    }
    return newUserData;
  });
exports.UserService = {
  createStudent,
};
