import { NextFunction, Request, Response } from 'express';
import handleValidationError from '../error/handleValidationError';
import { IGenericErrorMessage } from '../interface/error';
import config from '../config';

export const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorMessages: IGenericErrorMessage[] = [];

    if (err?.name === 'ValidationError') {
        const simpliFiedError = handleValidationError(err);
        statusCode = simpliFiedError?.statusCode;
        message = simpliFiedError?.message;
        errorMessages = simpliFiedError?.errorMessages;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.NODE_ENV !== 'production' ? err?.stack : undefined
    });
    next();
};
