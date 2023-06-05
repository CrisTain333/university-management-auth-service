import { ErrorRequestHandler } from 'express';
import handleValidationError from '../error/handleValidationError';
import { IGenericErrorMessage } from '../interface/error';
import config from '../config';
import ApiError from '../error/ApiError';

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorMessages: IGenericErrorMessage[] = [];
    if (error?.name === 'ValidationError') {
        const simpliFiedError = handleValidationError(error);
        statusCode = simpliFiedError.statusCode;
        message = simpliFiedError.message;
        errorMessages = simpliFiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: ''
                  }
              ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: ''
                  }
              ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.NODE_ENV !== 'production' ? error?.stack : undefined
    });
    next();
};
