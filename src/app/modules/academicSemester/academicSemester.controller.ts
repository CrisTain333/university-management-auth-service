import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../constant/pagination';
import pick from '../../../shared/pick';
import { IAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData);

    // Send Response
    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: 'Academy semester created successfully',
        data: result
    });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemestersFromDb(paginationOptions, filters);

    sendResponse<IAcademicSemester[]>(res, {
        statusCode: 200,
        success: true,
        message: 'Semesters retrieved successfully ',
        meta: result?.meta,
        data: result?.data
    });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: 'Semester retrieved successfully !',
        data: result
    });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicSemesterService.updateSemester(id, updatedData);

    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: 'Semester updated successfully !',
        data: result
    });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: 'Semester deleted successfully !',
        data: result
    });
});

export const AcademySemesterController = {
    createAcademicSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester
};
