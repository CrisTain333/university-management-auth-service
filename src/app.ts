import express, { Application } from 'express';
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
export default app;
