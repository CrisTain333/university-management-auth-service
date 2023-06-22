import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { User } from '../users/user.model';
import ApiError from '../../../error/ApiError';
import { Secret } from 'jsonwebtoken';

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
    } catch (err) {
        throw new ApiError(403, 'Invalid Refresh Token');
    }

    const { userId } = verifiedToken;

    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token

    const isUserExist = await User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError(404, 'User does not exist');
    }
    //generate new token

    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExist.id,
            role: isUserExist.role
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken
    };
};

export const AuthController = {
    loginUser,
    refreshToken
};
