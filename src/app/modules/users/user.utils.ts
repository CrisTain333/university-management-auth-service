import ApiError from '../../../error/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student'
        },
        { id: 1, _id: 0 }
    )
        .sort({
            createdAt: -1
        })
        .lean();

    // 2 3 0 1 0 0 0 0 3

    // F - 0 0 0 0 1;

    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (academicSemester: IAcademicSemester | null) => {
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

    if (academicSemester) {
        incrementedId = `${academicSemester.year.substring(2)}${
            academicSemester.code
        }${incrementedId}`;
    } else {
        throw new ApiError(400, 'Academic Semester is required to generate student id');
    }

    return incrementedId;
};

export const findLastFacultyId = async () => {
    const lastFacultyId = await User.findOne(
        {
            role: 'faculty'
        },
        { id: 1, _id: 0 }
    )
        .sort({
            createdAt: -1
        })
        .lean();

    return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

    //formate the Faculty Id
    incrementedId = `F-${incrementedId}`;

    return incrementedId;
};
