'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const routes_1 = __importDefault(require('./app/routes'));
const globalErrorHandler_1 = __importDefault(require('./middleware/globalErrorHandler'));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Entrance
app.use('/api/v1', routes_1.default);
// Global Error handler
app.use(globalErrorHandler_1.default);
// const testid = async () => {
//     const data = {
//         year: '2025',
//         code: '01'
//     };
//     const result = await generateUserId(data);
//     console.log(result);
// };
// testid();
// Handle Not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
    next();
});
exports.default = app;
