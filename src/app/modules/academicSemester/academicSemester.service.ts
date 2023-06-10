import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester, IAcademicSemesterFilter } from './academicSemester.interface';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import ApiError from '../../../error/ApiError';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
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
    paginationOptions: IPaginationOptions,
    filters: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(paginationOptions);

    const { searchTerm } = filters;

    const andConditions = [
        {
            $or: [
                {
                    title: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    code: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    year: {
                        $regex: searchTerm,
                        $options: ''
                    }
                }
            ]
        }
    ];

    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const result = await AcademicSemester.find({ $and: andConditions })
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
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
