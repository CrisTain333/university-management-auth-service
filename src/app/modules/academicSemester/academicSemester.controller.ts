// import { RequestHandler } from 'express';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';

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

export const AcademySemesterController = {
    createAcademicSemester
};
