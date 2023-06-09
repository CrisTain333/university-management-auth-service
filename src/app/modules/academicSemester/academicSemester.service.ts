import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import ApiError from '../../../error/ApiError';

const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
        throw new ApiError(400, 'Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);

    return result;
};

export const AcademicSemesterService = {
    createAcademicSemester
};
