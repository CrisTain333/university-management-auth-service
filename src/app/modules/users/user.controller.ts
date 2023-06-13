import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);

    // Send Response
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        data: result
    });

    next();
});

export const UserController = {
    createStudent
};
