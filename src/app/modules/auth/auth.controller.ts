import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user login in successfully',
        data: result
    });
});

export const AuthController = {
    loginUser
};
