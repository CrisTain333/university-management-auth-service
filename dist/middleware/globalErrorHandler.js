"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../error/zodErrorHandler"));
// import { errorLogger } from '../shared/logger';
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    // eslint-disable-next-line no-unused-expressions
    config_1.default.NODE_ENV === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
        : console.log(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message
                }
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message
                }
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.NODE_ENV !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined
    });
};
exports.default = globalErrorHandler;
