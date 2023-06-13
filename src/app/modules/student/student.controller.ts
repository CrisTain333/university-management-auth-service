import { NextFunction, Request, Response } from 'express';
// import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from '../users/user.service';

const getAllStudents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    // Send Response
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        data: result
    });

    next();
});

export const StudentController = {
    getAllStudents
};
