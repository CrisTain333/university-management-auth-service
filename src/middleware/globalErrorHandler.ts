/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import handleValidationError from '../error/handleValidationError';
import { IGenericErrorMessage } from '../interface/error';
import config from '../config';
import ApiError from '../error/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../error/zodErrorHandler';
import { errorLogger } from '../shared/logger';
import handleCastError from '../error/handleCastError';

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    // eslint-disable-next-line no-unused-expressions
    config.NODE_ENV === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
        : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorMessages: IGenericErrorMessage[] = [];
    if (error?.name === 'ValidationError') {
        const simpliFiedError = handleValidationError(error);
        statusCode = simpliFiedError.statusCode;
        message = simpliFiedError.message;
        errorMessages = simpliFiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simpliFiedError = handleZodError(error);
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
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.NODE_ENV !== 'production' ? error?.stack : undefined
    });
    next();
};
