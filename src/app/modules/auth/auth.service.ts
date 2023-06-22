import { IAuth } from './auth.interface';

const login = (userData: IAuth) => {
    console.log(userData);
};

export const AuthService = {
    login
};
