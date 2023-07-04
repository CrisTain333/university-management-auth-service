import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.interface';

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

const refreshToken = catchAsync(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;

        const result = await AuthService.refreshToken(refreshToken);

        // set refresh token into cookie

        const cookieOptions = {
            secure: config.NODE_ENV === 'production',
            httpOnly: true
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        sendResponse<IRefreshTokenResponse>(res, {
            statusCode: 200,
            success: true,
            message: 'User Logged successfully !',
            data: result
        });
    }
);

export const AuthController = {
    loginUser,
    refreshToken
};
