"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { IGenericErrorMessage } from '../interfaces/error';
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id'
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors
    };
};
exports.default = handleCastError;
