import { NextFunction, Response } from 'express';
import ApiError from '../error/ApiError';
import { jwtHelpers } from '../helpers/jwtHelper';
import config from '../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: any, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(401, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
