// import { RequestHandler } from 'express';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...academicSemesterData } = req.body;
        const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData);
        next();
        res.status(200).json({
            success: true,
            message: 'Academy semester created successfully!',
            data: result
        });
    }
);

export const AcademySemesterController = {
    createAcademicSemester
};
