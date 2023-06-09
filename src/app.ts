import express, { Application } from 'express';
import cors from 'cors';
// import usersRouter from './app/modules/users/user.route';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { UserRoute } from './app/modules/users/user.route';
import { SemesterRoute } from './app/modules/academicSemester/academicSemester.routes';

const app: Application = express();

// Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', UserRoute);
app.use('/api/v1/academy-semesters/', SemesterRoute);

// app.get('/', (req, res) => {
//     Promise.reject('Just Try');
// });

// Global Error handler
app.use(globalErrorHandler);
export default app;
