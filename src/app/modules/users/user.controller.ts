import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createStudent = catchAsync(async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    // Send Response
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        data: result
    });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
    // console.log('hello', req, res);
    const { faculty, ...userData } = req.body;
    console.log(faculty);
    const result = await UserService.createFaculty(faculty, userData);

    // Send Response
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty Created Successfully',
        data: result
    });
});

export const UserController = {
    createStudent,
    createFaculty
};
