import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import router from './app/routes';
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrance
app.use('/api/v1', router);

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
