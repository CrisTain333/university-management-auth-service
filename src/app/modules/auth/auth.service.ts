import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { User } from '../users/user.model';
import { ILoginUser, IRefreshTokenResponse } from './auth.interface';
const login = async (payload: ILoginUser) => {
    const { id, password } = payload;
    const isUserExist = await User.isUserExist(id);

    if (!isUserExist) {
        throw new ApiError(404, 'User does not exist');
    }

    if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError(404, 'Password is incorrect');
    }

    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        needsPasswordChange
    };
};

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
export const AuthService = {
    login,
    refreshToken
};
