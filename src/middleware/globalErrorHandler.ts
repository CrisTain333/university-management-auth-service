import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({ error: err });
   next();
};
