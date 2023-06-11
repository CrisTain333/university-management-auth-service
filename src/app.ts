import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import usersRouter from './app/modules/users/user.route';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

// Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrance
app.use('/api/v1/', router);

// Global Error handler
app.use(globalErrorHandler);

// Handle Not found
app.use((req: Request, res: Response, next: NextFunction) => {
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

export default app;
