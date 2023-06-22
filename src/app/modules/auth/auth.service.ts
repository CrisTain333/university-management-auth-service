import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
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

export const AuthService = {
    login
};
