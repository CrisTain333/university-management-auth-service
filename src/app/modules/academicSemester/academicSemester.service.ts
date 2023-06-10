import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import ApiError from '../../../error/ApiError';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
// import { IPaginationOptions } from '../../../interface/pagination';

const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
        throw new ApiError(400, 'Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);

    return result;
};

type IGenericResponse<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};

const getAllSemestersFromDb = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

    const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
    const total = await AcademicSemester.countDocuments();

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

export const AcademicSemesterService = {
    createAcademicSemester,
    getAllSemestersFromDb
};
