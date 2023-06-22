import ApiError from '../../../error/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const login = async (payload: ILoginUser) => {
    const { id, password } = payload;
    const isUserExits = User.findOne({ id }, { id: 1, password: 1, needsPasswordChange: 1 }).lean();
    console.log(password, bcrypt);

    if (!isUserExits) {
        throw new ApiError(404, 'User does not exits');
    }
    console.log(isUserExits);

    // Check the password;
    // const isPasswordMatched = await bcrypt.compare(password, isUserExits?.password as string);

    // console.log(isPasswordMatched);

    // if (!isPasswordMatched) {
    //     throw new ApiError(403, 'Invalid Credential');
    // }
};

export const AuthService = {
    login
};
