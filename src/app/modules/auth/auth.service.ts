import { ILoginUser } from './auth.interface';

const login = (payload: ILoginUser) => {
    console.log(payload);
};

export const AuthService = {
    login
};
