import mongoose from 'mongoose';
import config from '../../../config/index';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../error/ApiError';

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
    // Default password
    if (!user.password) {
        user.password = config.default_student_pass as string;
    }

    // Set role
    user.role = 'student';

    // Get academic semester
    const academicSemester = await AcademicSemester.findById(student.academicSemester);

    let newUserData = null;
    // Create session
    const session = await mongoose.startSession();
    try {
        // start the session
        session.startTransaction();
        const studentId = await generateStudentId(academicSemester);
        user.id = studentId;
        student.id = studentId;
        //array
        const newStudent = await Student.create([student], { session });

        if (!newStudent.length) {
            throw new ApiError(400, 'Failed to create student');
        }

        //set student -->  _id into user.student
        user.student = newStudent[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(400, 'Failed to create user');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        newUserData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
    //user --> student ---> academicSemester, academicDepartment , academicFaculty

    if (newUserData) {
        newUserData = await User.findOne({ id: newUserData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester'
                },
                {
                    path: 'academicDepartment'
                },
                {
                    path: 'academicFaculty'
                }
            ]
        });
    }

    return newUserData;
};

const createFaculty = async () => {
    console.log('hello');
};

export const UserService = {
    createStudent,
    createFaculty
};
