import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie

    const cookieOptions = {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user login in successfully',
        data: others
    });
});

export const AuthController = {
    loginUser
};
