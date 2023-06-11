import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester, IAcademicSemesterFilter } from './academicSemester.interface';
import { academicSemesterTitleCodeMapper, searchAbleFields } from './academicSemester.constant';
import ApiError from '../../../error/ApiError';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
// import { IPaginationOptions } from '../../../interface/pagination';

type IGenericResponse<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};
const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
        throw new ApiError(400, 'Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);

    return result;
};

const getAllSemestersFromDb = async (
    paginationOptions: IPaginationOptions,
    filters: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: searchAbleFields.map((fields) => ({
                [fields]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }

    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(paginationOptions);

    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await AcademicSemester.find(whereConditions)
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

const getSingleSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findById(id);
    return result;
};

// const getSingleSemester = async()

export const AcademicSemesterService = {
    createAcademicSemester,
    getAllSemestersFromDb,
    getSingleSemester
};
