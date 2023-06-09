import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    const result = await AcademicSemester.create(payload);

    return result;
};

export const AcademicSemesterService = {
    createAcademicSemester
};
