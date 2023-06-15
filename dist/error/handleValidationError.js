"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((element) => {
        return {
            path: element === null || element === void 0 ? void 0 : element.path,
            message: element === null || element === void 0 ? void 0 : element.message
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages: errors
    };
};
exports.default = handleValidationError;
