import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../constant/pagination';
import pick from '../../../shared/pick';

const createAcademicSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...academicSemesterData } = req.body;
        const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData);

        // Send Response
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Academy semester created successfully',
            data: result
        });
        next();
    }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemestersFromDb(paginationOptions, filters);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Semester retrieved successfully ',
        data: result?.data,
        meta: result?.meta
    });
    next();
});

export const AcademySemesterController = {
    createAcademicSemester,
    getAllSemesters
};
